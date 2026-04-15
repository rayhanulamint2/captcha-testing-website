/**
 * Path: Interference
 * Physics: Principle of Superposition — Wave Interference
 * Law: y_total = A₁·sin(k₁x) + A₂·sin(k₂x)
 *
 * Two waves of slightly different frequencies overlap,
 * producing a BEAT PATTERN (constructive + destructive interference).
 *
 * When crests align:  constructive → large amplitude
 * When crest meets trough: destructive → near-zero amplitude
 *
 * Wave 1: A=40, wavelength ≈ 80px (higher frequency)
 * Wave 2: A=40, wavelength ≈ 100px (lower frequency)
 *
 * The result: amplitude swells and fades periodically.
 * This is how noise-cancelling headphones work (destructive),
 * and how radio signals can be amplified (constructive).
 *
 * Difficulty: hard (complex shape with varying amplitude)
 */
CAPTCHA_PATHS.push({
  name: 'Interference',
  difficulty: 'hard',
  physics: 'Wave superposition — beat frequency pattern',
  law: 'y = A₁·sin(k₁x) + A₂·sin(k₂x)',
  waypoints: [
    // Region 1: Constructive interference (waves in phase)
    // Large amplitude oscillation
    { x: 10,  y: 80  },   // equilibrium — START
    { x: 28,  y: 18  },   // LARGE crest (+62)
    { x: 48,  y: 80  },   // crossing zero
    { x: 68,  y: 140 },   // LARGE trough (−60)
    { x: 88,  y: 80  },   // crossing zero

    // Region 2: Destructive interference (waves out of phase)
    // Amplitude nearly cancels
    { x: 108, y: 68  },   // tiny crest (+12)
    { x: 125, y: 80  },   // crossing zero
    { x: 140, y: 90  },   // tiny trough (−10)
    { x: 155, y: 80  },   // crossing zero — almost flat

    // Region 3: Constructive again (back in phase)
    // Large amplitude returns
    { x: 175, y: 25  },   // LARGE crest (+55)
    { x: 198, y: 80  },   // crossing zero
    { x: 220, y: 138 },   // LARGE trough (−58)
    { x: 242, y: 80  },   // crossing zero

    // Region 4: Destructive again (fading out)
    { x: 262, y: 72  },   // small crest (+8)
    { x: 278, y: 80  },   // crossing zero
    { x: 295, y: 86  },   // tiny trough (−6)
    { x: 310, y: 80  },   // equilibrium — END
  ]
});