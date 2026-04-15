/**
 * Path: Pendulum
 * Physics: Damped Simple Harmonic Motion
 * Law: x(t) = A · e^(−γt) · cos(ωt)
 *
 * A pendulum released from rest oscillates with decreasing
 * amplitude due to air resistance / friction (damping factor γ).
 *
 * The x-axis represents time, y-axis represents angular displacement.
 * Center line (y=80) is the equilibrium (hanging straight down).
 *
 * Amplitude envelope: A·e^(−γt) decays exponentially.
 * The oscillation frequency ω remains roughly constant
 * (underdamped regime: γ < ω₀).
 *
 * Difficulty: medium (smooth oscillation, just shrinking)
 */
CAPTCHA_PATHS.push({
  name: 'Pendulum',
  difficulty: 'medium',
  physics: 'Damped SHM — amplitude decays exponentially',
  law: 'x(t) = A·e^(−γt)·cos(ωt)',
  waypoints: [
    { x: 20,  y: 80  },   // equilibrium — released from here
    { x: 42,  y: 20  },   // peak +60  (amplitude A₀ = 60)
    { x: 68,  y: 80  },   // crossing center
    { x: 92,  y: 132 },   // peak −52  (A₁ ≈ 0.87·A₀)
    { x: 118, y: 80  },   // crossing center
    { x: 142, y: 38  },   // peak +42  (A₂ ≈ 0.75·A₀)
    { x: 168, y: 80  },   // crossing center
    { x: 190, y: 112 },   // peak −32  (A₃ ≈ 0.53·A₀)
    { x: 215, y: 80  },   // crossing center
    { x: 235, y: 58  },   // peak +22  (A₄ ≈ 0.37·A₀)
    { x: 258, y: 80  },   // crossing center
    { x: 275, y: 92  },   // peak −12  (A₅ ≈ 0.20·A₀)
    { x: 300, y: 80  },   // settled at equilibrium
  ]
});