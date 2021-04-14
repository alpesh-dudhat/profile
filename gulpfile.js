var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const { src, dest, series, watch } = require('gulp');

function scss() {
    return src('src/scss/*.scss', { sourcemaps: '.' })
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest('src/css'));
    // .pipe(browserSync.stream());
}



// Browsersync Tasks
function browsersyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: './src'
        }
    });
    cb();
}


function browsersyncReload(cb) {
    browserSync.reload();
    cb();
}


// Watch Task
function watchTask() {
    watch('*.html', browsersyncReload);
    watch(['src/scss/*.scss', 'src/js/*.js'], series(scss, browsersyncReload));
}

// Default Gulp task
exports.default = series(
    scss,
    browsersyncServe,
    watchTask
);

