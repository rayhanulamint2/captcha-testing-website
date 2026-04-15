// ===================================================
// BROWSER & OS DETECTION
// Used by logger.js → logToSheet()
// ===================================================

function getBrowser() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Edg') > -1)        return 'Edge';
    if (ua.indexOf('OPR') > -1 || ua.indexOf('Opera') > -1) return 'Opera';
    if (ua.indexOf('Chrome') > -1)      return 'Chrome';
    if (ua.indexOf('Safari') > -1)      return 'Safari';
    if (ua.indexOf('Firefox') > -1)     return 'Firefox';
    if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident') > -1) return 'IE';
    return 'Unknown';
}

function getOS() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Windows') > -1)     return 'Windows';
    if (ua.indexOf('Mac OS') > -1)      return 'macOS';
    if (ua.indexOf('Android') > -1)     return 'Android';
    if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';
    if (ua.indexOf('Linux') > -1)       return 'Linux';
    if (ua.indexOf('CrOS') > -1)        return 'ChromeOS';
    return 'Unknown';
}
