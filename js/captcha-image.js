// ===================================================
// IMAGE CAPTCHA — reCAPTCHA v2 Style (No visible timer)
// ===================================================
(function() {

    var CATEGORIES = [
        {
            name: 'traffic lights',
            drawTarget: function(ctx, w, h) {
                ctx.fillStyle = '#555';
                ctx.fillRect(w*0.42, h*0.15, w*0.16, h*0.7);
                ctx.fillRect(w*0.3, h*0.8, w*0.4, h*0.06);
                ctx.fillStyle = '#333';
                ctx.fillRect(w*0.32, h*0.12, w*0.36, h*0.6);
                ctx.strokeStyle = '#222';
                ctx.lineWidth = 2;
                ctx.strokeRect(w*0.32, h*0.12, w*0.36, h*0.6);
                ctx.beginPath(); ctx.arc(w*0.5, h*0.24, w*0.1, 0, Math.PI*2); ctx.fillStyle = '#e53935'; ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.arc(w*0.5, h*0.42, w*0.1, 0, Math.PI*2); ctx.fillStyle = '#fdd835'; ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.arc(w*0.5, h*0.60, w*0.1, 0, Math.PI*2); ctx.fillStyle = '#43a047'; ctx.fill(); ctx.stroke();
            },
            drawDistractor: function(ctx, w, h, variant) { drawScenery(ctx, w, h, variant); }
        },
        {
            name: 'bicycles',
            drawTarget: function(ctx, w, h) {
                ctx.strokeStyle = '#333'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.arc(w*0.25, h*0.65, w*0.18, 0, Math.PI*2); ctx.stroke();
                ctx.beginPath(); ctx.arc(w*0.75, h*0.65, w*0.18, 0, Math.PI*2); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(w*0.25, h*0.65); ctx.lineTo(w*0.5, h*0.35); ctx.lineTo(w*0.75, h*0.65);
                ctx.moveTo(w*0.5, h*0.35); ctx.lineTo(w*0.3, h*0.35);
                ctx.moveTo(w*0.25, h*0.65); ctx.lineTo(w*0.5, h*0.65); ctx.lineTo(w*0.75, h*0.65);
                ctx.stroke();
                ctx.fillStyle = '#8B4513'; ctx.fillRect(w*0.27, h*0.3, w*0.12, h*0.06);
                ctx.beginPath(); ctx.moveTo(w*0.5, h*0.35); ctx.lineTo(w*0.58, h*0.28); ctx.lineTo(w*0.62, h*0.32); ctx.stroke();
            },
            drawDistractor: function(ctx, w, h, variant) { drawScenery(ctx, w, h, variant); }
        },
        {
            name: 'crosswalks',
            drawTarget: function(ctx, w, h) {
                ctx.fillStyle = '#555'; ctx.fillRect(0, h*0.3, w, h*0.5);
                ctx.fillStyle = '#fff';
                var stripeCount = 6;
                var stripeW = w * 0.12;
                var gap = (w - stripeCount * stripeW) / (stripeCount + 1);
                for (var i = 0; i < stripeCount; i++) {
                    ctx.fillRect(gap + i * (stripeW + gap), h*0.35, stripeW, h*0.4);
                }
                ctx.fillStyle = '#ccc'; ctx.fillRect(0, 0, w, h*0.3);
                ctx.fillRect(0, h*0.8, w, h*0.2);
            },
            drawDistractor: function(ctx, w, h, variant) { drawScenery(ctx, w, h, variant); }
        },
        {
            name: 'fire hydrants',
            drawTarget: function(ctx, w, h) {
                ctx.fillStyle = '#ddd'; ctx.fillRect(0, 0, w, h);
                ctx.fillStyle = '#999'; ctx.fillRect(0, h*0.78, w, h*0.22);
                ctx.fillStyle = '#d32f2f'; ctx.fillRect(w*0.38, h*0.3, w*0.24, h*0.48);
                ctx.fillStyle = '#b71c1c';
                ctx.beginPath(); ctx.arc(w*0.5, h*0.3, w*0.14, Math.PI, 0); ctx.fill();
                ctx.fillRect(w*0.44, h*0.18, w*0.12, h*0.14);
                ctx.fillStyle = '#c62828'; ctx.fillRect(w*0.46, h*0.12, w*0.08, h*0.08);
                ctx.fillStyle = '#b71c1c';
                ctx.fillRect(w*0.26, h*0.42, w*0.14, h*0.1);
                ctx.fillRect(w*0.60, h*0.42, w*0.14, h*0.1);
                ctx.fillRect(w*0.34, h*0.72, w*0.32, h*0.08);
            },
            drawDistractor: function(ctx, w, h, variant) { drawScenery(ctx, w, h, variant); }
        }
    ];

    function drawScenery(ctx, w, h, variant) {
        var v = variant % 8;
        ctx.fillStyle = ['#87CEEB','#B0C4DE','#E0E8F0','#FFF8DC','#F0E68C','#DDA0DD','#98FB98','#F5F5DC'][v];
        ctx.fillRect(0, 0, w, h * 0.6);
        ctx.fillStyle = ['#8FBC8F','#DEB887','#C0C0C0','#F4A460','#BDB76B','#D2B48C','#90EE90','#A9A9A9'][v];
        ctx.fillRect(0, h * 0.6, w, h * 0.4);
        if (v === 0 || v === 4) {
            ctx.fillStyle = '#8B4513'; ctx.fillRect(w*0.45, h*0.3, w*0.1, h*0.35);
            ctx.fillStyle = '#228B22'; ctx.beginPath(); ctx.arc(w*0.5, h*0.28, w*0.22, 0, Math.PI*2); ctx.fill();
        } else if (v === 1 || v === 5) {
            ctx.fillStyle = '#696969'; ctx.fillRect(w*0.2, h*0.15, w*0.6, h*0.5);
            ctx.fillStyle = '#FFD700';
            for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) ctx.fillRect(w*(0.26+c*0.16), h*(0.22+r*0.14), w*0.08, h*0.08);
        } else if (v === 2 || v === 6) {
            ctx.fillStyle = ['#4169E1','#DC143C','#32CD32','#FF8C00'][v%4];
            ctx.fillRect(w*0.15, h*0.45, w*0.7, h*0.2);
            ctx.fillRect(w*0.28, h*0.3, w*0.44, h*0.18);
            ctx.fillStyle = '#333';
            ctx.beginPath(); ctx.arc(w*0.3, h*0.68, w*0.08, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(w*0.7, h*0.68, w*0.08, 0, Math.PI*2); ctx.fill();
        } else {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(w*0.1, h*0.5, w*0.8, h*0.05);
            ctx.fillRect(w*0.1, h*0.58, w*0.8, h*0.05);
            ctx.fillRect(w*0.15, h*0.4, w*0.04, h*0.28);
            ctx.fillRect(w*0.45, h*0.4, w*0.04, h*0.28);
            ctx.fillRect(w*0.75, h*0.4, w*0.04, h*0.28);
        }
    }

    var currentCategory = null;
    var correctIndices = [];
    var selectedIndices = [];
    var attempts = 0;
    var maxAttempts = 5;
    var startTime = 0;

    var imageGrid = document.getElementById('imageGrid');
    var targetLabel = document.getElementById('targetLabel');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var attemptsText = document.getElementById('attemptsText');
    var btnVerify = document.getElementById('btnVerifyImage');
    var btnNew = document.getElementById('btnNewImage');
    var btnSkip = document.getElementById('btnSkip');

    init();

    function init() {
        currentCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
        targetLabel.textContent = currentCategory.name;
        selectedIndices = [];
        startTime = Date.now();
        hideCaptchaStatus();
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
        hintText.textContent = 'Click on matching images, then press VERIFY';
        buildGrid();
    }

    function buildGrid() {
        imageGrid.innerHTML = '';
        var targetCount = 3 + Math.floor(Math.random() * 2);
        correctIndices = [];
        while (correctIndices.length < targetCount) {
            var r = Math.floor(Math.random() * 9);
            if (correctIndices.indexOf(r) === -1) correctIndices.push(r);
        }
        selectedIndices = [];

        for (var i = 0; i < 9; i++) {
            var tile = document.createElement('div');
            tile.className = 'image-tile';
            tile.setAttribute('data-index', i);
            var c = document.createElement('canvas');
            c.width = 130; c.height = 130;
            var cx = c.getContext('2d');
            if (correctIndices.indexOf(i) !== -1) {
                cx.fillStyle = ['#E8F5E9','#FFF3E0','#E3F2FD','#F3E5F5','#FFFDE7','#E0F2F1','#FCE4EC','#F1F8E9','#E8EAF6'][i];
                cx.fillRect(0, 0, 130, 130);
                currentCategory.drawTarget(cx, 130, 130);
                addNoise(cx, 130, 130, 0.03);
            } else {
                currentCategory.drawDistractor(cx, 130, 130, i + Math.floor(Math.random() * 100));
                addNoise(cx, 130, 130, 0.02);
            }
            tile.appendChild(c);
            tile.addEventListener('click', function() { toggleTile(this); });
            imageGrid.appendChild(tile);
        }
    }

    function addNoise(ctx, w, h, intensity) {
        var imageData = ctx.getImageData(0, 0, w, h);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            if (Math.random() < intensity) {
                var noise = Math.floor(Math.random() * 40 - 20);
                data[i] = Math.max(0, Math.min(255, data[i] + noise));
                data[i+1] = Math.max(0, Math.min(255, data[i+1] + noise));
                data[i+2] = Math.max(0, Math.min(255, data[i+2] + noise));
            }
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function toggleTile(tile) {
        var idx = parseInt(tile.getAttribute('data-index'));
        var pos = selectedIndices.indexOf(idx);
        if (pos === -1) { selectedIndices.push(idx); tile.classList.add('selected'); }
        else { selectedIndices.splice(pos, 1); tile.classList.remove('selected'); }
    }

    btnVerify.addEventListener('click', function() {
        attempts++;
        var solveTime = Date.now() - startTime;
        var correctSelected = 0, incorrectSelected = 0;
        for (var i = 0; i < selectedIndices.length; i++) {
            if (correctIndices.indexOf(selectedIndices[i]) !== -1) correctSelected++;
            else incorrectSelected++;
        }
        var missed = correctIndices.length - correctSelected;
        var passed = (correctSelected === correctIndices.length && incorrectSelected === 0);
        var accuracy = correctIndices.length > 0 ? Math.round((correctSelected / correctIndices.length) * 100) : 0;

        if (passed) {
            showCaptchaStatus('pass', '✅', 'Correct! All ' + correctIndices.length + ' images identified.');
            hintText.textContent = 'Verification successful';
            logToSheet({
                captchaType: 'image', category: currentCategory.name, attemptNumber: attempts,
                result: 'pass', accuracy: accuracy, correctSelected: correctSelected,
                incorrectSelected: incorrectSelected, missed: missed,
                totalTargets: correctIndices.length, solveTime: solveTime, totalAttempts: attempts
            });
            setTimeout(function() {
                showCompleteBox('image', 'Image CAPTCHA');
            }, 1200);
        } else {
            var msg = 'Incorrect.';
            if (missed > 0) msg += ' Missed ' + missed + '.';
            if (incorrectSelected > 0) msg += ' ' + incorrectSelected + ' wrong.';
            showCaptchaStatus('fail', '❌', msg + ' Try again.');
            hintText.textContent = 'Please try again';
            logToSheet({
                captchaType: 'image', category: currentCategory.name, attemptNumber: attempts,
                result: 'fail', accuracy: accuracy, correctSelected: correctSelected,
                incorrectSelected: incorrectSelected, missed: missed,
                totalTargets: correctIndices.length, solveTime: solveTime, totalAttempts: attempts
            });
            if (attempts >= maxAttempts) {
                showCaptchaStatus('fail', '🚫', 'Max attempts. Click 🔄 for new challenge.');
            }
            selectedIndices = [];
            var tiles = imageGrid.querySelectorAll('.image-tile');
            for (var i = 0; i < tiles.length; i++) tiles[i].classList.remove('selected');
            startTime = Date.now();
        }
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
    });

    btnNew.addEventListener('click', function() { attempts = 0; init(); });
    btnSkip.addEventListener('click', function() {
        logToSheet({ captchaType: 'image', category: currentCategory.name, attemptNumber: attempts, result: 'skipped', accuracy: 0, solveTime: Date.now() - startTime, totalAttempts: attempts });
        attempts = 0; init();
    });

    function showCaptchaStatus(type, icon, text) { captchaStatus.className = 'captcha-status ' + type; statusIcon.textContent = icon; statusText.textContent = text; }
    function hideCaptchaStatus() { captchaStatus.className = 'captcha-status hidden'; }

})();