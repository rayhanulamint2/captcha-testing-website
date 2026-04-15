/**
 * Path: Catenary
 * Physics: Gravity + Tension Equilibrium on a flexible chain
 * Law: y = a · cosh(x/a)  where cosh = hyperbolic cosine
 *
 * A uniform chain/rope suspended between two fixed points
 * hangs in a catenary curve — NOT a parabola (common myth).
 *
 * The difference from a parabola: a catenary is slightly
 * flatter near the bottom and steeper near the supports.
 *
 * At each point, the tension force along the chain exactly
 * balances the gravitational force on the chain below.
 * The curve minimizes potential energy.
 *
 * This path goes: left anchor → sag down → right anchor,
 * then a SECOND chain hangs lower (heavier / longer chain),
 * showing how chain weight affects sag depth.
 *
 * Parameter a (related to tension/weight): 
 *   Chain 1: a ≈ 80 (tight, shallow sag)
 *   Chain 2: a ≈ 40 (loose, deep sag)
 *
 * Difficulty: medium (two smooth U-shapes at different depths)
 */
CAPTCHA_PATHS.push({
  name: 'Catenary',
  difficulty: 'medium',
  physics: 'Catenary curve — gravity vs tension equilibrium',
  law: 'y = a·cosh(x/a)',
  waypoints: [
    // Chain 1: tight (shallow sag)
    { x: 15,  y: 30  },   // left anchor (high) — START
    { x: 45,  y: 40  },   // steep descent near support
    { x: 80,  y: 52  },   // flattening toward center
    { x: 115, y: 58  },   // near bottom of sag (flat region)
    { x: 150, y: 52  },   // symmetric rise
    { x: 185, y: 40  },   // steepening near support
    { x: 215, y: 30  },   // right anchor of chain 1

    // Transition drop to chain 2
    { x: 220, y: 58  },   // drop down to heavier chain

    // Chain 2: loose (deep sag)
    { x: 225, y: 68  },   // left anchor of chain 2
    { x: 242, y: 95  },   // steep descent
    { x: 258, y: 118 },   // flattening
    { x: 272, y: 130 },   // near bottom of deep sag
    { x: 286, y: 120 },   // symmetric rise
    { x: 298, y: 98  },   // steepening
    { x: 308, y: 68  },   // right anchor of chain 2 — END
  ]
});