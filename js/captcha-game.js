// ===================================================
// GAME CAPTCHA — Jigsaw Puzzle with Rotation
// The HARDEST captcha in the study
// (No visible timer — time tracked silently)
// ===================================================
(function () {

    var GRID_SIZE = 3;
    var PIECE_SIZE = 90;
    var PREVIEW_TIME = 5000;
    var attempts = 0;
    var maxAttempts = 5;
    var startTime = 0;
    var previewTimer = null;
    var gameStartTime = 0;
    var moveCount = 0;
    var rotationCount = 0;
    var isGameActive = false;
    var currentImageData = null;

    var board = [];
    var pieces = [];
    var draggedPiece = null;

    var PATTERNS = [
        {
            name: 'Sunset Landscape',
            draw: function (ctx, w, h) {
                var skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
                skyGrad.addColorStop(0, '#1a0533');
                skyGrad.addColorStop(0.3, '#4a1942');
                skyGrad.addColorStop(0.5, '#c94b4b');
                skyGrad.addColorStop(0.7, '#f09819');
                skyGrad.addColorStop(1, '#ffcf48');
                ctx.fillStyle = skyGrad;
                ctx.fillRect(0, 0, w, h * 0.65);

                ctx.beginPath();
                ctx.arc(w * 0.7, h * 0.4, w * 0.1, 0, Math.PI * 2);
                ctx.fillStyle = '#ffe066';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(w * 0.7, h * 0.4, w * 0.13, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,224,102,0.3)';
                ctx.fill();

                ctx.fillStyle = '#2d1b4e';
                ctx.beginPath();
                ctx.moveTo(0, h * 0.55);
                ctx.lineTo(w * 0.15, h * 0.3);
                ctx.lineTo(w * 0.3, h * 0.5);
                ctx.lineTo(w * 0.5, h * 0.25);
                ctx.lineTo(w * 0.65, h * 0.45);
                ctx.lineTo(w * 0.8, h * 0.2);
                ctx.lineTo(w, h * 0.4);
                ctx.lineTo(w, h * 0.65);
                ctx.lineTo(0, h * 0.65);
                ctx.fill();

                ctx.fillStyle = '#1a3a2a';
                ctx.fillRect(0, h * 0.6, w, h * 0.4);

                ctx.strokeStyle = '#2a5a3a';
                ctx.lineWidth = 1;
                for (var i = 0; i < 30; i++) {
                    var gx = Math.random() * w;
                    var gy = h * 0.62 + Math.random() * h * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(gx, gy);
                    ctx.lineTo(gx + (Math.random() - 0.5) * 10, gy - 5 - Math.random() * 10);
                    ctx.stroke();
                }

                for (var i = 0; i < 5; i++) {
                    var tx = w * 0.1 + i * w * 0.2;
                    var ty = h * 0.55 + Math.random() * h * 0.1;
                    drawTree(ctx, tx, ty, 8 + Math.random() * 12);
                }

                ctx.fillStyle = '#fff';
                for (var i = 0; i < 15; i++) {
                    var sx = Math.random() * w;
                    var sy = Math.random() * h * 0.3;
                    ctx.beginPath();
                    ctx.arc(sx, sy, 1 + Math.random(), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        {
            name: 'Ocean Scene',
            draw: function (ctx, w, h) {
                var skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.5);
                skyGrad.addColorStop(0, '#0077b6');
                skyGrad.addColorStop(1, '#90e0ef');
                ctx.fillStyle = skyGrad;
                ctx.fillRect(0, 0, w, h * 0.5);

                ctx.fillStyle = 'rgba(255,255,255,0.8)';
                drawCloud(ctx, w * 0.2, h * 0.15, 30);
                drawCloud(ctx, w * 0.6, h * 0.1, 25);
                drawCloud(ctx, w * 0.85, h * 0.2, 20);

                var oceanGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
                oceanGrad.addColorStop(0, '#0096c7');
                oceanGrad.addColorStop(0.5, '#023e8a');
                oceanGrad.addColorStop(1, '#03045e');
                ctx.fillStyle = oceanGrad;
                ctx.fillRect(0, h * 0.45, w, h * 0.55);

                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                ctx.lineWidth = 2;
                for (var i = 0; i < 8; i++) {
                    var wy = h * 0.5 + i * h * 0.06;
                    ctx.beginPath();
                    for (var x = 0; x < w; x += 5) {
                        var y = wy + Math.sin(x * 0.03 + i * 2) * 4;
                        if (x === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }

                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.moveTo(w * 0.35, h * 0.48);
                ctx.lineTo(w * 0.65, h * 0.48);
                ctx.lineTo(w * 0.6, h * 0.55);
                ctx.lineTo(w * 0.4, h * 0.55);
                ctx.fill();

                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.48);
                ctx.lineTo(w * 0.5, h * 0.25);
                ctx.stroke();
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.moveTo(w * 0.5, h * 0.27);
                ctx.lineTo(w * 0.5, h * 0.46);
                ctx.lineTo(w * 0.62, h * 0.46);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(w * 0.85, h * 0.12, w * 0.06, 0, Math.PI * 2);
                ctx.fillStyle = '#ffd700';
                ctx.fill();
            }
        },
        {
            name: 'City Skyline',
            draw: function (ctx, w, h) {
                var skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
                skyGrad.addColorStop(0, '#0d1b2a');
                skyGrad.addColorStop(1, '#1b2838');
                ctx.fillStyle = skyGrad;
                ctx.fillRect(0, 0, w, h * 0.65);

                ctx.fillStyle = '#fff';
                for (var i = 0; i < 40; i++) {
                    ctx.beginPath();
                    ctx.arc(Math.random() * w, Math.random() * h * 0.5, Math.random() * 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(w * 0.8, h * 0.15, w * 0.05, 0, Math.PI * 2);
                ctx.fillStyle = '#f0e68c';
                ctx.fill();

                var buildingColors = ['#1a1a2e', '#16213e', '#0f3460', '#1a1a40', '#2c2c54'];
                var bx = 0;
                while (bx < w) {
                    var bw = 25 + Math.random() * 40;
                    var bh = h * 0.2 + Math.random() * h * 0.4;
                    var by = h * 0.65 - bh;

                    ctx.fillStyle = buildingColors[Math.floor(Math.random() * buildingColors.length)];
                    ctx.fillRect(bx, by, bw, bh);

                    ctx.fillStyle = Math.random() > 0.3 ? '#ffd700' : '#555';
                    var winSize = 4;
                    var winGap = 8;
                    for (var wy = by + 8; wy < by + bh - 8; wy += winGap) {
                        for (var wx = bx + 5; wx < bx + bw - 5; wx += winGap) {
                            if (Math.random() > 0.3) {
                                ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255,215,0,0.8)' : 'rgba(100,100,100,0.5)';
                                ctx.fillRect(wx, wy, winSize, winSize);
                            }
                        }
                    }

                    bx += bw + 2;
                }

                ctx.fillStyle = '#333';
                ctx.fillRect(0, h * 0.65, w, h * 0.35);

                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 2;
                ctx.setLineDash([12, 8]);
                ctx.beginPath();
                ctx.moveTo(0, h * 0.82);
                ctx.lineTo(w, h * 0.82);
                ctx.stroke();
                ctx.setLineDash([]);

                for (var i = 0; i < 4; i++) {
                    var lx = w * 0.15 + i * w * 0.25;
                    ctx.strokeStyle = '#666';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(lx, h * 0.65);
                    ctx.lineTo(lx, h * 0.58);
                    ctx.lineTo(lx + 8, h * 0.58);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(lx + 8, h * 0.57, 3, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffffaa';
                    ctx.fill();
                }
            }
        },
        {
            name: 'Garden Flowers',
            draw: function (ctx, w, h) {
                ctx.fillStyle = '#87ceeb';
                ctx.fillRect(0, 0, w, h * 0.5);

                var groundGrad = ctx.createLinearGradient(0, h * 0.45, 0, h);
                groundGrad.addColorStop(0, '#4caf50');
                groundGrad.addColorStop(1, '#2e7d32');
                ctx.fillStyle = groundGrad;
                ctx.fillRect(0, h * 0.45, w, h * 0.55);

                ctx.beginPath();
                ctx.arc(w * 0.15, h * 0.12, w * 0.07, 0, Math.PI * 2);
                ctx.fillStyle = '#ffd700';
                ctx.fill();

                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                drawCloud(ctx, w * 0.4, h * 0.1, 22);
                drawCloud(ctx, w * 0.75, h * 0.18, 18);

                ctx.fillStyle = '#deb887';
                ctx.fillRect(0, h * 0.38, w, h * 0.04);
                ctx.fillRect(0, h * 0.44, w, h * 0.04);
                for (var fx = 10; fx < w; fx += 30) {
                    ctx.fillRect(fx, h * 0.32, 6, h * 0.18);
                    ctx.beginPath();
                    ctx.moveTo(fx, h * 0.32);
                    ctx.lineTo(fx + 3, h * 0.28);
                    ctx.lineTo(fx + 6, h * 0.32);
                    ctx.fill();
                }

                var flowerColors = ['#e53935', '#ff9800', '#ffeb3b', '#e91e63', '#9c27b0', '#2196f3'];
                for (var i = 0; i < 12; i++) {
                    var fx = w * 0.08 + Math.random() * w * 0.84;
                    var fy = h * 0.52 + Math.random() * h * 0.35;
                    var fs = 8 + Math.random() * 12;

                    ctx.strokeStyle = '#388e3c';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(fx, fy);
                    ctx.lineTo(fx + (Math.random() - 0.5) * 4, fy + fs * 2);
                    ctx.stroke();

                    if (Math.random() > 0.4) {
                        ctx.fillStyle = '#4caf50';
                        ctx.beginPath();
                        ctx.ellipse(fx + 5, fy + fs, 6, 3, 0.5, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    var fc = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                    ctx.fillStyle = fc;
                    for (var p = 0; p < 5; p++) {
                        var angle = (Math.PI * 2 / 5) * p;
                        ctx.beginPath();
                        ctx.ellipse(
                            fx + Math.cos(angle) * fs * 0.5,
                            fy + Math.sin(angle) * fs * 0.5,
                            fs * 0.4, fs * 0.25,
                            angle, 0, Math.PI * 2
                        );
                        ctx.fill();
                    }

                    ctx.beginPath();
                    ctx.arc(fx, fy, fs * 0.25, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffeb3b';
                    ctx.fill();
                }

                ctx.fillStyle = '#ff6f61';
                ctx.beginPath();
                ctx.ellipse(w * 0.6, h * 0.35, 10, 7, -0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(w * 0.63, h * 0.34, 10, 7, 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#333';
                ctx.fillRect(w * 0.61, h * 0.34, 2, 8);
            }
        }
    ];

    function drawTree(ctx, x, y, size) {
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(x - 2, y, 4, size * 1.5);
        ctx.fillStyle = '#1b5e20';
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.7, y + 2);
        ctx.lineTo(x + size * 0.7, y + 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.6);
        ctx.lineTo(x - size * 0.5, y + size * 0.4);
        ctx.lineTo(x + size * 0.5, y + size * 0.4);
        ctx.fill();
    }

    function drawCloud(ctx, x, y, size) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y - size * 0.2, size * 0.7, 0, Math.PI * 2);
        ctx.arc(x + size * 1.4, y, size * 0.6, 0, Math.PI * 2);
        ctx.arc(x - size * 0.5, y + size * 0.1, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // DOM refs
    var previewCanvas = document.getElementById('previewCanvas');
    var previewCtx = previewCanvas.getContext('2d');
    var previewPhase = document.getElementById('previewPhase');
    var puzzlePhase = document.getElementById('puzzlePhase');
    var previewCountdown = document.getElementById('previewCountdown');
    var puzzleBoard = document.getElementById('puzzleBoard');
    var puzzleTray = document.getElementById('puzzleTray');
    var gameInstruction = document.getElementById('gameInstruction');
    var btnVerify = document.getElementById('btnVerifyGame');
    var btnResetGame = document.getElementById('btnResetGame');
    var btnNewGame = document.getElementById('btnNewGame');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var attemptsText = document.getElementById('attemptsText');

    init();

    function init() {
        isGameActive = false;
        moveCount = 0;
        rotationCount = 0;
        btnVerify.disabled = true;
        hideCaptchaStatus();
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
        hintText.textContent = 'Memorize the image carefully!';

        // Pick random pattern
        var pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        gameInstruction.textContent = 'Memorize the image "' + pattern.name + '", then reconstruct it. Drag pieces to the grid. Click to rotate.';

        // Draw preview
        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        pattern.draw(previewCtx, previewCanvas.width, previewCanvas.height);

        // Store image data for slicing
        currentImageData = previewCtx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);

        // Show preview phase
        previewPhase.style.display = 'block';
        puzzlePhase.style.display = 'none';

        // Start countdown
        var remaining = PREVIEW_TIME / 1000;
        previewCountdown.textContent = 'Starting in ' + remaining + '...';

        clearInterval(previewTimer);
        previewTimer = setInterval(function () {
            remaining--;
            if (remaining <= 0) {
                clearInterval(previewTimer);
                previewCountdown.textContent = 'Go!';
                setTimeout(function () {
                    startPuzzle(pattern);
                }, 300);
            } else {
                previewCountdown.textContent = 'Starting in ' + remaining + '...';
            }
        }, 1000);
    }

    function startPuzzle(pattern) {
        previewPhase.style.display = 'none';
        puzzlePhase.style.display = 'block';
        isGameActive = true;
        gameStartTime = Date.now();
        startTime = Date.now();
        hintText.textContent = 'Drag pieces to the board. Click a piece to rotate 90°.';

        // Initialize board (empty)
        board = [];
        for (var r = 0; r < GRID_SIZE; r++) {
            board[r] = [];
            for (var c = 0; c < GRID_SIZE; c++) {
                board[r][c] = null;
            }
        }

        // Create pieces from the image
        pieces = [];
        var pW = Math.floor(previewCanvas.width / GRID_SIZE);
        var pH = Math.floor(previewCanvas.height / GRID_SIZE);

        for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
                var pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = pW;
                pieceCanvas.height = pH;
                var pieceCtx = pieceCanvas.getContext('2d');

                pieceCtx.putImageData(
                    previewCtx.getImageData(c * pW, r * pH, pW, pH),
                    0, 0
                );

                pieceCtx.strokeStyle = 'rgba(0,0,0,0.2)';
                pieceCtx.lineWidth = 1;
                pieceCtx.strokeRect(0, 0, pW, pH);

                var rotation = Math.floor(Math.random() * 4);

                pieces.push({
                    index: r * GRID_SIZE + c,
                    correctRow: r,
                    correctCol: c,
                    rotation: rotation,
                    canvas: pieceCanvas,
                    placed: false,
                    boardRow: -1,
                    boardCol: -1
                });
            }
        }

        // Shuffle pieces
        for (var i = pieces.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = pieces[i];
            pieces[i] = pieces[j];
            pieces[j] = temp;
        }

        renderBoard();
        renderTray();
    }

    function renderBoard() {
        puzzleBoard.innerHTML = '';
        puzzleBoard.style.gridTemplateColumns = 'repeat(' + GRID_SIZE + ', ' + PIECE_SIZE + 'px)';
        puzzleBoard.style.gridTemplateRows = 'repeat(' + GRID_SIZE + ', ' + PIECE_SIZE + 'px)';

        for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
                var cell = document.createElement('div');
                cell.className = 'puzzle-cell';
                cell.setAttribute('data-row', r);
                cell.setAttribute('data-col', c);

                if (board[r][c] !== null) {
                    var piece = board[r][c];
                    cell.classList.add('occupied');
                    var wrapper = document.createElement('div');
                    wrapper.className = 'puzzle-piece-placed';

                    var displayCanvas = createRotatedCanvas(piece.canvas, piece.rotation);
                    wrapper.appendChild(displayCanvas);

                    (function (pr, pc, pieceRef) {
                        wrapper.addEventListener('click', function () {
                            if (!isGameActive) return;
                            board[pr][pc] = null;
                            pieceRef.placed = false;
                            pieceRef.boardRow = -1;
                            pieceRef.boardCol = -1;
                            moveCount++;
                            renderBoard();
                            renderTray();
                            checkVerifyButton();
                        });
                    })(r, c, piece);

                    cell.appendChild(wrapper);
                } else {
                    cell.textContent = (r * GRID_SIZE + c + 1);
                }

                cell.addEventListener('dragover', function (e) {
                    e.preventDefault();
                    this.classList.add('drag-over');
                });
                cell.addEventListener('dragleave', function () {
                    this.classList.remove('drag-over');
                });
                (function (row, col) {
                    cell.addEventListener('drop', function (e) {
                        e.preventDefault();
                        this.classList.remove('drag-over');
                        handleDrop(row, col);
                    });
                })(r, c);

                cell.setAttribute('data-drop-row', r);
                cell.setAttribute('data-drop-col', c);

                puzzleBoard.appendChild(cell);
            }
        }
    }

    function renderTray() {
        puzzleTray.innerHTML = '';
        var unplacedPieces = pieces.filter(function (p) { return !p.placed; });

        for (var i = 0; i < unplacedPieces.length; i++) {
            var piece = unplacedPieces[i];
            var pieceEl = document.createElement('div');
            pieceEl.className = 'puzzle-piece';
            pieceEl.setAttribute('data-piece-index', piece.index);
            pieceEl.draggable = true;

            var displayCanvas = createRotatedCanvas(piece.canvas, piece.rotation);
            pieceEl.appendChild(displayCanvas);

            var rotateHint = document.createElement('span');
            rotateHint.className = 'rotate-hint';
            rotateHint.textContent = piece.rotation * 90 + '°';
            pieceEl.appendChild(rotateHint);

            (function (pieceRef, el) {
                el.addEventListener('click', function (e) {
                    if (!isGameActive) return;
                    if (e.detail === 1) {
                        setTimeout(function () {
                            if (!pieceRef.placed) {
                                pieceRef.rotation = (pieceRef.rotation + 1) % 4;
                                rotationCount++;
                                renderTray();
                            }
                        }, 200);
                    }
                });
            })(piece, pieceEl);

            (function (pieceRef) {
                pieceEl.addEventListener('dragstart', function (e) {
                    draggedPiece = pieceRef;
                    e.dataTransfer.setData('text/plain', pieceRef.index);
                    this.style.opacity = '0.5';
                });
                pieceEl.addEventListener('dragend', function () {
                    this.style.opacity = '1';
                    draggedPiece = null;
                });
            })(piece);

            (function (pieceRef, el) {
                var touchStartX, touchStartY;

                el.addEventListener('touchstart', function (e) {
                    draggedPiece = pieceRef;
                    var touch = e.touches[0];
                    touchStartX = touch.clientX;
                    touchStartY = touch.clientY;
                    el.style.opacity = '0.5';
                }, { passive: true });

                el.addEventListener('touchmove', function (e) {
                    e.preventDefault();
                }, { passive: false });

                el.addEventListener('touchend', function (e) {
                    el.style.opacity = '1';
                    if (!draggedPiece) return;

                    var touch = e.changedTouches[0];
                    var dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

                    while (dropTarget && !dropTarget.classList.contains('puzzle-cell')) {
                        dropTarget = dropTarget.parentElement;
                    }

                    if (dropTarget && dropTarget.classList.contains('puzzle-cell')) {
                        var row = parseInt(dropTarget.getAttribute('data-row'));
                        var col = parseInt(dropTarget.getAttribute('data-col'));
                        if (!isNaN(row) && !isNaN(col)) {
                            handleDrop(row, col);
                        }
                    }

                    var dx = Math.abs(touch.clientX - touchStartX);
                    var dy = Math.abs(touch.clientY - touchStartY);
                    if (dx < 10 && dy < 10 && !pieceRef.placed) {
                        pieceRef.rotation = (pieceRef.rotation + 1) % 4;
                        rotationCount++;
                        renderTray();
                    }

                    draggedPiece = null;
                }, { passive: true });
            })(piece, pieceEl);

            puzzleTray.appendChild(pieceEl);
        }

        if (unplacedPieces.length === 0) {
            var empty = document.createElement('div');
            empty.style.cssText = 'grid-column: 1/-1; text-align:center; color:#999; font-size:0.8rem; padding:15px;';
            empty.textContent = 'All pieces placed! Click Verify.';
            puzzleTray.appendChild(empty);
        }
    }

    function handleDrop(row, col) {
        if (!draggedPiece || !isGameActive) return;
        if (board[row][col] !== null) return;

        draggedPiece.placed = true;
        draggedPiece.boardRow = row;
        draggedPiece.boardCol = col;
        board[row][col] = draggedPiece;
        moveCount++;

        renderBoard();
        renderTray();
        checkVerifyButton();

        draggedPiece = null;
    }

    function createRotatedCanvas(sourceCanvas, rotation) {
        var c = document.createElement('canvas');
        c.width = sourceCanvas.width;
        c.height = sourceCanvas.height;
        var cx = c.getContext('2d');

        cx.save();
        cx.translate(c.width / 2, c.height / 2);
        cx.rotate(rotation * Math.PI / 2);
        cx.drawImage(sourceCanvas, -sourceCanvas.width / 2, -sourceCanvas.height / 2);
        cx.restore();

        return c;
    }

    function checkVerifyButton() {
        var allPlaced = true;
        for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
                if (board[r][c] === null) {
                    allPlaced = false;
                    break;
                }
            }
            if (!allPlaced) break;
        }
        btnVerify.disabled = !allPlaced;
        if (allPlaced) {
            hintText.textContent = 'All pieces placed! Click Verify to check.';
        }
    }

    function countCorrectPieces() {
        var count = 0;
        for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
                var piece = board[r][c];
                if (piece && piece.correctRow === r && piece.correctCol === c && piece.rotation === 0) {
                    count++;
                }
            }
        }
        return count;
    }

    // VERIFY
    window.verifyGame = function () {
        if (!isGameActive) return;

        attempts++;
        isGameActive = false;
        var solveTime = Date.now() - startTime;

        var correctCount = countCorrectPieces();
        var totalPieces = GRID_SIZE * GRID_SIZE;
        var passed = correctCount === totalPieces;
        var accuracy = Math.round((correctCount / totalPieces) * 100);

        if (passed) {
            showCaptchaStatus('pass', '✅', 'Puzzle solved! ' + correctCount + '/' + totalPieces + ' correct.');
            hintText.textContent = 'Verification successful!';
            btnVerify.disabled = true;

            logToSheet({
                captchaType: 'game',
                attemptNumber: attempts,
                result: 'pass',
                accuracy: accuracy,
                solveTime: solveTime,
                moveCount: moveCount,
                rotationCount: rotationCount,
                correctPieces: correctCount,
                totalPieces: totalPieces,
                totalAttempts: attempts
            });

            setTimeout(function () {
                // Use shared showCompleteBox for navigation to next captcha or home
                if (typeof showCompleteBox === 'function') {
                    showCompleteBox('game', 'Game CAPTCHA');
                } else {
                    // fallback: just show completeBox if not loaded
                    var completeBox = document.getElementById('completeBox');
                    if (completeBox) completeBox.style.display = 'block';
                }
            }, 1200);
        } else {
            var wrongPositions = 0;
            var wrongRotations = 0;
            for (var r = 0; r < GRID_SIZE; r++) {
                for (var c = 0; c < GRID_SIZE; c++) {
                    var piece = board[r][c];
                    if (piece) {
                        if (piece.correctRow !== r || piece.correctCol !== c) wrongPositions++;
                        else if (piece.rotation !== 0) wrongRotations++;
                    }
                }
            }

            var msg = correctCount + '/' + totalPieces + ' correct.';
            if (wrongPositions > 0) msg += ' ' + wrongPositions + ' misplaced.';
            if (wrongRotations > 0) msg += ' ' + wrongRotations + ' wrong rotation.';

            showCaptchaStatus('fail', '❌', msg);
            hintText.textContent = 'Fix positions and rotations, then try again.';

            logToSheet({
                captchaType: 'game',
                attemptNumber: attempts,
                result: 'fail',
                accuracy: accuracy,
                solveTime: solveTime,
                moveCount: moveCount,
                rotationCount: rotationCount,
                correctPieces: correctCount,
                totalPieces: totalPieces,
                wrongPositions: wrongPositions,
                wrongRotations: wrongRotations,
                totalAttempts: attempts
            });

            if (attempts >= maxAttempts) {
                showCaptchaStatus('fail', '🚫', 'Max attempts reached. Click New Puzzle.');
                btnVerify.disabled = true;
            } else {
                isGameActive = true;
                startTime = Date.now();
            }
        }
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
    };

    // RESET — Put all pieces back in tray
    window.resetGame = function () {
        if (!isGameActive && attempts < maxAttempts) {
            init();
            return;
        }

        for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
                if (board[r][c]) {
                    board[r][c].placed = false;
                    board[r][c].boardRow = -1;
                    board[r][c].boardCol = -1;
                    board[r][c] = null;
                }
            }
        }
        moveCount = 0;
        hideCaptchaStatus();
        btnVerify.disabled = true;
        hintText.textContent = 'Drag pieces to the board. Click a piece to rotate.';
        renderBoard();
        renderTray();
    };

    // NEW GAME
    window.newGame = function () {
        clearInterval(previewTimer);
        isGameActive = false;
        attempts = 0;
        init();
    };

    function showCaptchaStatus(type, icon, text) {
        captchaStatus.className = 'captcha-status ' + type;
        statusIcon.textContent = icon;
        statusText.textContent = text;
    }

    function hideCaptchaStatus() {
        captchaStatus.className = 'captcha-status hidden';
    }

})();