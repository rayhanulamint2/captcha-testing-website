// ===================================================
// TESTING HUB — ID Management & CAPTCHA Selection
// ===================================================
(function() {

    // Safely get DOM elements
    var idInput = document.getElementById('participantIdInput');
    var idSaveBtn = document.getElementById('idSaveBtn');
    var idHint = document.getElementById('idHint');
    var idEntryCard = document.getElementById('idEntryCard');
    var idSavedBanner = document.getElementById('idSavedBanner');
    var savedIdDisplay = document.getElementById('savedIdDisplay');
    var captchaSection = document.getElementById('captchaSelectionSection');
    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
    var allCompleteBox = document.getElementById('allCompleteBox');

    var captchaTypes = ['draw', 'image', 'audio', 'text', 'game', 'gotcha'];

    // ===================================================
    // SAFETY CHECK — make sure session.js loaded
    // ===================================================
    if (typeof getParticipantId !== 'function') {
        console.error('session.js not loaded! Functions missing.');
        // Define fallbacks so page doesn't break
        window.getParticipantId = function() {
            return sessionStorage.getItem('captcha_participant_id') || '';
        };
        window.setParticipantId = function(id) {
            sessionStorage.setItem('captcha_participant_id', id);
        };
        window.isCaptchaComplete = function(type) {
            var completed = JSON.parse(sessionStorage.getItem('captcha_completed') || '{}');
            return completed[type] === true;
        };
        window.markCaptchaComplete = function(type) {
            var completed = JSON.parse(sessionStorage.getItem('captcha_completed') || '{}');
            completed[type] = true;
            sessionStorage.setItem('captcha_completed', JSON.stringify(completed));
        };
    }

    // ===================================================
    // Check if ID already saved
    // ===================================================
    try {
        var existingId = getParticipantId();
        if (existingId && existingId.length >= 3) {
            showSavedState(existingId);
        }
        if (existingId && idInput) {
            idInput.value = existingId;
        }
    } catch(e) {
        console.error('Error checking existing ID:', e);
    }

    // ===================================================
    // SAVE ID — exposed to window AND via addEventListener
    // ===================================================
    function saveId() {
        if (!idInput) {
            console.error('ID input element not found');
            return;
        }

        var val = idInput.value.trim();

        if (val.length < 3) {
            if (idHint) {
                idHint.textContent = '⚠ ID must be at least 3 characters';
                idHint.className = 'id-hint error';
            }
            return;
        }

        try {
            setParticipantId(val);
        } catch(e) {
            // Fallback
            sessionStorage.setItem('captcha_participant_id', val);
            console.warn('setParticipantId failed, used fallback:', e);
        }

        showSavedState(val);
    }

    // Expose to window for onclick attribute
    window.saveParticipantId = saveId;

    // ALSO attach via addEventListener as backup
    if (idSaveBtn) {
        idSaveBtn.addEventListener('click', saveId);
    }

    // ===================================================
    // CHANGE ID
    // ===================================================
    function changeIdFn() {
        if (idEntryCard) idEntryCard.style.display = 'block';
        if (idSavedBanner) idSavedBanner.style.display = 'none';
        if (captchaSection) captchaSection.style.display = 'none';
        if (idInput) {
            idInput.value = getParticipantId();
            idInput.focus();
        }
    }

    window.changeId = changeIdFn;

    // ===================================================
    // GO TO TEST
    // ===================================================
    function goToTestFn(type) {
        var pid = getParticipantId();
        if (!pid || pid.length < 3) {
            alert('Please enter your Participant ID first.');
            return;
        }
        window.location.href = 'test/' + type + '.html';
    }

    window.goToTest = goToTestFn;

    // ===================================================
    // SHOW SAVED STATE
    // ===================================================
    function showSavedState(id) {
        if (idEntryCard) idEntryCard.style.display = 'none';
        if (idSavedBanner) idSavedBanner.style.display = 'flex';
        if (savedIdDisplay) savedIdDisplay.textContent = id;
        if (captchaSection) captchaSection.style.display = 'block';
        updateProgress();
    }

    // ===================================================
    // UPDATE PROGRESS
    // ===================================================
    function updateProgress() {
        var completed = 0;
        for (var i = 0; i < captchaTypes.length; i++) {
            var type = captchaTypes[i];
            var card = document.getElementById('card-' + type);
            var status = document.getElementById('status-' + type);

            try {
                if (isCaptchaComplete(type)) {
                    completed++;
                    if (card) card.classList.add('completed');
                    if (status) status.textContent = '✅ Completed';
                } else {
                    if (card) card.classList.remove('completed');
                    if (status) status.textContent = 'Not Started';
                }
            } catch(e) {
                console.warn('Error checking completion for ' + type, e);
            }
        }

        var pct = Math.round((completed / captchaTypes.length) * 100);
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressText) progressText.textContent = completed + ' / ' + captchaTypes.length + ' Completed';

        if (allCompleteBox) {
            allCompleteBox.style.display = (completed === captchaTypes.length) ? 'block' : 'none';
        }
    }

    // ===================================================
    // INPUT EVENTS
    // ===================================================
    if (idInput) {
        idInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                saveId();
            }
        });

        idInput.addEventListener('input', function() {
            var val = idInput.value.trim();
            if (!idHint) return;

            if (val.length >= 3) {
                idHint.textContent = '✓ Press Save to continue';
                idHint.className = 'id-hint success';
            } else if (val.length > 0) {
                idHint.textContent = 'ID must be at least 3 characters';
                idHint.className = 'id-hint error';
            } else {
                idHint.textContent = 'ID must be at least 3 characters';
                idHint.className = 'id-hint';
            }
        });
    }

    console.log('✅ testing-hub.js loaded successfully');

})();