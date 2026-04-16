/**
 * Simple URL-friendly slug generator
 * e.g.  "30 Min Coffee Chat!" → "30-min-coffee-chat"
 */
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/[^\w-]+/g, '')    // remove non-word chars
    .replace(/--+/g, '-')       // collapse double hyphens
    .replace(/^-+|-+$/g, '');   // trim leading/trailing hyphens

module.exports = slugify;
