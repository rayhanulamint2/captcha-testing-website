/**
 * Path: Loop-de-Loop
 * Shape: Horizontal path with a circular loop in the middle
 * Difficulty: hard
 *
 * Goes right, loops upward and around (like a
 * roller coaster loop), then continues right.
 * The loop crossing makes this especially tricky.
 */
CAPTCHA_PATHS.push({
  name: 'Loop-de-Loop',
  difficulty: 'hard',
  waypoints: [
    { x: 15,  y: 110 },   // left ground — START
    { x: 55,  y: 108 },   // cruising right
    { x: 90,  y: 105 },   // approach the loop
    { x: 115, y: 80  },   // loop entry: curving up
    { x: 125, y: 45  },   // left side of loop (going up)
    { x: 155, y: 18  },   // top of the loop
    { x: 190, y: 30  },   // right side of loop (coming down)
    { x: 205, y: 60  },   // loop bottom-right
    { x: 195, y: 90  },   // crossing back under
    { x: 165, y: 108 },   // loop exit (crossing the entry line)
    { x: 140, y: 112 },   // reconnect to ground level
    { x: 200, y: 110 },   // cruising right again
    { x: 255, y: 105 },   // continuing
    { x: 305, y: 100 },   // right ground — END
  ]
});