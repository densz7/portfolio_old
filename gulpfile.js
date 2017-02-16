var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    errorHandler = require('gulp-plumber-error-handler'),
    notify = require('gulp-notify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    smartgrid = require('smart-grid'),
    browserSync = require('browser-sync');

var settings = {
    outputStyle: 'styl', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1140px', /* max-width оn very large screen */
        fields: '15px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '30px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '15px'
        },
        sm: {
            'width': '780px',
            'fields': '15px'
        },
        xs: {
            'width': '560px',
            'fields': '15px'
        }
    }
};

gulp.task('smartgrid', function() {
    smartgrid('src/styles', settings);
});

gulp.task('compile_stylus', function() {
    return gulp.src(['src/styles/style.styl'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(stylus())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('concat_scripts', function() {
    return gulp.src(['src/scripts/*.js'])
        .pipe(concat('script.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/scripts/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/styles/*.styl','src/styles/blocks/*.styl'], ['compile_stylus']);
    gulp.watch(['src/scripts/*.js'], ['concat_scripts']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    host: 'localhost',
    port: 8000,
    open: true
  });
});

gulp.task('default', ['compile_stylus', 'concat_scripts', 'watch', 'browser-sync']);
