/**
 * Path: Cycloid
 * Physics: Kinematics of a point on a rolling wheel
 * Law: x = r(θ − sinθ),  y = r(1 − cosθ)
 *
 * A point on the rim of a wheel traces a cycloid as the
 * wheel rolls along a flat surface without slipping.
 *
 * Key properties:
 *   • Cusps at the bottom: the point touches the ground
 *     momentarily and has ZERO velocity (instantaneous rest)
 *   • Maximum height = 2r (top of the wheel = diameter)
 *   • At the top, the point moves at 2v (twice the wheel center speed)
 *
 * The cycloid is also the solution to the Brachistochrone problem
 * (fastest descent curve under gravity) and the Tautochrone problem
 * (equal time regardless of starting position).
 *
 * r ≈ 32 pixels, 2.5 full rotations shown.
 *
 * Difficulty: hard (cusps are sharp, arches must be round)
 */
CAPTCHA_PATHS.push({
  name: 'Cycloid',
  difficulty: 'hard',
  physics: 'Rolling wheel kinematics — point on the rim',
  law: 'x = r(θ−sinθ), y = r(1−cosθ)',
  waypoints: [
    // Arch 1: first full rotation
    { x: 12,  y: 145 },   // cusp 1 — on the ground — START
    { x: 25,  y: 120 },   // rising along arch
    { x: 42,  y: 88  },   // halfway up
    { x: 60,  y: 72  },   // near top of arch 1 (height = 2r ≈ 64)
    { x: 80,  y: 88  },   // descending
    { x: 100, y: 120 },   // approaching ground
    { x: 112, y: 145 },   // cusp 2 — ground contact

    // Arch 2: second full rotation
    { x: 124, y: 120 },   // rising again
    { x: 142, y: 88  },   // halfway up
    { x: 160, y: 72  },   // top of arch 2
    { x: 180, y: 88  },   // descending
    { x: 200, y: 120 },   // approaching ground
    { x: 212, y: 145 },   // cusp 3 — ground contact

    // Arch 3: half rotation (ending mid-arch)
    { x: 226, y: 118 },   // rising
    { x: 248, y: 86  },   // halfway up
    { x: 270, y: 72  },   // top of arch 3
    { x: 290, y: 88  },   // descending
    { x: 308, y: 120 },   // — END (mid-descent)
  ]
});