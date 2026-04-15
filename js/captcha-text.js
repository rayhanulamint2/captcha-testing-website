// ===================================================
// TEXT CAPTCHA — Distorted Text (No visible timer)
// ===================================================
(function() {

    var CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    var captchaLength = 6;
    var currentText = '';
    var attempts = 0;
    var maxAttempts = 5;
    var startTime = 0;

    var canvas = document.getElementById('textCaptchaCanvas');
    var ctx = canvas.getContext('2d');
    var textInput = document.getElementById('textInput');
    var btnVerify = document.getElementById('btnVerifyText');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var attemptsText = document.getElementById('attemptsText');

    textInput.addEventListener('input', function() {
        btnVerify.disabled = textInput.value.trim().length === 0;
    });
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !btnVerify.disabled) verifyText();
    });

    init();

    function init() {
        currentText = generateRandomText();
        startTime = Date.now();
        textInput.value = '';
        textInput.disabled = false;
        btnVerify.disabled = true;
        hideCaptchaStatus();
        hintText.textContent = 'Case-insensitive';
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
        renderCaptcha();
        textInput.focus();
    }

    function generateRandomText() {
        var text = '';
        for (var i = 0; i < captchaLength; i++) text += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        return text;
    }

    function renderCaptcha() {
        var W = canvas.width, H = canvas.height;
        var grad = ctx.createLinearGradient(0, 0, W, H);
        grad.addColorStop(0, randomPastel()); grad.addColorStop(1, randomPastel());
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);

        for (var i = 0; i < 150; i++) {
            ctx.fillStyle = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.3)';
            ctx.fillRect(Math.random()*W, Math.random()*H, Math.random()*3+1, Math.random()*3+1);
        }
        for (var i = 0; i < 6; i++) {
            ctx.strokeStyle = 'rgba('+Math.floor(Math.random()*200)+','+Math.floor(Math.random()*200)+','+Math.floor(Math.random()*200)+',0.5)';
            ctx.lineWidth = Math.random()*2+0.5;
            ctx.beginPath(); ctx.moveTo(Math.random()*W, Math.random()*H);
            ctx.bezierCurveTo(Math.random()*W, Math.random()*H, Math.random()*W, Math.random()*H, Math.random()*W, Math.random()*H);
            ctx.stroke();
        }

        var charWidth = W / (captchaLength + 2);
        for (var i = 0; i < currentText.length; i++) {
            ctx.save();
            var x = charWidth*(i+1)+(Math.random()*10-5);
            var y = H/2+(Math.random()*16-8);
            var angle = (Math.random()-0.5)*0.6;
            var fontSize = 26+Math.floor(Math.random()*10);
            ctx.translate(x, y); ctx.rotate(angle);
            ctx.transform(1, (Math.random()-0.5)*0.3, 0, 1, 0, 0);
            ctx.font = 'bold '+fontSize+'px '+randomFont();
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillStyle = 'rgba('+Math.floor(Math.random()*100)+','+Math.floor(Math.random()*100)+','+Math.floor(Math.random()*100)+',0.9)';
            ctx.fillText(currentText[i], 2, 2);
            ctx.fillStyle = randomDarkColor();
            ctx.fillText(currentText[i], 0, 0);
            if (Math.random() > 0.6) {
                ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(-fontSize*0.4, 0); ctx.lineTo(fontSize*0.4, (Math.random()-0.5)*8); ctx.stroke();
            }
            ctx.restore();
        }

        for (var i = 0; i < 4; i++) {
            ctx.strokeStyle = 'rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.25)';
            ctx.lineWidth = Math.random()*3+1;
            ctx.beginPath(); ctx.moveTo(Math.random()*W, Math.random()*H);
            ctx.lineTo(Math.random()*W, Math.random()*H); ctx.stroke();
        }
    }

    function randomPastel() { return 'hsl('+Math.floor(Math.random()*360)+',40%,85%)'; }
    function randomDarkColor() { return 'rgb('+Math.floor(Math.random()*120)+','+Math.floor(Math.random()*120)+','+Math.floor(Math.random()*120)+')'; }
    function randomFont() { return ['Georgia','Courier New','Times New Roman','Arial','Verdana','Impact','Comic Sans MS'][Math.floor(Math.random()*7)]; }

    window.verifyText = function() {
        var userInput = textInput.value.trim();
        if (!userInput) return;
        attempts++;
        var solveTime = Date.now() - startTime;
        var passed = userInput.toLowerCase() === currentText.toLowerCase();
        var matchedChars = 0;
        var compareLen = Math.min(userInput.length, currentText.length);
        for (var i = 0; i < compareLen; i++) {
            if (userInput[i].toLowerCase() === currentText[i].toLowerCase()) matchedChars++;
        }
        var accuracy = Math.round((matchedChars / currentText.length) * 100);

        if (passed) {
            showCaptchaStatus('pass', '✅', 'Correct!');
            hintText.textContent = 'Verification successful';
            textInput.disabled = true; btnVerify.disabled = true;
            logToSheet({
                captchaType: 'text', attemptNumber: attempts, result: 'pass', accuracy: accuracy,
                matchedChars: matchedChars, totalChars: currentText.length, solveTime: solveTime,
                userInput: userInput, expectedText: currentText, totalAttempts: attempts
            });
            setTimeout(function() {
                showCompleteBox('text', 'Text CAPTCHA');
            }, 1200);
        } else {
            showCaptchaStatus('fail', '❌', 'Incorrect — ' + matchedChars + '/' + currentText.length + ' chars matched.');
            hintText.textContent = 'Try again or get new text';
            logToSheet({
                captchaType: 'text', attemptNumber: attempts, result: 'fail', accuracy: accuracy,
                matchedChars: matchedChars, totalChars: currentText.length, solveTime: solveTime,
                userInput: userInput, expectedText: currentText, totalAttempts: attempts
            });
            if (attempts >= maxAttempts) {
                showCaptchaStatus('fail', '🚫', 'Max attempts. The text was: "' + currentText + '"');
                textInput.disabled = true; btnVerify.disabled = true;
            } else { textInput.value = ''; textInput.focus(); startTime = Date.now(); }
        }
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
    };

    window.generateNewText = function() { attempts = 0; init(); };

    function showCaptchaStatus(type, icon, text) { captchaStatus.className = 'captcha-status ' + type; statusIcon.textContent = icon; statusText.textContent = text; }
    function hideCaptchaStatus() { captchaStatus.className = 'captcha-status hidden'; }

})();
