// webpack

const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 |  Configuring Elixir default path
 |--------------------------------------------------------------------------
 */

elixir.config.assetsPath = './app';
elixir.config.css.sass.folder = './sass';
elixir.config.js.folder  = './';
elixir.config.css.folder = './';
/*
 |--------------------------------------------------------------------------
 |  Loading up application specific requirement
 |--------------------------------------------------------------------------
 */

elixir((mix) => {
    mix
    .webpack('main.js', 'public/js/app.js')
    .sass('style.scss', 'public/css/app.css');
});
