/**
 * Path: Spring
 * Physics: Hooke's Law + Viscous Damping
 * Law: F = −kx − bv  →  x(t) = A·e^(−bt/2m)·cos(ωt + φ)
 *
 * A mass on a spring is pulled to the right and released.
 * The spring pulls it back (F = −kx, Hooke's Law).
 * Friction/damping (F = −bv) causes oscillation amplitude
 * to decay over time.
 *
 * Unlike the pendulum (vertical oscillation), this path shows
 * HORIZONTAL oscillation (left-right) while time moves downward.
 * The y-axis = time, x-axis = displacement from equilibrium (x=160).
 *
 * The decreasing horizontal amplitude is the visual fingerprint
 * of energy being converted to heat by damping.
 *
 * Spring constant k: stiff (high frequency)
 * Damping ratio ζ ≈ 0.12 (underdamped — many oscillations)
 *
 * Difficulty: hard (must track sideways oscillations going down)
 */
CAPTCHA_PATHS.push({
  name: 'Spring',
  difficulty: 'hard',
  physics: 'Hooke\'s Law with viscous damping — F = −kx − bv',
  law: 'x(t) = A·e^(−γt)·cos(ωt)',
  waypoints: [
    // Equilibrium is x = 160 (center of canvas)
    // Amplitude decays: 120 → 90 → 65 → 45 → 28 → 15 → 5
    { x: 280, y: 10  },   // max displacement RIGHT (+120) — START
    { x: 160, y: 22  },   // crosses equilibrium (moving left fast)
    { x: 70,  y: 35  },   // max displacement LEFT (−90)
    { x: 160, y: 48  },   // crosses equilibrium (moving right)
    { x: 225, y: 60  },   // max RIGHT (+65)
    { x: 160, y: 72  },   // crosses equilibrium
    { x: 115, y: 84  },   // max LEFT (−45)
    { x: 160, y: 95  },   // crosses equilibrium
    { x: 188, y: 106 },   // max RIGHT (+28)
    { x: 160, y: 116 },   // crosses equilibrium
    { x: 145, y: 126 },   // max LEFT (−15)
    { x: 160, y: 136 },   // crosses equilibrium
    { x: 165, y: 145 },   // barely moving (+5) — at rest — END
  ]
});