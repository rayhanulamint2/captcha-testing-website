/**
 * Path: Spiral
 * Shape: Clockwise spiral from outside edge toward center
 * Difficulty: hard
 *
 * ~1.5 full rotations spiraling inward.
 * Requires steady hand and spatial awareness.
 */
CAPTCHA_PATHS.push({
  name: 'Spiral',
  difficulty: 'hard',
  waypoints: [
    { x: 25,  y: 80  },   // far left edge — START
    { x: 70,  y: 15  },   // swing up-left
    { x: 160, y: 10  },   // top center
    { x: 250, y: 15  },   // swing up-right
    { x: 290, y: 70  },   // far right
    { x: 255, y: 135 },   // swing down-right
    { x: 160, y: 140 },   // bottom center
    { x: 100, y: 115 },   // swing up-left (inner ring)
    { x: 105, y: 60  },   // left side (inner)
    { x: 155, y: 40  },   // top (inner)
    { x: 210, y: 55  },   // right approach (inner)
    { x: 215, y: 95  },   // right side (inner)
    { x: 185, y: 115 },   // bottom approach (inner)
    { x: 155, y: 95  },   // near center — END
  ]
});