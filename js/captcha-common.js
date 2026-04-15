// ===================================================
// CAPTCHA COMMON — Shared utilities
// (Currently most shared logic is in session.js and logger.js)
// This file is reserved for any future shared CAPTCHA logic
// ===================================================

// Redirect to testing hub if no participant ID is set (on test pages)
(function() {
    if (window.location.pathname.indexOf('/test/') !== -1) {
        var pid = getParticipantId();
        if (!pid) {
            // Show warning but don't redirect — allow testing
            console.warn('No participant ID set. Data will be logged without ID.');
        }
    }
})();