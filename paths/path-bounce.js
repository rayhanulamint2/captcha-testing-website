/**
 * Path: Bounce
 * Physics: Inelastic Collision — Coefficient of Restitution
 * Law: h_n+1 = e² · h_n  (where e ≈ 0.7)
 *
 * A ball dropped from height h₀ hits the ground and bounces.
 * Each bounce loses ~50% of kinetic energy (e ≈ 0.7).
 * Between bounces, the ball follows parabolic arcs (gravity).
 *
 * Peak heights decrease geometrically:
 *   Bounce 1: 100% → Bounce 2: 49% → Bounce 3: 24% → ...
 *
 * The horizontal spacing also decreases because the ball
 * spends less time in the air with each bounce.
 *
 * Difficulty: hard (many direction changes, shrinking arcs)
 */
CAPTCHA_PATHS.push({
  name: 'Bounce',
  difficulty: 'hard',
  physics: 'Inelastic collision — energy lost each bounce (e ≈ 0.7)',
  law: 'h(n+1) = e² · h(n)',
  waypoints: [
    { x: 20,  y: 15  },   // drop point (max height h₀)
    { x: 35,  y: 55  },   // free-fall accelerating
    { x: 50,  y: 105 },   // accelerating faster
    { x: 68,  y: 145 },   // ★ IMPACT 1 — ground
    { x: 88,  y: 80  },   // bounce 1 peak (h ≈ 0.49·h₀)
    { x: 110, y: 145 },   // ★ IMPACT 2
    { x: 125, y: 102 },   // bounce 2 peak (h ≈ 0.24·h₀)
    { x: 142, y: 145 },   // ★ IMPACT 3
    { x: 155, y: 118 },   // bounce 3 peak (h ≈ 0.12·h₀)
    { x: 168, y: 145 },   // ★ IMPACT 4
    { x: 178, y: 130 },   // bounce 4 peak (h ≈ 0.06·h₀)
    { x: 188, y: 145 },   // ★ IMPACT 5
    { x: 196, y: 138 },   // bounce 5 peak (tiny)
    { x: 204, y: 145 },   // ★ IMPACT 6
    { x: 300, y: 145 },   // rolls to rest (friction)
  ]
});