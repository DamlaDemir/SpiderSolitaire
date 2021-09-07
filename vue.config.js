module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/base/variables.scss";
      @import "@/assets/css/base/reset.scss";
      @import "@/assets/css/base/mixins.scss";`,
      },
    },
  },
};
