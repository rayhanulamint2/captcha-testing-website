/**
 * Path: Orbit
 * Physics: Kepler's First Law — Planets orbit in ellipses
 * Law: r = a(1−e²) / (1 + e·cosθ)
 *
 * An elliptical orbit with the central body at one focus.
 * The orbit is NOT a circle — it has:
 *   • Periapsis (closest approach) on the right
 *   • Apoapsis (farthest point) on the left
 *
 * Kepler's Second Law (equal areas in equal times) means the
 * object moves FASTER near periapsis and SLOWER near apoapsis.
 * Waypoint spacing reflects this: closer together on the left
 * (slow), wider apart on the right (fast).
 *
 * Semi-major axis a ≈ 130, eccentricity e ≈ 0.45
 * Focus (sun position) is offset to the right of center.
 *
 * Difficulty: hard (asymmetric ellipse, speed varies)
 */
CAPTCHA_PATHS.push({
  name: 'Orbit',
  difficulty: 'hard',
  physics: 'Kepler elliptical orbit — speed varies with distance',
  law: 'r = a(1−e²)/(1+e·cosθ)',
  waypoints: [
    // Periapsis (closest to focus/sun) — moving FAST
    // Waypoints spread wider apart here
    { x: 290, y: 80  },   // periapsis (rightmost) — START
    { x: 275, y: 40  },   // fast sweep upward
    { x: 240, y: 18  },   // top-right quadrant

    // Apoapsis region (farthest from sun) — moving SLOW
    // Waypoints bunched closer together
    { x: 190, y: 10  },   // approaching top
    { x: 140, y: 14  },   // top of ellipse
    { x: 95,  y: 25  },   // slow crawl at apoapsis approach
    { x: 55,  y: 48  },   // near apoapsis
    { x: 35,  y: 78  },   // apoapsis (leftmost — farthest from sun)
    { x: 48,  y: 108 },   // slow departure
    { x: 80,  y: 130 },   // still slow

    // Returning toward periapsis — speeding up again
    { x: 125, y: 145 },   // bottom-left
    { x: 175, y: 148 },   // bottom center
    { x: 230, y: 138 },   // accelerating
    { x: 270, y: 115 },   // fast approach
    { x: 288, y: 83  },   // back near periapsis — END
  ]
});