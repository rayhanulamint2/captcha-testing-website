/**
 * Path: Projectile
 * Physics: Newton's Gravity — Projectile Motion
 * Law: y = v₀y·t − ½·g·t²
 *
 * A ball launched at ~65° follows a symmetric parabolic arc.
 * Horizontal velocity is constant (no air resistance).
 * Vertical motion decelerates going up, accelerates coming down.
 *
 * The parabola is the signature shape of uniform gravitational
 * acceleration acting perpendicular to initial horizontal velocity.
 *
 * Difficulty: easy (smooth symmetric curve)
 */
CAPTCHA_PATHS.push({
  name: 'Projectile',
  difficulty: 'easy',
  physics: 'Gravity — Parabolic trajectory under uniform g',
  law: 'y = v₀y·t − ½gt²',
  waypoints: [
    { x: 20,  y: 145 },   // launch point (ground level)
    { x: 55,  y: 100 },   // rising — decelerating vertically
    { x: 90,  y: 62  },   // still rising
    { x: 125, y: 32  },   // approaching apex
    { x: 160, y: 18  },   // apex — zero vertical velocity
    { x: 195, y: 32  },   // falling — accelerating vertically
    { x: 230, y: 62  },   // mirror of ascent
    { x: 265, y: 100 },   // approaching ground
    { x: 300, y: 145 },   // landing point (same height = symmetric)
  ]
});