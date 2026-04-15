/**
 * Path: Heart
 * Shape: Classic heart outline drawn clockwise
 * Difficulty: hard
 *
 * Starts at the top-center dip, traces the left hump,
 * down to the bottom point, up around the right hump,
 * and back to the start.
 */
CAPTCHA_PATHS.push({
  name: 'Heart',
  difficulty: 'hard',
  waypoints: [
    { x: 160, y: 52  },   // top center dip — START
    { x: 125, y: 28  },   // left hump rise
    { x: 85,  y: 22  },   // left hump peak
    { x: 50,  y: 40  },   // left shoulder
    { x: 38,  y: 72  },   // left side
    { x: 55,  y: 105 },   // lower-left curve
    { x: 100, y: 128 },   // approaching bottom
    { x: 160, y: 148 },   // bottom point (sharp)
    { x: 220, y: 128 },   // right of bottom
    { x: 265, y: 105 },   // lower-right curve
    { x: 282, y: 72  },   // right side
    { x: 270, y: 40  },   // right shoulder
    { x: 235, y: 22  },   // right hump peak
    { x: 195, y: 28  },   // right hump descent
    { x: 163, y: 52  },   // back to dip — END
  ]
});