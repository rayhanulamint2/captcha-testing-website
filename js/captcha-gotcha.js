// ===================================================
// GOTCHA CAPTCHA — Sketch-Match Icon Selection
// Adapted from game-based captcha for testing website
// Logs data to the SAME Google Sheet as Game CAPTCHA
// ===================================================
(function () {

    // ==================== HELPERS ====================
    function _el(tag, className) {
        var e = document.createElement(tag);
        if (className) e.className = className;
        return e;
    }

    function _rnd(max) {
        return Math.floor(Math.random() * max);
    }

    function _shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // ==================== STATE ====================
    var attempts = 0;
    var maxAttempts = 5;
    var startTime = 0;
    var verified = false;
    var selected = [];
    var answer = [];
    var placed = [];
    var bgImages = [];
    var imagesLoaded = false;

    var opts = {
        iconCount: 3,
        sketchSize: 68,
        canvasW: 456,
        canvasH: 300,
        maxAttempts: 5
    };

    // ==================== DOM REFS ====================
    var container = document.getElementById('gotchaCaptchaContainer');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var attemptsText = document.getElementById('attemptsText');

    // Widget elements (created in _build)
    var widget, header, instrText, orderBar, scene, footer, btnRefresh, btnOK;

    // ==================== PRELOAD IMAGES ====================
    function preloadImages() {
        var loaded = 0;
        var total = CAPTCHA_CONFIG.IMAGE_COUNT;

        for (var i = 1; i <= total; i++) {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = CAPTCHA_CONFIG.getImageURL(i);

            img.onload = (function () {
                bgImages.push(this);
                loaded++;
                if (loaded === total) {
                    imagesLoaded = true;
                    newChallenge();
                }
            }).bind(img);

            img.onerror = (function () {
                console.warn('Failed to load: ' + this.src);
                loaded++;
                if (loaded === total) {
                    imagesLoaded = true;
                    if (bgImages.length === 0) {
                        console.error('No Cloudinary images loaded!');
                    }
                    newChallenge();
                }
            }).bind(img);
        }
    }

    // ==================== BUILD DOM ====================
    function buildWidget() {
        container.innerHTML = '';

        widget = _el('div', 'captcha-widget');

        // Header
        header = _el('div', 'captcha-header');
        instrText = _el('span', 'instruction-text');
        instrText.textContent = 'Select in this order →';
        orderBar = _el('div', 'order-icons');
        header.append(instrText, orderBar);

        // Scene
        scene = _el('div', 'captcha-scene');
        scene.style.height = opts.canvasH + 'px';

        // Show loading while images preload
        var loader = _el('div', 'captcha-loading');
        loader.innerHTML = '<div class="spinner"></div><span>Loading…</span>';
        scene.appendChild(loader);

        // Footer
        footer = _el('div', 'captcha-footer');

        btnRefresh = _el('button', 'captcha-btn btn-refresh');
        btnRefresh.innerHTML = '↻';
        btnRefresh.title = 'New challenge';
        btnRefresh.addEventListener('click', function () { newChallenge(); });

        btnOK = _el('button', 'captcha-btn btn-confirm');
        btnOK.textContent = 'OK';
        btnOK.disabled = true;
        btnOK.addEventListener('click', function () { verify(); });

        footer.append(btnRefresh, btnOK);

        widget.append(header, scene, footer);
        container.appendChild(widget);
    }

    // ==================== NEW CHALLENGE ====================
    function newChallenge() {
        if (!imagesLoaded) return;

        if (bgImages.length === 0) {
            scene.innerHTML = '<div class="captcha-loading"><span>⚠ No images found</span></div>';
            return;
        }

        verified = false;
        selected = [];
        btnOK.disabled = true;
        btnOK.textContent = 'OK';
        btnRefresh.style.display = '';
        startTime = Date.now();
        hideCaptchaStatus();

        // Clean scene
        scene.innerHTML = '';

        // Pick random icons
        var pool = _shuffle([].concat(CAPTCHA_ICONS));
        var picked = pool.slice(0, opts.iconCount);

        // Random correct order
        answer = _shuffle(picked.map(function (i) { return i.id; }));

        // Header → clean white outlines with order badges
        orderBar.innerHTML = '';
        answer.forEach(function (id, idx) {
            var icon = picked.find(function (i) { return i.id === id; });
            var slot = _el('div', 'order-icon-slot');
            slot.innerHTML = icon.clean;
            var badge = _el('span', 'order-badge');
            badge.textContent = idx + 1;
            slot.appendChild(badge);
            orderBar.appendChild(slot);
        });

        // ── BACKGROUND: Cloudinary image ──
        var randomImg = bgImages[_rnd(bgImages.length)];
        var bgClone = randomImg.cloneNode();
        bgClone.className = 'captcha-bg-image';
        scene.appendChild(bgClone);

        // Light noise overlay
        addNoiseOverlay();

        // Place sketch icons
        placeSketchIcons(picked);

        hintText.textContent = 'Find and click the sketched icons in the correct order.';
    }

    // ==================== NOISE OVERLAY ====================
    function addNoiseOverlay() {
        var canvas = document.createElement('canvas');
        canvas.width = opts.canvasW;
        canvas.height = opts.canvasH;
        canvas.className = 'captcha-noise-overlay';

        var ctx = canvas.getContext('2d');
        var W = canvas.width, H = canvas.height;

        ctx.fillStyle = 'rgba(10, 10, 26, 0.35)';
        ctx.fillRect(0, 0, W, H);

        for (var i = 0; i < 300; i++) {
            ctx.fillStyle = 'rgba(' + (180 + _rnd(70)) + ',' + (170 + _rnd(60)) + ',' + (150 + _rnd(80)) + ',' + (Math.random() * 0.04) + ')';
            ctx.fillRect(_rnd(W), _rnd(H), Math.random() * 2 + 1, Math.random() * 2 + 1);
        }

        for (var i = 0; i < 15; i++) {
            ctx.save();
            ctx.translate(_rnd(W), _rnd(H));
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.strokeStyle = 'rgba(' + (190 + _rnd(50)) + ',' + (180 + _rnd(50)) + ',' + (160 + _rnd(50)) + ',' + (0.02 + Math.random() * 0.04) + ')';
            ctx.lineWidth = 0.5 + Math.random();
            var r = 12 + _rnd(35);
            var shape = _rnd(4);
            ctx.beginPath();
            switch (shape) {
                case 0: ctx.arc(0, 0, r, 0, Math.PI * 2); break;
                case 1: ctx.rect(-r / 2, -r / 2, r, r); break;
                case 2: ctx.moveTo(0, -r); ctx.lineTo(r, r); ctx.lineTo(-r, r); ctx.closePath(); break;
                case 3: ctx.moveTo(0, -r); ctx.lineTo(r, 0); ctx.lineTo(0, r); ctx.lineTo(-r, 0); ctx.closePath(); break;
            }
            ctx.stroke();
            ctx.restore();
        }

        for (var y = 0; y < H; y += 5) {
            ctx.fillStyle = 'rgba(0,0,0,' + (0.01 + Math.random() * 0.015) + ')';
            ctx.fillRect(0, y, W, 1);
        }

        scene.appendChild(canvas);
    }

    // ==================== PLACE SKETCH ICONS ====================
    function placeSketchIcons(picked) {
        var positions = getPositions(opts.iconCount, opts.sketchSize);
        placed = [];

        picked.forEach(function (icon, i) {
            var pos = positions[i];
            var wrap = _el('div', 'sketch-icon');
            wrap.style.left = pos.x + 'px';
            wrap.style.top = pos.y + 'px';
            wrap.style.width = opts.sketchSize + 'px';
            wrap.style.height = opts.sketchSize + 'px';

            var rot = (Math.random() - 0.5) * 30;
            wrap.style.transform = 'rotate(' + rot + 'deg)';

            var jitter = function () { return Math.round((Math.random() - 0.5) * 4 * 10) / 10; };
            wrap.innerHTML = icon.sketch(jitter);

            wrap.dataset.iconId = icon.id;
            (function (w, id) {
                w.addEventListener('click', function () { onPick(w, id); });
            })(wrap, icon.id);

            scene.appendChild(wrap);
            placed.push({ el: wrap, id: icon.id });
        });
    }

    // ==================== POSITIONS ====================
    function getPositions(count, size) {
        var pad = 20;
        var maxX = opts.canvasW - size - pad;
        var maxY = opts.canvasH - size - pad;
        var out = [];
        var tries = 0;

        while (out.length < count && tries < 800) {
            var x = pad + Math.random() * maxX;
            var y = pad + Math.random() * maxY;
            var ok = out.every(function (p) { return Math.hypot(p.x - x, p.y - y) > size + 30; });
            if (ok) out.push({ x: x, y: y });
            tries++;
        }

        while (out.length < count) {
            out.push({ x: pad + out.length * (size + 40), y: pad + 50 });
        }
        return out;
    }

    // ==================== ICON CLICK ====================
    function onPick(wrap, id) {
        if (verified) return;

        var idx = selected.indexOf(id);
        if (idx !== -1) {
            selected.splice(idx);
            refreshBadges();
            btnOK.disabled = true;
            return;
        }

        if (selected.length >= opts.iconCount) return;

        selected.push(id);
        refreshBadges();

        if (selected.length === opts.iconCount) {
            btnOK.disabled = false;
        }
    }

    function refreshBadges() {
        scene.querySelectorAll('.click-badge').forEach(function (b) { b.remove(); });
        placed.forEach(function (p) { p.el.classList.remove('selected'); });

        selected.forEach(function (id, i) {
            var item = placed.find(function (p) { return p.id === id; });
            if (!item) return;
            item.el.classList.add('selected');
            var badge = _el('div', 'click-badge');
            badge.textContent = i + 1;
            item.el.appendChild(badge);
        });
    }

    // ==================== VERIFY ====================
    function verify() {
        attempts++;
        var solveTime = Date.now() - startTime;

        var ok = selected.length === answer.length &&
            selected.every(function (id, i) { return id === answer[i]; });

        if (ok) {
            verified = true;
            showResult(true);
            btnOK.textContent = '✓ Verified';
            btnOK.disabled = true;
            btnRefresh.style.display = 'none';

            showCaptchaStatus('pass', '✅', 'GotCHA verified! Icons selected in correct order.');
            hintText.textContent = 'Verification successful!';

            // Log to the same Google Sheet as game captcha — same captchaType
            logToSheet({
                captchaType: 'game',
                attemptNumber: attempts,
                result: 'pass',
                accuracy: 100,
                solveTime: solveTime,
                moveCount: selected.length,
                rotationCount: 0,
                correctPieces: opts.iconCount,
                totalPieces: opts.iconCount,
                userInput: 'sequential',
                totalAttempts: attempts
            });

            setTimeout(function () {
                if (typeof showCompleteBox === 'function') {
                    showCompleteBox('gotcha', 'GotCHA CAPTCHA');
                } else {
                    var completeBox = document.getElementById('completeBox');
                    if (completeBox) completeBox.style.display = 'block';
                }
            }, 1200);
        } else {
            showResult(false);

            var correctCount = 0;
            for (var i = 0; i < selected.length; i++) {
                if (selected[i] === answer[i]) correctCount++;
            }
            var accuracy = Math.round((correctCount / answer.length) * 100);

            showCaptchaStatus('fail', '❌', correctCount + '/' + answer.length + ' in correct position. Wrong order — try again.');
            hintText.textContent = 'Look carefully at the order numbers in the header.';

            // Log fail to same sheet — same captchaType as game
            logToSheet({
                captchaType: 'game',
                attemptNumber: attempts,
                result: 'fail',
                accuracy: accuracy,
                solveTime: solveTime,
                moveCount: selected.length,
                rotationCount: 0,
                correctPieces: correctCount,
                totalPieces: opts.iconCount,
                wrongPositions: opts.iconCount - correctCount,
                wrongRotations: 0,
                userInput: 'sequential',
                totalAttempts: attempts
            });

            setTimeout(function () {
                if (attempts >= maxAttempts) {
                    showCaptchaStatus('fail', '🚫', 'Max attempts reached. Click New Challenge.');
                    btnOK.disabled = true;
                } else {
                    newChallenge();
                }
            }, 1500);
        }

        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
    }

    // ==================== RESULT OVERLAY ====================
    function showResult(success) {
        var overlay = _el('div', 'result-overlay ' + (success ? 'success' : 'fail'));
        overlay.innerHTML =
            '<div class="r-icon">' + (success ? '✓' : '✗') + '</div>' +
            '<div class="r-text">' + (success ? 'Verified!' : 'Wrong order — try again') + '</div>';
        scene.appendChild(overlay);
    }

    // ==================== STATUS ====================
    function showCaptchaStatus(type, icon, text) {
        if (captchaStatus) captchaStatus.className = 'captcha-status ' + type;
        if (statusIcon) statusIcon.textContent = icon;
        if (statusText) statusText.textContent = text;
    }

    function hideCaptchaStatus() {
        if (captchaStatus) captchaStatus.className = 'captcha-status hidden';
    }

    // ==================== EXPOSED FUNCTIONS ====================
    window.resetGotcha = function () {
        attempts = 0;
        verified = false;
        selected = [];
        hideCaptchaStatus();
        if (attemptsText) attemptsText.textContent = 'Attempt 0 / ' + maxAttempts;
        newChallenge();
    };

    window.newGotchaChallenge = function () {
        newChallenge();
    };

    window.verifyGotcha = function () {
        verify();
    };

    // ==================== INIT ====================
    buildWidget();
    preloadImages();

    if (attemptsText) attemptsText.textContent = 'Attempt 0 / ' + maxAttempts;

    console.log('✅ captcha-gotcha.js loaded');

})();
