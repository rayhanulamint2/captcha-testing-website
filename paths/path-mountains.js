/**
 * Path: Mountains
 * Shape: Series of 4 peaks with increasing then decreasing height
 * Difficulty: medium
 *
 * Simulates a mountain range skyline.
 * Peaks get taller toward the center (tallest = peak 3).
 */
CAPTCHA_PATHS.push({
  name: 'Mountains',
  difficulty: 'medium',
  waypoints: [
    { x: 10,  y: 145 },   // ground level left — START
    { x: 35,  y: 100 },   // peak 1 ascent
    { x: 52,  y: 65  },   // peak 1 summit (small)
    { x: 68,  y: 105 },   // peak 1 descent
    { x: 90,  y: 125 },   // valley 1
    { x: 110, y: 75  },   // peak 2 ascent
    { x: 128, y: 40  },   // peak 2 summit (medium)
    { x: 145, y: 80  },   // peak 2 descent
    { x: 162, y: 110 },   // valley 2
    { x: 185, y: 55  },   // peak 3 ascent
    { x: 200, y: 15  },   // peak 3 summit (tallest!)
    { x: 218, y: 60  },   // peak 3 descent
    { x: 238, y: 115 },   // valley 3
    { x: 258, y: 75  },   // peak 4 ascent
    { x: 272, y: 50  },   // peak 4 summit (medium-small)
    { x: 288, y: 85  },   // peak 4 descent
    { x: 310, y: 145 },   // ground level right — END
  ]
});