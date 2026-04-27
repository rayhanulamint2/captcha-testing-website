// ===================================================
// IMAGE CAPTCHA — Full Logic
// All images come from ONE category folder only.
//   Targets    = category/1.jpg, 2.jpg ...
//   Distractors = category/similar/1.jpg, 2.jpg ...
// ===================================================
(function() {

    // Read config
    var CFG = IMAGE_CAPTCHA_CONFIG;
    var categories = CFG.categories;
    var basePath = CFG.basePath;
    var defaultExt = CFG.defaultExt || '.jpg';
    var gridSize = CFG.gridSize || 9;

    // State
    var currentCategory = null;
    var correctIndices = [];
    var selectedIndices = [];
    var attempts = 0;
    var maxAttempts = 5;
    var startTime = 0;

    // DOM
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

    // ─── HELPERS ──────────────────────────────────────────

    function targetPath(cat, num) {
        var ext = cat.ext || defaultExt;
        return basePath + cat.folder + '/' + num + ext;
    }

    function similarPath(cat, num) {
        var ext = cat.ext || defaultExt;
        return basePath + cat.folder + '/similar/' + num + ext;
    }

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
        return arr;
    }

    function pickRandom(arr, n) {
        var copy = arr.slice();
        shuffle(copy);
        return copy.slice(0, Math.min(n, copy.length));
    }

    function numRange(count) {
        var nums = [];
        for (var i = 1; i <= count; i++) nums.push(i);
        return nums;
    }

    // ─── INIT ─────────────────────────────────────────────

    init();

    function init() {
        currentCategory = categories[Math.floor(Math.random() * categories.length)];
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

        // ── 1. Pick target images from category/ ─────────
        var minT = CFG.minTargets || 3;
        var maxT = CFG.maxTargets || 4;
        var targetCount = minT + Math.floor(Math.random() * (maxT - minT + 1));
        targetCount = Math.min(targetCount, currentCategory.count);

        var targetNums = pickRandom(numRange(currentCategory.count), targetCount);

        var tiles = [];
        for (var i = 0; i < targetNums.length; i++) {
            tiles.push({
                src: targetPath(currentCategory, targetNums[i]),
                isTarget: true
            });
        }

        // ── 2. Fill ALL distractors from category/similar/ ──
        var distractorCount = gridSize - targetCount;
        var similarAvailable = currentCategory.similarCount || 0;
        var similarNums = pickRandom(numRange(similarAvailable), distractorCount);

        for (var s = 0; s < similarNums.length; s++) {
            tiles.push({
                src: similarPath(currentCategory, similarNums[s]),
                isTarget: false
            });
        }

        // ── 3. Shuffle and record correct indices ────────
        shuffle(tiles);

        correctIndices = [];
        for (var t = 0; t < tiles.length; t++) {
            if (tiles[t].isTarget) correctIndices.push(t);
        }

        selectedIndices = [];

        // ── 4. Render tiles ──────────────────────────────
        for (var i = 0; i < tiles.length; i++) {
            var tile = document.createElement('div');
            tile.className = 'image-tile';
            tile.setAttribute('data-index', i);

            var img = document.createElement('img');
            img.src = tiles[i].src;
            img.alt = 'CAPTCHA image ' + (i + 1);
            img.draggable = false;

            img.onerror = (function(tileEl, index) {
                return function() {
                    tileEl.style.background = ['#E8F5E9','#FFF3E0','#E3F2FD','#F3E5F5','#FFFDE7','#E0F2F1','#FCE4EC','#F1F8E9','#E8EAF6'][index % 9];
                    tileEl.innerHTML = '<span style="color:#999;font-size:0.7rem;display:flex;align-items:center;justify-content:center;height:100%;">Image not found</span>';
                    tileEl.addEventListener('click', function() { toggleTile(tileEl); });
                };
            })(tile, i);

            tile.appendChild(img);
            tile.addEventListener('click', function() { toggleTile(this); });
            imageGrid.appendChild(tile);
        }
    }

    // ─── TILE INTERACTION ─────────────────────────────────

    function toggleTile(tile) {
        var idx = parseInt(tile.getAttribute('data-index'));
        var pos = selectedIndices.indexOf(idx);
        if (pos === -1) {
            selectedIndices.push(idx);
            tile.classList.add('selected');
        } else {
            selectedIndices.splice(pos, 1);
            tile.classList.remove('selected');
        }
    }

    // ─── VERIFY ───────────────────────────────────────────

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

    // ─── NEW / SKIP ───────────────────────────────────────

    btnNew.addEventListener('click', function() { attempts = 0; init(); });
    btnSkip.addEventListener('click', function() {
        logToSheet({
            captchaType: 'image', category: currentCategory.name,
            attemptNumber: attempts, result: 'skipped', accuracy: 0,
            solveTime: Date.now() - startTime, totalAttempts: attempts
        });
        attempts = 0;
        init();
    });

    // ─── STATUS HELPERS ───────────────────────────────────

    function showCaptchaStatus(type, icon, text) {
        captchaStatus.className = 'captcha-status ' + type;
        statusIcon.textContent = icon;
        statusText.textContent = text;
    }

    function hideCaptchaStatus() {
        captchaStatus.className = 'captcha-status hidden';
    }

})();