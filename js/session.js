// ===================================================
// SESSION & PARTICIPANT ID MANAGEMENT
// ===================================================
var SESSION_ID = sessionStorage.getItem('captcha_session_id');
if (!SESSION_ID) {
    SESSION_ID = 'SES-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4);
    sessionStorage.setItem('captcha_session_id', SESSION_ID);
}

var PARTICIPANT_ID = sessionStorage.getItem('captcha_participant_id') || '';

function getParticipantId() {
    return sessionStorage.getItem('captcha_participant_id') || '';
}

function setParticipantId(id) {
    PARTICIPANT_ID = id;
    sessionStorage.setItem('captcha_participant_id', id);
}

function markCaptchaComplete(type) {
    var completed = JSON.parse(sessionStorage.getItem('captcha_completed') || '{}');
    completed[type] = true;
    sessionStorage.setItem('captcha_completed', JSON.stringify(completed));
    console.log('✅ markCaptchaComplete("' + type + '") — stored:', JSON.stringify(completed));
}

function isCaptchaComplete(type) {
    var completed = JSON.parse(sessionStorage.getItem('captcha_completed') || '{}');
    var result = completed[type] === true;
    console.log('🔍 isCaptchaComplete("' + type + '"):', result);
    return result;
}

function getCompletedCount() {
    var completed = JSON.parse(sessionStorage.getItem('captcha_completed') || '{}');
    var count = 0;
    for (var key in completed) {
        if (completed[key]) count++;
    }
    return count;
}

// ===================================================
// CAPTCHA LABELS & ICONS
// ===================================================
function getCaptchaLabel(type) {
    var labels = {
        draw:  '✏️ DrawCAPTCHA',
        image: '🖼️ Image CAPTCHA',
        audio: '🔊 Audio CAPTCHA',
        text:  '🔤 Text CAPTCHA',
        game:  '🎮 Game CAPTCHA'
    };
    return labels[type] || type;
}

function getCaptchaIcon(type) {
    var icons = { draw: '✏️', image: '🖼️', audio: '🔊', text: '🔤', game: '🎮' };
    return icons[type] || '🧪';
}

// ===================================================
// NEXT CAPTCHA LOGIC
// ===================================================
function getNextCaptcha(currentType) {
    var types = ['draw', 'image', 'audio', 'text', 'game'];
    var currentIndex = types.indexOf(currentType);

    // First try types after current one
    for (var i = currentIndex + 1; i < types.length; i++) {
        if (!isCaptchaComplete(types[i])) return types[i];
    }
    // Then try types before current one
    for (var i = 0; i < currentIndex; i++) {
        if (!isCaptchaComplete(types[i])) return types[i];
    }
    // All complete
    return null;
}

// ===================================================
// SHOW COMPLETE BOX (shared by all CAPTCHAs)
// ===================================================
function showCompleteBox(captchaType, captchaDisplayName) {
    var completeBox = document.getElementById('completeBox');
    var captchaBox = document.getElementById('captchaBox');

    // Mark as complete
    markCaptchaComplete(captchaType);

    // Hide captcha box
    if (captchaBox) captchaBox.style.display = 'none';
    if (!completeBox) return;

    var completedCount = getCompletedCount();
    var totalCaptchas = 5;
    var next = getNextCaptcha(captchaType);

    var buttonsHtml = '';

    if (next) {
        // There are more CAPTCHAs to do
        buttonsHtml =
            '<a href="' + next + '.html" class="btn btn-primary complete-btn">' +
                getCaptchaIcon(next) + ' Next: ' + getCaptchaLabel(next) + ' →' +
            '</a>' +
            '<a href="../testing.html" class="btn btn-secondary complete-btn">📋 Testing Hub</a>';
    } else {
        // All CAPTCHAs done
        buttonsHtml =
            '<a href="../index.html" class="btn btn-primary complete-btn">🏠 Back to Home</a>' +
            '<a href="../testing.html" class="btn btn-secondary complete-btn">📋 Testing Hub</a>';
    }

    var progressHtml =
        '<div class="complete-progress-bar">' +
            '<div class="complete-progress-fill" style="width:' + Math.round((completedCount / totalCaptchas) * 100) + '%"></div>' +
        '</div>' +
        '<p class="complete-progress-text">' + completedCount + ' / ' + totalCaptchas + ' CAPTCHAs completed</p>';

    var allDoneMsg = '';
    if (completedCount === totalCaptchas) {
        allDoneMsg = '<p class="all-done-msg">🎉 Congratulations! You have completed all CAPTCHAs!</p>';
    }

    completeBox.innerHTML =
        '<h3>✅ ' + captchaDisplayName + ' Verified!</h3>' +
        '<p>Your test data has been recorded successfully.</p>' +
        progressHtml +
        allDoneMsg +
        '<div class="complete-buttons">' + buttonsHtml + '</div>';

    completeBox.style.display = 'block';

    console.log('🎯 showCompleteBox: ' + captchaType + ' done. ' + completedCount + '/' + totalCaptchas + ' total. Next: ' + (next || 'ALL DONE'));
}

// ===================================================
// AUTO-FILL PARTICIPANT DISPLAY ON TEST PAGES
// ===================================================
(function() {
    var display = document.getElementById('participantDisplay');
    var pid = getParticipantId();
    if (display) {
        display.textContent = pid || 'Not set — go to Testing Hub';
    }
    if (!pid) {
        var banner = document.getElementById('participantBanner');
        if (banner) {
            banner.style.background = 'rgba(255,0,0,0.2)';
        }
    }
    console.log('✅ session.js loaded. PID: ' + (pid || '(none)') + ', Session: ' + SESSION_ID);
})();