/**
 * Path: Slingshot
 * Physics: Gravitational Assist (Slingshot Maneuver)
 * Law: Conservation of Energy + Momentum Transfer
 *      v_out = v_in + 2·V_planet (in planet's rest frame)
 *
 * A spacecraft approaching a planet is deflected by gravity,
 * gaining speed by "stealing" orbital momentum from the planet.
 *
 * The path shows:
 *   1. Slow approach from the left (low kinetic energy)
 *   2. Gravitational capture: curving sharply around the planet
 *   3. Periapsis: closest approach — maximum speed (conservation of energy)
 *   4. Fast departure: flung outward with MORE speed than it arrived
 *
 * The exit velocity exceeds the entry velocity — this is how
 * Voyager 1 & 2 reached escape velocity from the solar system
 * using Jupiter and Saturn gravity assists.
 *
 * The planet (gravity source) sits at approximately (180, 95).
 * Waypoints are tighter near the planet (moving fast) and
 * wider far away on approach (moving slow).
 *
 * Difficulty: hard (sharp hyperbolic turn, speed asymmetry)
 */
CAPTCHA_PATHS.push({
  name: 'Slingshot',
  difficulty: 'hard',
  physics: 'Gravitational assist — momentum transfer from planet',
  law: 'v_out = v_in + 2·V_planet',
  waypoints: [
    // ── Slow approach (far from planet, low gravity influence) ──
    // Waypoints spaced FAR apart = slow speed
    { x: 12,  y: 22  },   // deep space approach — START
    { x: 48,  y: 26  },   // drifting in slowly
    { x: 82,  y: 32  },   // gravity starting to pull
    { x: 112, y: 42  },   // curving toward planet

    // ── Gravitational capture zone (strong acceleration) ──
    // Waypoints BUNCH together = high speed near periapsis
    { x: 138, y: 58  },   // feeling strong pull
    { x: 158, y: 75  },   // diving in fast
    { x: 172, y: 95  },   // periapsis approach
    { x: 178, y: 118 },   // periapsis — CLOSEST POINT — max speed!
    { x: 175, y: 132 },   // whipping around

    // ── Fast departure (slingshot boost) ──
    // Waypoints spaced WIDE = object is now moving very fast
    // Exits at a steep angle with boosted velocity
    { x: 165, y: 142 },   // sharp turn complete
    { x: 195, y: 148 },   // departing fast
    { x: 238, y: 142 },   // zooming away
    { x: 275, y: 128 },   // faster than arrival speed!
    { x: 310, y: 108 },   // escaping to deep space — END
  ]
});