/**
 * Path: Lightning
 * Shape: Jagged lightning bolt from top-left to bottom-right
 * Difficulty: medium
 *
 * Sharp directional changes simulate a lightning strike.
 * Not as hard as curved paths but requires quick
 * direction reversals.
 */
CAPTCHA_PATHS.push({
  name: 'Lightning',
  difficulty: 'medium',
  waypoints: [
    { x: 30,  y: 12  },   // top-left origin — START
    { x: 110, y: 15  },   // across the top
    { x: 65,  y: 62  },   // jag back left-down
    { x: 155, y: 58  },   // jag right
    { x: 95,  y: 108 },   // jag back left-down
    { x: 195, y: 95  },   // jag right
    { x: 145, y: 140 },   // jag back left-down
    { x: 300, y: 145 },   // bolt tail — END
  ]
});