// ===================================================
// GOOGLE SHEET LOGGING
// ===================================================
var GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxtx3KAy00XI1wYFZ4_DbTv1qcMpSFAssIH16HQjxR1iMw2KYCBYw0E0eZsAQxR6GGC5g/exec';

function logToSheet(data) {
    var logIndicator = document.getElementById('logIndicator');

    data.userId = PARTICIPANT_ID || getParticipantId();
    data.sessionId = SESSION_ID;
    data.participantId = PARTICIPANT_ID || getParticipantId();
    data.userAgent = navigator.userAgent;
    data.screenWidth = screen.width;
    data.screenHeight = screen.height;
    data.browser = getBrowser();
    data.os = getOS();
    data.timestamp = new Date().toISOString();

    if (logIndicator) {
        logIndicator.textContent = '📡 Logging data...';
        logIndicator.className = 'log-indicator sending';
    }

    // Use GET with URL params — avoids the 302 redirect body-loss issue with Google Apps Script
    var url = GOOGLE_SCRIPT_URL + '?data=' + encodeURIComponent(JSON.stringify(data));

    fetch(url, {
        method: 'GET',
        mode: 'no-cors'
    }).then(function () {
        if (logIndicator) {
            logIndicator.textContent = '✅ Data logged';
            logIndicator.className = 'log-indicator sent';
            setTimeout(function () {
                logIndicator.textContent = '';
                logIndicator.className = 'log-indicator';
            }, 3000);
        }
    }).catch(function (err) {
        if (logIndicator) {
            logIndicator.textContent = '❌ Log failed';
            logIndicator.className = 'log-indicator failed';
        }
        console.error('Sheet log error:', err);
    });
}