// ===================================================
// ANTI-BOT SECURITY ENGINE (from DrawCAPTCHA)
// ===================================================
var SecurityEngine = {
    timestamps: [],
    velocities: [],
    accelerations: [],
    angles: [],
    angleDiffs: [],
    pressures: [],
    pauseCount: 0,
    liftCount: 0,
    rawPointCount: 0,
    pageLoadTime: Date.now(),
    modalOpenTime: 0,
    drawStartTime: 0,
    drawEndTime: 0,
    mouseMovesBeforeDraw: 0,
    scrollEvents: 0,
    keyEvents: 0,
    focusChanges: 0,
    touchUsed: false,
    penUsed: false,
    pointerTypes: [],

    MIN_DRAW_TIME_MS: 300,
    MAX_DRAW_TIME_MS: 15000,
    MIN_POINTS: 15,
    MIN_VELOCITY_VARIANCE: 0.08,
    MIN_ANGLE_VARIANCE: 0.02,
    MIN_JITTER: 0.3,
    MAX_PERFECT_SEGMENTS: 0.85,
    MIN_PAUSE_RATIO: 0,
    MAX_ACCELERATION_UNIFORMITY: 0.90,
    MIN_TIME_ON_PAGE_MS: 2000,

    reset: function() {
        this.timestamps = [];
        this.velocities = [];
        this.accelerations = [];
        this.angles = [];
        this.angleDiffs = [];
        this.pressures = [];
        this.pauseCount = 0;
        this.liftCount = 0;
        this.rawPointCount = 0;
        this.drawStartTime = 0;
        this.drawEndTime = 0;
        this.pointerTypes = [];
    },

    recordPoint: function(pt, event) {
        var now = performance.now();
        this.timestamps.push(now);
        this.rawPointCount++;

        if (event && event.pointerType) {
            if (this.pointerTypes.indexOf(event.pointerType) === -1) {
                this.pointerTypes.push(event.pointerType);
            }
            if (event.pointerType === 'touch') this.touchUsed = true;
            if (event.pointerType === 'pen') this.penUsed = true;
        }

        if (event && typeof event.pressure === 'number' && event.pressure > 0) {
            this.pressures.push(event.pressure);
        }

        if (this.timestamps.length >= 2) {
            var idx = this.timestamps.length - 1;
            var dt = this.timestamps[idx] - this.timestamps[idx - 1];
            if (dt > 80) this.pauseCount++;
            if (dt > 0) {
                var dx = pt.x - this._lastPt.x;
                var dy = pt.y - this._lastPt.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var vel = dist / dt;
                this.velocities.push(vel);
                var angle = Math.atan2(dy, dx);
                this.angles.push(angle);
                if (this.angles.length >= 2) {
                    var aDiff = Math.abs(angle - this.angles[this.angles.length - 2]);
                    if (aDiff > Math.PI) aDiff = 2 * Math.PI - aDiff;
                    this.angleDiffs.push(aDiff);
                }
                if (this.velocities.length >= 2) {
                    var accIdx = this.velocities.length - 1;
                    var acc = Math.abs(this.velocities[accIdx] - this.velocities[accIdx - 1]) / dt;
                    this.accelerations.push(acc);
                }
            }
        }
        this._lastPt = { x: pt.x, y: pt.y };
    },

    _lastPt: { x: 0, y: 0 },

    mean: function(arr) {
        if (arr.length === 0) return 0;
        var sum = 0;
        for (var i = 0; i < arr.length; i++) sum += arr[i];
        return sum / arr.length;
    },

    variance: function(arr) {
        if (arr.length < 2) return 0;
        var m = this.mean(arr);
        var sumSq = 0;
        for (var i = 0; i < arr.length; i++) sumSq += (arr[i] - m) * (arr[i] - m);
        return sumSq / (arr.length - 1);
    },

    stddev: function(arr) {
        return Math.sqrt(this.variance(arr));
    },

    coefficientOfVariation: function(arr) {
        var m = this.mean(arr);
        if (m === 0) return 0;
        return this.stddev(arr) / Math.abs(m);
    },

    analyze: function(userPath) {
        var flags = [];
        var scores = {};
        var totalScore = 100;

        if (document.getElementById('honeypot') && document.getElementById('honeypot').value.length > 0) {
            flags.push('honeypot_filled');
            totalScore -= 100;
        }

        var timeOnPage = Date.now() - this.pageLoadTime;
        if (timeOnPage < this.MIN_TIME_ON_PAGE_MS) {
            flags.push('page_too_fast');
            totalScore -= 30;
        }
        scores.timeOnPage = timeOnPage;

        var drawDuration = this.drawEndTime - this.drawStartTime;
        scores.drawDuration = drawDuration;
        if (drawDuration < this.MIN_DRAW_TIME_MS) {
            flags.push('draw_too_fast');
            totalScore -= 25;
        }
        if (drawDuration > this.MAX_DRAW_TIME_MS) {
            flags.push('draw_too_slow');
            totalScore -= 10;
        }

        scores.pointCount = userPath.length;
        if (userPath.length < this.MIN_POINTS) {
            flags.push('too_few_points');
            totalScore -= 20;
        }

        var velCV = this.coefficientOfVariation(this.velocities);
        scores.velocityCV = velCV;
        if (velCV < this.MIN_VELOCITY_VARIANCE && this.velocities.length > 5) {
            flags.push('constant_velocity');
            totalScore -= 25;
        }

        var angleVar = this.variance(this.angleDiffs);
        scores.angleVariance = angleVar;
        if (angleVar < this.MIN_ANGLE_VARIANCE && this.angleDiffs.length > 5) {
            flags.push('too_smooth_direction');
            totalScore -= 20;
        }

        var jitter = this.calculateJitter(userPath);
        scores.jitter = jitter;
        if (jitter < this.MIN_JITTER && userPath.length > 20) {
            flags.push('no_human_jitter');
            totalScore -= 20;
        }

        var spacingUniformity = this.checkSpacingUniformity(userPath);
        scores.spacingUniformity = spacingUniformity;
        if (spacingUniformity > this.MAX_PERFECT_SEGMENTS) {
            flags.push('uniform_spacing');
            totalScore -= 20;
        }

        if (this.accelerations.length > 3) {
            var accCV = this.coefficientOfVariation(this.accelerations);
            var accUniformity = 1 - Math.min(accCV, 1);
            scores.accelerationUniformity = accUniformity;
            if (accUniformity > this.MAX_ACCELERATION_UNIFORMITY) {
                flags.push('uniform_acceleration');
                totalScore -= 15;
            }
        }

        if (this.pressures.length > 5) {
            var pressureCV = this.coefficientOfVariation(this.pressures);
            scores.pressureCV = pressureCV;
            if (pressureCV < 0.01) {
                flags.push('constant_pressure');
                totalScore -= 10;
            }
        }

        var timingUniformity = this.checkTimingUniformity();
        scores.timingUniformity = timingUniformity;
        if (timingUniformity > 0.92 && this.timestamps.length > 10) {
            flags.push('robotic_timing');
            totalScore -= 25;
        }

        scores.pauseCount = this.pauseCount;

        scores.mouseMovesBeforeDraw = this.mouseMovesBeforeDraw;
        if (this.mouseMovesBeforeDraw < 3) {
            flags.push('no_pre_draw_movement');
            totalScore -= 10;
        }

        var straightRatio = this.straightLineRatio(userPath);
        scores.straightLineRatio = straightRatio;
        if (straightRatio > 0.90 && userPath.length > 20) {
            flags.push('too_straight');
            totalScore -= 15;
        }

        var bezierScore = this.detectPerfectCurve(userPath);
        scores.bezierPerfection = bezierScore;
        if (bezierScore > 0.97 && userPath.length > 30) {
            flags.push('mathematically_perfect');
            totalScore -= 20;
        }

        var cornerScore = this.analyzeCorners(userPath);
        scores.cornerSharpness = cornerScore;

        totalScore = Math.max(0, Math.min(100, totalScore));
        scores.totalScore = totalScore;

        var isHuman = totalScore >= 50 && flags.length <= 3;

        return {
            isHuman: isHuman,
            score: totalScore,
            flags: flags,
            scores: scores
        };
    },

    calculateJitter: function(path) {
        if (path.length < 5) return 0;
        var totalJitter = 0;
        var count = 0;
        for (var i = 2; i < path.length - 2; i++) {
            var smoothX = (path[i-2].x + path[i-1].x + path[i].x + path[i+1].x + path[i+2].x) / 5;
            var smoothY = (path[i-2].y + path[i-1].y + path[i].y + path[i+1].y + path[i+2].y) / 5;
            var dx = path[i].x - smoothX;
            var dy = path[i].y - smoothY;
            totalJitter += Math.sqrt(dx * dx + dy * dy);
            count++;
        }
        return count > 0 ? totalJitter / count : 0;
    },

    checkSpacingUniformity: function(path) {
        if (path.length < 3) return 0;
        var distances = [];
        for (var i = 1; i < path.length; i++) {
            var dx = path[i].x - path[i-1].x;
            var dy = path[i].y - path[i-1].y;
            distances.push(Math.sqrt(dx * dx + dy * dy));
        }
        if (distances.length < 2) return 0;
        var m = this.mean(distances);
        if (m === 0) return 1;
        var withinThreshold = 0;
        for (var i = 0; i < distances.length; i++) {
            if (Math.abs(distances[i] - m) / m < 0.15) withinThreshold++;
        }
        return withinThreshold / distances.length;
    },

    checkTimingUniformity: function() {
        if (this.timestamps.length < 3) return 0;
        var intervals = [];
        for (var i = 1; i < this.timestamps.length; i++) {
            intervals.push(this.timestamps[i] - this.timestamps[i-1]);
        }
        var m = this.mean(intervals);
        if (m === 0) return 1;
        var withinThreshold = 0;
        for (var i = 0; i < intervals.length; i++) {
            if (Math.abs(intervals[i] - m) / m < 0.2) withinThreshold++;
        }
        return withinThreshold / intervals.length;
    },

    straightLineRatio: function(path) {
        if (path.length < 3) return 0;
        var straightCount = 0;
        for (var i = 1; i < path.length - 1; i++) {
            var ax = path[i].x - path[i-1].x;
            var ay = path[i].y - path[i-1].y;
            var bx = path[i+1].x - path[i].x;
            var by = path[i+1].y - path[i].y;
            var cross = Math.abs(ax * by - ay * bx);
            var magA = Math.sqrt(ax * ax + ay * ay);
            var magB = Math.sqrt(bx * bx + by * by);
            if (magA > 0 && magB > 0) {
                var sinAngle = cross / (magA * magB);
                if (sinAngle < 0.05) straightCount++;
            }
        }
        return straightCount / (path.length - 2);
    },

    detectPerfectCurve: function(path) {
        if (path.length < 10) return 0;
        var n = path.length;
        var p0 = path[0];
        var p3 = path[n - 1];
        var p1 = path[Math.floor(n / 3)];
        var p2 = path[Math.floor(2 * n / 3)];
        var totalError = 0;
        for (var i = 0; i < n; i++) {
            var t = i / (n - 1);
            var it = 1 - t;
            var bx = it*it*it*p0.x + 3*it*it*t*p1.x + 3*it*t*t*p2.x + t*t*t*p3.x;
            var by = it*it*it*p0.y + 3*it*it*t*p1.y + 3*it*t*t*p2.y + t*t*t*p3.y;
            var dx = path[i].x - bx;
            var dy = path[i].y - by;
            totalError += Math.sqrt(dx * dx + dy * dy);
        }
        var avgError = totalError / n;
        return Math.max(0, 1 - avgError / 10);
    },

    analyzeCorners: function(path) {
        if (path.length < 5) return 0;
        var sharpCorners = 0;
        var totalCorners = 0;
        for (var i = 2; i < path.length - 2; i++) {
            var ax = path[i].x - path[i-2].x;
            var ay = path[i].y - path[i-2].y;
            var bx = path[i+2].x - path[i].x;
            var by = path[i+2].y - path[i].y;
            var dot = ax * bx + ay * by;
            var magA = Math.sqrt(ax * ax + ay * ay);
            var magB = Math.sqrt(bx * bx + by * by);
            if (magA > 2 && magB > 2) {
                var cosAngle = dot / (magA * magB);
                if (cosAngle < 0.5) {
                    totalCorners++;
                    if (cosAngle < -0.5) sharpCorners++;
                }
            }
        }
        return totalCorners > 0 ? sharpCorners / totalCorners : 0;
    }
};

// Track global mouse activity
document.addEventListener('mousemove', function() {
    SecurityEngine.mouseMovesBeforeDraw++;
});
document.addEventListener('scroll', function() {
    SecurityEngine.scrollEvents++;
});
document.addEventListener('keydown', function() {
    SecurityEngine.keyEvents++;
});
document.addEventListener('visibilitychange', function() {
    SecurityEngine.focusChanges++;
});