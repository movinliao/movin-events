module.exports = {
  css: {
    px2rem: true,
    autoprefixer: true
  },
  webpack: {
    externals: {
      jquery: 'jQuery',
      vue: 'Vue',
      hammerjs: 'Hammer'
    },
    provide: {
      $: 'jquery',
      Vue: 'vue'
    }
  }
};
