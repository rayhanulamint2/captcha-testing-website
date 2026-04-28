/**
 * CAPTCHA CONFIGURATION
 * 
 * Update CLOUD_NAME with your Cloudinary cloud name.
 * Upload images to: captcha_image/1.jpg, captcha_image/2.jpg, etc.
 * 
 * IMAGE_COUNT = total number of images you've uploaded.
 * The system picks one randomly each time.
 */

const CAPTCHA_CONFIG = {
    CLOUD_NAME: 'dckzou5yc',   // ← replace this
    FOLDER: 'captcha_image',
    IMAGE_COUNT: 10,                        // ← how many images (1.jpg to 10.jpg)

    // Cloudinary URL builder
    getImageURL(index) {
        // index: 1-based (1.jpg, 2.jpg, ...)
        return `https://res.cloudinary.com/${this.CLOUD_NAME}/image/upload/${this.FOLDER}/${index}.png`;
    },

    // Get a random image URL
    getRandomImageURL() {
        const idx = Math.floor(Math.random() * this.IMAGE_COUNT) + 1;
        return this.getImageURL(idx);
    }
};