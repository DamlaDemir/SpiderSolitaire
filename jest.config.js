module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|mp3)$":
      "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!src/main.js", // No need to cover bootstrap file
    "!src/App.vue", // No need to cover bootstrap file
    "!src/components/Fireworks.vue", // No need to cover bootstrap file
  ],
};
