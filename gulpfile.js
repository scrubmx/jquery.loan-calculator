'use strict';

const autoprefixer = require('autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

const dir = {
  source: 'source/',
  node:   'node_modules/',
  build:  'build/',
  dist:   'dist/'
}

const paths = {
  css:    'css/',
  js:     'js/'
};

const packages = {
  bootstrapCSS: 'bootstrap/dist/css/bootstrap.css',
  appSCSS: 'scss/app.scss',
  nouisliderCSS: 'nouislider/distribute/*.css',

  jquery: 'jquery/dist/jquery.js',
  wNumb: 'wnumb/wNumb.js',
  //popper: 'popper.js/dist/umd/popper.js',
  nouisliderJS: 'nouislider/distribute/nouislider.js',
  loanCalc: 'loan-calc.js'
}

function scriptsBundle(){
  return src([
    dir.node + packages.jquery,
    dir.node + packages.wNumb,
    //dir.node + packages.popper,
    dir.node + packages.nouisliderJS,
    dir.source + paths.js + packages.loanCalc
  ])
  .pipe(concat('loan-calc.js'))
  //.pipe(uglify())   <----------- ENABLE IN PRODUCTION 
  .pipe(dest(dir.build + 'js'));
}

function stylesBundle(){
  return src([
    //dir.node + packages.bootstrapCSS,
    dir.node + packages.nouisliderCSS,
    dir.source + packages.appSCSS
    //(dir.source+'scss/').pipe(sass()).pipe(postcss([autoprefixer(),cssnano()])) <----------- ENABLE CSS NANO IN PRODUCTION 
  ])
  .pipe(sass()).pipe(postcss([autoprefixer()]))
  .pipe(concat('loan-calc.css'))
  .pipe(dest(dir.build + 'css'))
}

function phpBundle(){
  return src(
    dir.source + 'templates/**/*.php'
  )
  .pipe(dest(dir.build + 'templates/'));
}

function copyJson(){
  return src(
    dir.source + 'loan-settings.json'
  )
  .pipe(dest(dir.build));
}

function watchTasks() {
  watch(dir.source, 
    parallel(scriptsBundle, stylesBundle, phpBundle,copyJson));
}

exports.default = series(
  parallel(scriptsBundle, stylesBundle),
  phpBundle,
  copyJson,
  watchTasks
);

