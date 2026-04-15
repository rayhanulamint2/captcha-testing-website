// ===================================================
// NAVBAR TOGGLE
// ===================================================
(function() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close menu when a link is clicked (mobile)
        var links = menu.querySelectorAll('.nav-link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function() {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            });
        }

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
})();