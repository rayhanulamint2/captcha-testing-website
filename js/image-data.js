// ===================================================
// IMAGE CAPTCHA — Configuration
// ===================================================
// Edit this file to add/remove categories or change image counts.
//
// HOW IT WORKS:
//   When "bicycles" is selected, the entire 3x3 grid uses ONLY images
//   from the bicycle folder:
//     - 3-4 tiles = real bicycles from  bicycle/       (correct answers)
//     - 5-6 tiles = look-alikes from    bicycle/similar/ (wrong answers)
//
// HOW TO ADD A NEW CATEGORY:
//   1. Create a folder:           images/my_category/
//   2. Add TARGET images:         1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg
//   3. Create subfolder:          images/my_category/similar/
//   4. Add CONFUSING images:      1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg
//      (you need at least 6 similar images to fill the grid)
//   5. Add an entry below.
//
// IMPORTANT:
//   - "count" = how many target images in the main folder
//   - "similarCount" = how many confusing images in /similar/
//   - similarCount should be at least 6 (to fill the remaining grid slots)
// ===================================================

var IMAGE_CAPTCHA_CONFIG = {

    // Base path to the images folder (relative to test/image.html)
    basePath: '../images/',

    // Default file extension (can override per-category with "ext")
    defaultExt: '.jpg',

    // How many target images to show per challenge (randomly 3 or 4)
    minTargets: 3,
    maxTargets: 5,

    // Grid size (3x3 = 9 tiles)
    gridSize: 9,

    // ─── CATEGORIES ───────────────────────────────────────
    categories: [
        {
            name: 'traffic lights',
            folder: 'traffic_light',
            count: 5,            // target images: 1.jpg – 5.jpg
            similarCount: 6      // similar/1.jpg – similar/6.jpg
        },
        {
            name: 'crosswalks',
            folder: 'crosswalk',
            count: 5,
            similarCount: 6
        },
        {
            name: 'bicycles',
            folder: 'bicycle',
            count: 5,
            similarCount: 6
        },
        {
            name: 'fire hydrants',
            folder: 'fire_hydrant',
            count: 5,
            similarCount: 6
        },
        {
            name: 'buses',
            folder: 'bus',
            count: 5,
            similarCount: 6
        }
    ]
};
