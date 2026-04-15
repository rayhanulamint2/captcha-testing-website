/**
 * CAPTCHA Path Registry
 * ---------------------
 * All path files push into this global array.
 * After all scripts load, index.html picks one randomly.
 *
 * To add a new path:
 *   1. Create paths/path-yourname.js
 *   2. Push to CAPTCHA_PATHS (see existing files for format)
 *   3. Add a <script> tag in index.html
 */
const CAPTCHA_PATHS = [];

/**
 * Selects a random path from the registry.
 * Returns the full path object { name, difficulty, waypoints }.
 */
function getRandomPath() {
  if (CAPTCHA_PATHS.length === 0) {
    throw new Error('No paths registered! Check that path files are loaded.');
  }
  const index = Math.floor(Math.random() * CAPTCHA_PATHS.length);
  return CAPTCHA_PATHS[index];
}

/**
 * Optionally filter by difficulty before picking.
 * Usage: getRandomPathByDifficulty('medium')
 */
function getRandomPathByDifficulty(level) {
  const filtered = CAPTCHA_PATHS.filter(p => p.difficulty === level);
  if (filtered.length === 0) return getRandomPath(); // fallback
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}