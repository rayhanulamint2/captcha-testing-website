/**
 * Path: Infinity
 * Shape: Figure-eight / ∞ symbol
 * Difficulty: hard
 *
 * Two connected loops crossing at the center.
 * Traces left loop counterclockwise, then right loop clockwise.
 * One of the hardest paths — requires crossing back
 * through the center accurately.
 */
CAPTCHA_PATHS.push({
  name: 'Infinity',
  difficulty: 'hard',
  waypoints: [
    { x: 160, y: 80  },   // center crossing — START
    { x: 125, y: 45  },   // upper-left diagonal
    { x: 75,  y: 30  },   // top of left loop
    { x: 35,  y: 55  },   // far left upper
    { x: 30,  y: 90  },   // far left lower
    { x: 55,  y: 120 },   // bottom of left loop
    { x: 110, y: 125 },   // lower-left return
    { x: 160, y: 80  },   // center crossing (again)
    { x: 210, y: 35  },   // upper-right diagonal
    { x: 260, y: 30  },   // top of right loop
    { x: 290, y: 55  },   // far right upper
    { x: 290, y: 95  },   // far right lower
    { x: 260, y: 125 },   // bottom of right loop
    { x: 205, y: 118 },   // lower-right return
    { x: 163, y: 82  },   // back to center — END
  ]
});