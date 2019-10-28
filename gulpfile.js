const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');
const svgo = require('gulp-svgo');
const embedSvg = require('gulp-embed-svg');
const dir = {
    source: 'source/'
    , build: 'build/'
    , node: 'node_modules/'
    , dist: 'dist/'
}
const paths = {
    css: 'css/'
    , js: 'js/'
    , source: 'source/'
};
const package = {
    jquery: 'jquery/dist/jquery.js'
    , popper: 'popper.js/dist/umd/popper.js'
    , bootstrap: 'bootstrap/dist/js/bootstrap.js'
    , wnumb: 'wnumb/wNumb.js'
    , loancalculator: 'jquery.loan-calculator/js/*.js'
    , nouislider: 'nouislider/distribute/*.js'
    , currency: 'format.currency.js'
    , init: 'the.calculator.js'
    , reminder: 'reminder.form.js'
}
gulp.task('images', () => {
    return gulp.src(dir.source + 'images/*').pipe(svgo()).pipe(gulp.dest(dir.build + 'images/'));
});
gulp.task('zip', function () {
    return gulp.src(dir.build + '**').pipe(zip('lmcu-loan-calculator.zip')).pipe(gulp.dest(dir.dist));
});
gulp.task('icons', function () {
    return gulp.src(dir.node + '@fortawesome/fontawesome-free/webfonts/*').pipe(gulp.dest(dir.build + 'css/webfonts/'));
});
gulp.task('pack-js', function () {
    return gulp.src([dir.source + paths.js + package.currency, dir.node + package.popper, dir.node + package.bootstrap, dir.node + package.wnumb, dir.node + package.loancalculator, dir.node + package.nouislider,dir.source + paths.js + package.reminder, dir.source + paths.js + package.init]).pipe(concat('scripts.js')).pipe(gulp.dest(dir.build + paths.js));
});
gulp.task('pack-css', function () {
    return gulp.src([dir.node + 'nouislider/distribute/*.min.css', dir.source + 'scss/*.scss']).pipe(sass()).pipe(concat('styles.css')).pipe(purgecss({
        content: [dir.build + 'templates/*.php']
    })).pipe(cleanCSS({
        compatibility: 'ie8'
        , level: 2
    })).pipe(gulp.dest(dir.build + paths.css));
});
gulp.task('default', gulp.parallel('pack-js', 'pack-css'));
gulp.task('watch', function () {
    gulp.watch([dir.source + 'scss/*.scss', dir.source + 'js/*.js'], gulp.series('pack-js', 'pack-css'));
});
gulp