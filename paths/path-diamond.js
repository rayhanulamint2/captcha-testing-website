/**
 * Path: Diamond
 * Shape: Rotated square (rhombus) with reinforced straight edges
 * Difficulty: medium
 *
 * Midpoints on each side prevent Catmull-Rom from
 * over-rounding the corners, preserving the diamond shape.
 */
CAPTCHA_PATHS.push({
  name: 'Diamond',
  difficulty: 'medium',
  waypoints: [
    { x: 160, y: 10  },   // top vertex — START
    { x: 195, y: 28  },   // upper-right edge
    { x: 230, y: 45  },   // right approach
    { x: 265, y: 63  },   // right approach continued
    { x: 295, y: 80  },   // right vertex
    { x: 265, y: 97  },   // lower-right edge
    { x: 230, y: 115 },   // bottom approach
    { x: 195, y: 132 },   // bottom approach continued
    { x: 160, y: 150 },   // bottom vertex
    { x: 125, y: 132 },   // lower-left edge
    { x: 90,  y: 115 },   // left approach
    { x: 55,  y: 97  },   // left approach continued
    { x: 25,  y: 80  },   // left vertex
    { x: 55,  y: 63  },   // upper-left edge
    { x: 90,  y: 45  },   // top approach
    { x: 125, y: 28  },   // top approach continued
    { x: 157, y: 12  },   // back to top — END
  ]
});