const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/js/app.tsx', 'public/js')
    .react()
    .sass('resources/sass/app.scss', 'public/css');

/**
 * BEGIN: Injected from .gp/snippets/laravel/webpack/browser-sync.snippet
 */

const { execSync } = require('child_process');
const PROXY_PORT=execSync(`bash $GITPOD_REPO_ROOT/.gp/bash/helpers.sh get_default_server_port`)
const BS_PORT=3005
const GP_URL = execSync(`gp url ${BS_PORT}`)
mix.browserSync({
  ui: false,
  proxy: {
    target: `http://localhost:${PROXY_PORT}`
  },
  port: BS_PORT,
  socket: {
    domain: GP_URL
  }
});

 /**
 * END: Injected from .gp/snippets/laravel/webpack/browser-sync.snippet
 */