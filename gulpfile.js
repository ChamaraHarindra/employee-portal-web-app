'use strict';

var gulp = require('gulp');
var data = require('gulp-data');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var nunjucksRender = require('gulp-nunjucks-render');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');


// Development Tasks 
// -----------------

// Autoprefixer browser list
var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

// Start browserSync server
gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: './app'
        }
    })
})

gulp.task('sass', function() {
    return gulp
        .src(["./app/scss/**/*.scss", "!./node_modules/**/*.scss"]) // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(autoprefixer(autoPrefixBrowserList))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./app/css")) // Outputs it in the css folder
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
})


gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('./app/pages/**/*.html')
        .pipe(data(function() {
            return require('./data.json')
        }))
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['./app/templates', './app/pages/']
        }))
        // output files in app folder
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});



// Watchers
gulp.task('watch', function () {
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch('./app/css/**/*.css', browserSync.reload);
    gulp.watch('./app/js/**/*.js', browserSync.reload);
    gulp.watch('./app/**/*.html', browserSync.reload);
    gulp.watch(('./app/pages/**/*.html','./app/templates/**/*.html'), ['nunjucks']);
})



// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {

    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function () {
    return gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest('./dist/images'))
});


// Copying fonts 
gulp.task('js', function () {
    return gulp.src('./app/js/main.js')
        .pipe(gulp.dest('./dist/js'))
})

// Cleaning 
gulp.task('clean', function () {
    return del.sync('dist').then(function (cb) {
        return cache.clearAll(cb);
    });
})

gulp.task('clean:dist', function () {
    return del.sync(['./dist/**/*', '!./dist/images', '!./dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync'], 'watch',
        callback
    )
})

gulp.task('build', function(callback) {
    runSequence(
        'clean:dist', ['useref', 'images', 'js'],
        callback
    )
})