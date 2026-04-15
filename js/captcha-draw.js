// ===================================================
// DRAW CAPTCHA — Full Logic (No visible timer)
// ===================================================
(function() {
    var CONFIG = {
        canvasWidth: 320,
        canvasHeight: 160,
        resampleCount: 50,
        threshold: 28,
        guideAnimDuration: 1500,
        pointRadius: 7,
        guideDotRadius: 5,
        userLineWidth: 3,
        guideLineWidth: 2,
        guideLineDash: [6, 6],
        maxAttempts: 5
    };

    var canvas = document.getElementById('captchaCanvas');
    var ctx = canvas.getContext('2d');
    var btnSubmit = document.getElementById('btnSubmit');
    var btnReset = document.getElementById('btnReset');
    var btnNew = document.getElementById('btnNew');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var timerTrack = document.getElementById('timerTrack');
    var pathBadge = document.getElementById('pathBadge');
    var attemptsText = document.getElementById('attemptsText');

    var userPath = [];
    var isDrawing = false;
    var hasDrawn = false;
    var locked = false;
    var activePath = null;
    var correctPath = [];
    var attempts = 0;
    var drawStartTime = null;
    var inputType = 'mouse';

    // Hide timer bar — we still track time internally
    if (timerTrack) timerTrack.style.display = 'none';

    if (typeof CAPTCHA_PATHS !== 'undefined') {
        hintText.textContent = CAPTCHA_PATHS.length + ' paths loaded';
    }

    initCaptcha();

    function initCaptcha() {
        activePath = getRandomPath();
        correctPath = generateSmoothPath(activePath.waypoints, 200);
        pathBadge.innerHTML = activePath.name +
            ' <span class="difficulty ' + activePath.difficulty + '">' +
            activePath.difficulty + '</span>';
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + CONFIG.maxAttempts;
        userPath = [];
        isDrawing = false;
        hasDrawn = false;
        locked = false;
        drawStartTime = null;
        btnSubmit.disabled = true;
        SecurityEngine.reset();
        hideCaptchaStatus();
        drawStaticScene();
        playGuideAnimation();
    }

    function drawStaticScene() {
        ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        for (var x = 0; x < CONFIG.canvasWidth; x += 20) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CONFIG.canvasHeight); ctx.stroke();
        }
        for (var y = 0; y < CONFIG.canvasHeight; y += 20) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CONFIG.canvasWidth, y); ctx.stroke();
        }
        ctx.setLineDash(CONFIG.guideLineDash);
        ctx.strokeStyle = '#bbb';
        ctx.lineWidth = CONFIG.guideLineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        correctPath.forEach(function(p, i) {
            if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);
        drawDot(correctPath[0].x, correctPath[0].y, CONFIG.pointRadius, '#22aa22');
        drawDot(correctPath[correctPath.length - 1].x, correctPath[correctPath.length - 1].y, CONFIG.pointRadius, '#dd3333');
    }

    function drawDot(x, y, r, color) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function playGuideAnimation() {
        locked = true;
        btnSubmit.disabled = true;
        hintText.textContent = 'Watch the guide, then draw!';
        var startTime = performance.now();
        function animate(now) {
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / CONFIG.guideAnimDuration, 1);
            var t = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
            var idx = Math.floor(t * (correctPath.length - 1));
            var pt = correctPath[Math.min(idx, correctPath.length - 1)];
            drawStaticScene();
            drawDot(pt.x, pt.y, CONFIG.guideDotRadius, '#4285f4');
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                drawStaticScene();
                locked = false;
                hintText.textContent = 'Your turn — draw the path!';
            }
        }
        requestAnimationFrame(animate);
    }

    // DRAWING
    function handleDrawingStart(e) {
        if (locked) return;
        e.preventDefault();
        isDrawing = true;
        hasDrawn = false;
        userPath = [];
        drawStartTime = performance.now();
        inputType = (e.touches) ? 'touch' : 'mouse';
        SecurityEngine.reset();
        SecurityEngine.drawStartTime = performance.now();
        hideCaptchaStatus();
        var pt = getPointerPosition(e);
        userPath.push(pt);
        SecurityEngine.recordPoint(pt, e);
        drawStaticScene();
    }

    function handleDrawingMove(e) {
        if (!isDrawing || locked) return;
        e.preventDefault();
        var pt = getPointerPosition(e);
        userPath.push(pt);
        SecurityEngine.recordPoint(pt, e);
        drawStaticScene();
        drawUserPath();
    }

    function handleDrawingEnd(e) {
        if (!isDrawing || locked) return;
        e.preventDefault();
        isDrawing = false;
        hasDrawn = true;
        SecurityEngine.drawEndTime = performance.now();
        btnSubmit.disabled = false;
        hintText.textContent = 'Press Verify to check your path';
    }

    function getPointerPosition(e) {
        var rect = canvas.getBoundingClientRect();
        var scaleX = CONFIG.canvasWidth / rect.width;
        var scaleY = CONFIG.canvasHeight / rect.height;
        var cx, cy;
        if (e.touches && e.touches.length > 0) {
            cx = e.touches[0].clientX; cy = e.touches[0].clientY;
        } else {
            cx = e.clientX; cy = e.clientY;
        }
        return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
    }

    canvas.addEventListener('mousedown', handleDrawingStart);
    canvas.addEventListener('mousemove', handleDrawingMove);
    canvas.addEventListener('mouseup', handleDrawingEnd);
    canvas.addEventListener('mouseleave', handleDrawingEnd);
    canvas.addEventListener('touchstart', handleDrawingStart, { passive: false });
    canvas.addEventListener('touchmove', handleDrawingMove, { passive: false });
    canvas.addEventListener('touchend', handleDrawingEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleDrawingEnd, { passive: false });

    function drawUserPath() {
        if (userPath.length < 2) return;
        ctx.setLineDash([]);
        ctx.lineWidth = CONFIG.userLineWidth;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#4285f4';
        ctx.beginPath();
        ctx.moveTo(userPath[0].x, userPath[0].y);
        for (var i = 1; i < userPath.length; i++) ctx.lineTo(userPath[i].x, userPath[i].y);
        ctx.stroke();
    }

    // VALIDATION HELPERS
    function resamplePath(path, n) {
        if (path.length === 0) return [];
        if (path.length === 1) return Array(n).fill({ x: path[0].x, y: path[0].y });
        var totalLength = 0;
        for (var i = 1; i < path.length; i++) totalLength += euclidean(path[i - 1], path[i]);
        if (totalLength === 0) return Array(n).fill({ x: path[0].x, y: path[0].y });
        var interval = totalLength / (n - 1);
        var resampled = [{ x: path[0].x, y: path[0].y }];
        var accumulated = 0, j = 1;
        for (var i = 1; i < n - 1; i++) {
            var target = interval * i;
            while (j < path.length) {
                var segLen = euclidean(path[j - 1], path[j]);
                if (accumulated + segLen >= target) {
                    var overshoot = target - accumulated;
                    var ratio = overshoot / segLen;
                    resampled.push({
                        x: path[j - 1].x + ratio * (path[j].x - path[j - 1].x),
                        y: path[j - 1].y + ratio * (path[j].y - path[j - 1].y)
                    });
                    break;
                }
                accumulated += segLen;
                j++;
            }
            if (resampled.length <= i) resampled.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });
        }
        resampled.push({ x: path[path.length - 1].x, y: path[path.length - 1].y });
        return resampled;
    }

    function euclidean(a, b) {
        var dx = a.x - b.x, dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function validatePath(userPathRaw, correctPathRaw) {
        var n = CONFIG.resampleCount;
        var u = resamplePath(userPathRaw, n);
        var c = resamplePath(correctPathRaw, n);
        var total = 0;
        for (var i = 0; i < n; i++) total += euclidean(u[i], c[i]);
        var avg = total / n;
        return { passed: avg < CONFIG.threshold, avgDist: avg };
    }

    function generateSmoothPath(waypoints, totalPoints) {
        if (waypoints.length < 2) return waypoints.slice();
        var points = [], segments = waypoints.length - 1;
        var ptsPerSeg = Math.ceil(totalPoints / segments);
        for (var i = 0; i < segments; i++) {
            var p0 = waypoints[Math.max(i - 1, 0)];
            var p1 = waypoints[i];
            var p2 = waypoints[Math.min(i + 1, waypoints.length - 1)];
            var p3 = waypoints[Math.min(i + 2, waypoints.length - 1)];
            for (var j = 0; j < ptsPerSeg; j++) {
                var t = j / ptsPerSeg;
                points.push(catmullRom(p0, p1, p2, p3, t));
            }
        }
        points.push({ x: waypoints[waypoints.length - 1].x, y: waypoints[waypoints.length - 1].y });
        return points;
    }

    function catmullRom(p0, p1, p2, p3, t) {
        var t2 = t * t, t3 = t2 * t;
        return {
            x: 0.5 * ((2*p1.x)+(-p0.x+p2.x)*t+(2*p0.x-5*p1.x+4*p2.x-p3.x)*t2+(-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
            y: 0.5 * ((2*p1.y)+(-p0.y+p2.y)*t+(2*p0.y-5*p1.y+4*p2.y-p3.y)*t2+(-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
        };
    }

    function drawValidationOverlay() {
        var n = CONFIG.resampleCount;
        var u = resamplePath(userPath, n);
        var c = resamplePath(correctPath, n);
        for (var i = 0; i < n; i++) {
            var dist = euclidean(u[i], c[i]);
            ctx.strokeStyle = dist < CONFIG.threshold ? 'rgba(0,150,0,0.4)' : 'rgba(200,0,0,0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(u[i].x, u[i].y);
            ctx.lineTo(c[i].x, c[i].y);
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }

    // SUBMIT BUTTON
    btnSubmit.addEventListener('click', function() {
        if (userPath.length < 5) {
            showCaptchaStatus('fail', '❌', 'Path too short. Draw more carefully!');
            return;
        }
        attempts++;
        var drawTime = drawStartTime ? Math.round(performance.now() - drawStartTime) : 0;
        showCaptchaStatus('analyzing', '🔍', 'Analyzing your input...');
        btnSubmit.disabled = true;
        locked = true;
        var analyzeDelay = 400 + Math.floor(Math.random() * 600);

        setTimeout(function() {
            var result = validatePath(userPath, correctPath);
            drawValidationOverlay();
            var security = SecurityEngine.analyze(userPath);
            var pathPassed = result.passed;
            var securityPassed = security.isHuman;

            if (pathPassed && securityPassed) {
                // ===== PASSED =====
                var accuracy = Math.max(0, 100 - result.avgDist * 2).toFixed(0);
                showCaptchaStatus('pass', '✅', 'Passed! Accuracy: ' + accuracy + '% | Trust: ' + security.score);
                hintText.textContent = 'Verification successful';
                locked = true;
                btnSubmit.disabled = true;
                logToSheet({
                    captchaType: 'draw',
                    pathName: activePath.name,
                    difficulty: activePath.difficulty,
                    attemptNumber: attempts,
                    result: 'pass',
                    accuracy: accuracy,
                    avgDistance: result.avgDist.toFixed(2),
                    drawTime: drawTime,
                    pointsDrawn: userPath.length,
                    inputType: inputType,
                    totalAttempts: attempts,
                    securityScore: security.score,
                    securityFlags: security.flags.join('; '),
                    botDetected: 'no'
                });
                setTimeout(function() {
                    showCompleteBox('draw', 'DrawCAPTCHA');
                }, 1200);

            } else if (pathPassed && !securityPassed) {
                // ===== BOT DETECTED =====
                showCaptchaStatus('fail', '🤖', 'Suspicious behavior (Score: ' + security.score + '). Try naturally.');
                hintText.textContent = security.flags.join(', ');
                locked = false;
                btnSubmit.disabled = true;
                logToSheet({
                    captchaType: 'draw',
                    pathName: activePath.name,
                    difficulty: activePath.difficulty,
                    attemptNumber: attempts,
                    result: 'bot_detected',
                    accuracy: Math.max(0, 100 - result.avgDist * 2).toFixed(0),
                    avgDistance: result.avgDist.toFixed(2),
                    drawTime: drawTime,
                    pointsDrawn: userPath.length,
                    inputType: inputType,
                    totalAttempts: attempts,
                    securityScore: security.score,
                    securityFlags: security.flags.join('; '),
                    botDetected: 'yes'
                });
                if (attempts >= CONFIG.maxAttempts) {
                    locked = true;
                    hintText.textContent = 'Too many attempts. Click New Path.';
                    showCaptchaStatus('fail', '🚫', 'Max attempts reached.');
                }

            } else {
                // ===== PATH FAILED =====
                showCaptchaStatus('fail', '❌', 'Try again — distance: ' + result.avgDist.toFixed(1) + 'px');
                hintText.textContent = 'Click Reset to retry';
                locked = false;
                btnSubmit.disabled = true;
                logToSheet({
                    captchaType: 'draw',
                    pathName: activePath.name,
                    difficulty: activePath.difficulty,
                    attemptNumber: attempts,
                    result: 'fail',
                    accuracy: Math.max(0, 100 - result.avgDist * 2).toFixed(0),
                    avgDistance: result.avgDist.toFixed(2),
                    drawTime: drawTime,
                    pointsDrawn: userPath.length,
                    inputType: inputType,
                    totalAttempts: attempts,
                    securityScore: security.score,
                    securityFlags: security.flags.join('; '),
                    botDetected: security.isHuman ? 'no' : 'yes'
                });
                if (attempts >= CONFIG.maxAttempts) {
                    locked = true;
                    hintText.textContent = 'Too many attempts. Click New Path.';
                    showCaptchaStatus('fail', '🚫', 'Max attempts reached.');
                }
            }

            attemptsText.textContent = 'Attempt ' + attempts + ' / ' + CONFIG.maxAttempts;
        }, analyzeDelay);
    });

    // RESET BUTTON
    btnReset.addEventListener('click', function() {
        if (attempts >= CONFIG.maxAttempts) return;
        userPath = [];
        isDrawing = false;
        hasDrawn = false;
        locked = false;
        drawStartTime = null;
        btnSubmit.disabled = true;
        SecurityEngine.reset();
        hideCaptchaStatus();
        drawStaticScene();
        playGuideAnimation();
    });

    // NEW PATH BUTTON
    btnNew.addEventListener('click', function() {
        attempts = 0;
        initCaptcha();
    });

    // STATUS HELPERS
    function showCaptchaStatus(type, icon, text) {
        captchaStatus.className = 'captcha-status ' + type;
        statusIcon.textContent = icon;
        statusText.textContent = text;
    }

    function hideCaptchaStatus() {
        captchaStatus.className = 'captcha-status hidden';
    }

})();