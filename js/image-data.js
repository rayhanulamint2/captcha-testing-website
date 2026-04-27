// ===================================================
// IMAGE CAPTCHA — Configuration (Cloudinary)
// ===================================================
//
// Images are hosted on Cloudinary. The URL pattern is:
//   https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/FOLDER/FILENAME
//
// ─── SETUP STEPS ─────────────────────────────────────
//
// STEP 1: Create a free Cloudinary account
//   → Go to https://cloudinary.com and sign up
//   → After signup, find your "Cloud Name" on the dashboard
//   → Replace 'YOUR_CLOUD_NAME' below with your actual cloud name
//
// STEP 2: Upload your images to Cloudinary
//   → Go to Media Library → Create these folders:
//
//      captcha/traffic_light/         ← upload 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg
//      captcha/traffic_light/similar/ ← upload 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, 6.jpg
//      captcha/crosswalk/             ← same pattern
//      captcha/crosswalk/similar/
//      captcha/bicycle/
//      captcha/bicycle/similar/
//      captcha/fire_hydrant/
//      captcha/fire_hydrant/similar/
//      captcha/bus/
//      captcha/bus/similar/
//
//   → IMPORTANT: When uploading, keep the filename as 1, 2, 3...
//     Cloudinary may rename files, so use "Upload Preset" or
//     set "Use filename" = YES in upload settings.
//
// STEP 3: Update the cloudName below and adjust counts to match
//         how many images you actually uploaded.
//
// STEP 4: That's it! The CAPTCHA will load images from Cloudinary.
//
// ─── ADDING A NEW CATEGORY ───────────────────────────
//   1. Create folder on Cloudinary:  captcha/my_category/
//   2. Upload target images:         1.jpg, 2.jpg, ...
//   3. Create subfolder:             captcha/my_category/similar/
//   4. Upload confusing images:      1.jpg, 2.jpg, ...
//   5. Add an entry in categories[] below
//
// ===================================================

var IMAGE_CAPTCHA_CONFIG = {

    // ┌─────────────────────────────────────────────────┐
    // │  CHANGE THIS to your Cloudinary cloud name!     │
    // └─────────────────────────────────────────────────┘
    cloudName: 'dckzou5yc',

    // Cloudinary folder where all captcha images live
    cloudFolder: 'captcha',

    // Default file extension
    defaultExt: '.jpg',

    // How many target images to show per challenge (randomly 3 to 5)
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
