// ===================================================
// AUDIO CAPTCHA — Spoken Words (No visible timer)
// ===================================================
(function() {

    var WORD_SETS = [
        { words: ['apple', 'river', 'dance'], display: 'apple river dance' },
        { words: ['green', 'table', 'stone'], display: 'green table stone' },
        { words: ['house', 'seven', 'cloud'], display: 'house seven cloud' },
        { words: ['bridge', 'fire', 'moon'], display: 'bridge fire moon' },
        { words: ['garden', 'blue', 'train'], display: 'garden blue train' },
        { words: ['ocean', 'pencil', 'star'], display: 'ocean pencil star' },
        { words: ['winter', 'bell', 'road'], display: 'winter bell road' },
        { words: ['forest', 'lamp', 'chair'], display: 'forest lamp chair' },
        { words: ['silver', 'cake', 'north'], display: 'silver cake north' },
        { words: ['planet', 'song', 'brick'], display: 'planet song brick' },
        { words: ['tiger', 'wind', 'glass'], display: 'tiger wind glass' },
        { words: ['mountain', 'red', 'key'], display: 'mountain red key' }
    ];

    var currentSet = null;
    var attempts = 0;
    var maxAttempts = 5;
    var replayCount = 0;
    var startTime = 0;
    var audioContext = null;
    var isPlaying = false;

    var btnPlay = document.getElementById('btnPlay');
    var audioInput = document.getElementById('audioInput');
    var audioVisualizer = document.getElementById('audioVisualizer');
    var audioStatusText = document.getElementById('audioStatusText');
    var captchaStatus = document.getElementById('captchaStatus');
    var statusIcon = document.getElementById('statusIcon');
    var statusText = document.getElementById('statusText');
    var hintText = document.getElementById('hintText');
    var attemptsText = document.getElementById('attemptsText');
    var btnVerify = document.getElementById('btnVerifyAudio');

    init();

    audioInput.addEventListener('input', function() {
        btnVerify.disabled = audioInput.value.trim().length === 0;
    });

    function init() {
        currentSet = WORD_SETS[Math.floor(Math.random() * WORD_SETS.length)];
        audioInput.value = '';
        audioInput.disabled = true;
        btnVerify.disabled = true;
        replayCount = 0;
        startTime = Date.now();
        hideCaptchaStatus();
        hintText.textContent = 'Press play to hear the words';
        audioStatusText.textContent = 'Click play to listen';
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
        btnPlay.classList.remove('playing');
        audioVisualizer.classList.remove('active');
    }

    window.playAudioChallenge = function() {
        if (isPlaying) return;
        isPlaying = true;
        replayCount++;
        btnPlay.classList.add('playing');
        audioVisualizer.classList.add('active');
        audioStatusText.textContent = 'Playing...';

        try {
            audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
            var duration = 3;
            var sampleRate = audioContext.sampleRate;
            var buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
            var data = buffer.getChannelData(0);
            for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.08;
            var noiseSource = audioContext.createBufferSource();
            noiseSource.buffer = buffer;
            var gainNode = audioContext.createGain();
            gainNode.gain.value = 0.15;
            noiseSource.connect(gainNode);
            gainNode.connect(audioContext.destination);
            noiseSource.start();
            setTimeout(function() { noiseSource.stop(); }, duration * 1000);
        } catch(e) { console.log('Web Audio noise not supported:', e); }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            var fullText = currentSet.words.join(' ... ');
            var utterance = new SpeechSynthesisUtterance(fullText);
            utterance.rate = 0.75;
            utterance.pitch = 0.8 + Math.random() * 0.4;
            utterance.volume = 0.85;
            var voices = window.speechSynthesis.getVoices();
            if (voices.length > 1) utterance.voice = voices[Math.floor(Math.random() * voices.length)];
            utterance.onend = function() {
                isPlaying = false; btnPlay.classList.remove('playing');
                audioVisualizer.classList.remove('active');
                audioStatusText.textContent = 'Type what you heard';
                audioInput.disabled = false; audioInput.focus();
            };
            utterance.onerror = function() {
                isPlaying = false; btnPlay.classList.remove('playing');
                audioVisualizer.classList.remove('active');
                audioStatusText.textContent = 'Error — try again';
                audioInput.disabled = false;
            };
            setTimeout(function() { window.speechSynthesis.speak(utterance); }, 300);
        } else {
            setTimeout(function() {
                isPlaying = false; btnPlay.classList.remove('playing');
                audioVisualizer.classList.remove('active');
                audioStatusText.textContent = 'Speech not supported — type: ' + currentSet.words[0] + '...';
                audioInput.disabled = false; audioInput.focus();
            }, 2000);
        }
    };

    window.verifyAudio = function() {
        var userInput = audioInput.value.trim().toLowerCase();
        if (!userInput) return;
        attempts++;
        var solveTime = Date.now() - startTime;
        var userWords = userInput.split(/\s+/);
        var correctWords = currentSet.words;
        var matchCount = 0;
        for (var i = 0; i < correctWords.length; i++) {
            for (var j = 0; j < userWords.length; j++) {
                if (userWords[j] === correctWords[i] || levenshtein(userWords[j], correctWords[i]) <= 1) { matchCount++; break; }
            }
        }
        var accuracy = Math.round((matchCount / correctWords.length) * 100);
        var passed = matchCount === correctWords.length;

        if (passed) {
            showCaptchaStatus('pass', '✅', 'Correct! All words recognized.');
            hintText.textContent = 'Verification successful';
            audioInput.disabled = true; btnVerify.disabled = true;
            logToSheet({
                captchaType: 'audio', attemptNumber: attempts, result: 'pass', accuracy: accuracy,
                matchedWords: matchCount, totalWords: correctWords.length, replayCount: replayCount,
                solveTime: solveTime, userInput: userInput, expectedWords: correctWords.join(' '), totalAttempts: attempts
            });
            setTimeout(function() {
                showCompleteBox('audio', 'Audio CAPTCHA');
            }, 1200);
        } else {
            showCaptchaStatus('fail', '❌', 'Incorrect — matched ' + matchCount + '/' + correctWords.length + ' words.');
            hintText.textContent = 'Listen again and retry';
            logToSheet({
                captchaType: 'audio', attemptNumber: attempts, result: 'fail', accuracy: accuracy,
                matchedWords: matchCount, totalWords: correctWords.length, replayCount: replayCount,
                solveTime: solveTime, userInput: userInput, expectedWords: correctWords.join(' '), totalAttempts: attempts
            });
            if (attempts >= maxAttempts) {
                showCaptchaStatus('fail', '🚫', 'Max attempts. The words were: "' + currentSet.display + '"');
                audioInput.disabled = true; btnVerify.disabled = true;
            } else { audioInput.value = ''; audioInput.focus(); startTime = Date.now(); }
        }
        attemptsText.textContent = 'Attempt ' + attempts + ' / ' + maxAttempts;
    };

    window.newAudioChallenge = function() { attempts = 0; init(); };

    function levenshtein(a, b) {
        var matrix = [];
        for (var i = 0; i <= b.length; i++) matrix[i] = [i];
        for (var j = 0; j <= a.length; j++) matrix[0][j] = j;
        for (var i = 1; i <= b.length; i++) {
            for (var j = 1; j <= a.length; j++) {
                if (b.charAt(i-1) === a.charAt(j-1)) matrix[i][j] = matrix[i-1][j-1];
                else matrix[i][j] = Math.min(matrix[i-1][j-1]+1, matrix[i][j-1]+1, matrix[i-1][j]+1);
            }
        }
        return matrix[b.length][a.length];
    }

    function showCaptchaStatus(type, icon, text) { captchaStatus.className = 'captcha-status ' + type; statusIcon.textContent = icon; statusText.textContent = text; }
    function hideCaptchaStatus() { captchaStatus.className = 'captcha-status hidden'; }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = function() { window.speechSynthesis.getVoices(); };
    }

})();