// Use the new PostCSS plugin package for Tailwind CSS (for Tailwind v4+)
// Use PostCSS Tailwind plugin so @import "tailwindcss" is processed correctly.
// If both the Vite plugin and PostCSS plugin are enabled, Tailwind may run twice;
// this configuration preserves PostCSS handling as you requested.
module.exports = {
  plugins: [require("@tailwindcss/postcss"), require("autoprefixer")],
};
