module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
      },
      spacing: {
        // Add custom spacing if needed
      },
      borderRadius: {
        // Add custom border radius if needed
      },
      fontSize: {
        // Add custom font sizes if needed
      },
    },
  },
  plugins: [],
};
// Add a small safelist so common icon/size/stroke utilities are preserved
module.exports.safelist = [
  "w-4",
  "w-5",
  "w-6",
  "h-4",
  "h-5",
  "h-6",
  "stroke-1",
  "stroke-2",
  "shrink-0",
];
