/**
 * Path: Circle
 * Shape: Complete clockwise circle loop
 * Difficulty: hard
 *
 * Center ~(160, 80), radius ~60
 * User must draw a full circle returning to the start.
 * The start and end points are intentionally close together
 * to force precision.
 */
CAPTCHA_PATHS.push({
  name: 'Circle',
  difficulty: 'hard',
  waypoints: [
    { x: 160, y: 20  },   // 12 o'clock (top center) — START
    { x: 202, y: 30  },   // ~1:30
    { x: 225, y: 60  },   // ~3 o'clock approach
    { x: 225, y: 100 },   // ~4:30
    { x: 200, y: 125 },   // ~6 o'clock approach
    { x: 160, y: 140 },   // 6 o'clock (bottom center)
    { x: 120, y: 125 },   // ~7:30
    { x: 95,  y: 100 },   // ~9 o'clock approach
    { x: 95,  y: 60  },   // ~10:30
    { x: 118, y: 30  },   // ~12 o'clock approach
    { x: 157, y: 20  },   // back to top — END (3px offset from start)
  ]
});