/**
 * Path: Checkmark
 * Shape: Classic ✓ tick mark
 * Difficulty: easy
 *
 * Short descent to the left, then a long upward
 * stroke to the right. Simple but satisfying.
 */
CAPTCHA_PATHS.push({
  name: 'Checkmark',
  difficulty: 'easy',
  waypoints: [
    { x: 20,  y: 60  },   // top-left — START
    { x: 40,  y: 72  },   // slight descent
    { x: 65,  y: 88  },   // steeper descent
    { x: 95,  y: 110 },   // approaching bottom of check
    { x: 115, y: 135 },   // bottom vertex of checkmark
    { x: 145, y: 105 },   // strong upstroke begins
    { x: 175, y: 75  },   // mid upstroke
    { x: 210, y: 48  },   // continuing up
    { x: 250, y: 28  },   // near the top
    { x: 300, y: 12  },   // top-right — END
  ]
});