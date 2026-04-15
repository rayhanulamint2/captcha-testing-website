/**
 * Path: Crown
 * Shape: Crown with 3 pointed peaks and a flat base
 * Difficulty: hard
 *
 * Flat base at the bottom, with three sharp peaks
 * rising upward. The peaks alternate with valleys.
 * Sharp directional changes make this challenging.
 */
CAPTCHA_PATHS.push({
  name: 'Crown',
  difficulty: 'hard',
  waypoints: [
    { x: 25,  y: 140 },   // base left — START
    { x: 30,  y: 115 },   // left wall up
    { x: 40,  y: 80  },   // left wall continued
    { x: 55,  y: 20  },   // peak 1 (left prong)
    { x: 75,  y: 70  },   // valley between peak 1 & 2
    { x: 100, y: 100 },   // valley floor 1
    { x: 125, y: 55  },   // rising to peak 2
    { x: 160, y: 12  },   // peak 2 (center prong — tallest)
    { x: 195, y: 55  },   // descending from peak 2
    { x: 220, y: 100 },   // valley floor 2
    { x: 245, y: 70  },   // rising to peak 3
    { x: 265, y: 20  },   // peak 3 (right prong)
    { x: 280, y: 80  },   // right wall down
    { x: 290, y: 115 },   // right wall continued
    { x: 295, y: 140 },   // base right — END
  ]
});