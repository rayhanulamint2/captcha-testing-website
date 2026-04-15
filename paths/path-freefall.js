/**
 * Path: Free Fall
 * Physics: Newton's Second Law — Uniform Gravitational Field
 * Law: s = ½·g·t²  (distance proportional to time squared)
 *
 * An object released from rest falls under gravity.
 * Equal TIME intervals produce INCREASING distance intervals:
 *
 *   t=0→1: falls 1 unit    (slow at first)
 *   t=1→2: falls 3 units
 *   t=2→3: falls 5 units
 *   t=3→4: falls 7 units   (fast near bottom)
 *
 * Horizontal drift from a light crosswind (constant horizontal v).
 * The curve gets steeper as the object accelerates — this is the
 * key visual signature of ½gt².
 *
 * Difficulty: medium (smooth curve, but non-uniform curvature)
 */
CAPTCHA_PATHS.push({
  name: 'Free Fall',
  difficulty: 'medium',
  physics: 'Gravitational acceleration — distance ∝ t²',
  law: 's = ½gt²',
  waypoints: [
    { x: 40,  y: 15  },   // release from rest (t=0)
    { x: 58,  y: 17  },   // barely falling — nearly horizontal
    { x: 78,  y: 22  },   // very slow vertical movement
    { x: 100, y: 33  },   // starting to curve downward
    { x: 125, y: 50  },   // curvature increasing
    { x: 152, y: 72  },   // noticeable acceleration
    { x: 182, y: 98  },   // picking up speed
    { x: 218, y: 122 },   // falling fast now
    { x: 260, y: 142 },   // almost vertical
    { x: 285, y: 148 },   // ★ approaching terminal impact
  ]
});