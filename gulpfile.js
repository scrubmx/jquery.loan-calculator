const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');
const svgo = require('gulp-svgo');
const embedSvg = require('gulp-embed-svg');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const inject = require('gulp-inject');
const bump = require('gulp-bump');

const dir = {
	source: 'source/',
	build: 'build/',
	node: 'node_modules/',
	dist: 'dist/'
}
const paths = {
	css: 'css/',
	js: 'js/',
	source: 'source/'
};
const package = {
	jquery: 'jquery/dist/jquery.js',
	popper: 'popper.js/dist/umd/popper.js',
	bootstrap: 'bootstrap/dist/js/bootstrap.js',
	wnumb: 'wnumb/wNumb.js',
	loancalculator: 'jquery.loan-calculator/js/*.js',
	nouislider: 'nouislider/distribute/*.js',
	currency: 'format.currency.js',
	init: 'loan.calculator.js',
	reminder: 'reminder.form.js',
	consolidation: 'consolidation.calculator.js',
	helpers: 'helper.functions.js',
	loansettings: 'loans.settings.js'
}
gulp.task('images', () => {
	return gulp.src(dir.source + 'images/*').pipe(svgo()).pipe(gulp.dest(dir.build + 'images/'));
});


gulp.task('svgstore', () => {
	var svgs = gulp
		.src(dir.source + 'images/*.svg')
		.pipe(svgstore({
			inlineSvg: true
		}));

	function fileContents(filePath, file) {
		return file.contents.toString();
	}

	return gulp
		.src(dir.source + 'templates/**/*.php')
		.pipe(inject(svgs, {
			transform: fileContents
		}))
		.pipe(gulp.dest(dir.build + 'templates/'));
});

gulp.task('bump-patch', function () {
	var options = {
		type: 'patch'
	};
	return gulp.src(dir.build + './loan-calculator.php')
		.pipe(bump(options))
		.pipe(gulp.dest(dir.build));
});
gulp.task('bump-minor', function () {
	var options = {
		type: 'minor'
	};
	return gulp.src(dir.build + './loan-calculator.php')
		.pipe(bump(options))
		.pipe(gulp.dest(dir.build));
});

gulp.task('zip', function () {
	return gulp.src(dir.build + '**').pipe(zip('lmcu-loan-calculator.zip')).pipe(gulp.dest(dir.dist));
});


gulp.task('pack-js', function () {
	return gulp.src([dir.source + paths.js + package.currency, dir.node + package.popper, dir.node + package.bootstrap, dir.node + package.wnumb, dir.node + package.loancalculator, dir.node + package.nouislider, dir.source + paths.js + package.reminder, dir.source + paths.js + package.helpers, dir.source + paths.js + package.loansettings, dir.source + paths.js + package.init, dir.source + paths.js + package.consolidation]).pipe(concat('scripts.js')).pipe(gulp.dest(dir.build + paths.js));
});
gulp.task('pack-css', function () {
	return gulp.src([dir.node + 'nouislider/distribute/*.min.css', dir.source + 'scss/*.scss']).pipe(sass()).pipe(concat('styles.css')).pipe(gulp.dest(dir.build + paths.css));
});
gulp.task('default', gulp.parallel('pack-js', 'pack-css', 'svgstore'));
gulp.task('watch', function () {
	return gulp.watch([dir.source + 'scss/*.scss', dir.source + 'js/*.js', dir.source + 'templates/**/*.php'], gulp.series('pack-js', 'pack-css', 'bump-patch', 'svgstore'));
});
gulp.task('pkg',
	gulp.series('pack-js', 'pack-css', 'bump-minor', 'svgstore', 'zip'));
