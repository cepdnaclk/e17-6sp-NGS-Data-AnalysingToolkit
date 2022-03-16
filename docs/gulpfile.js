const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const del = require('del');

//SCSS compilation

function style() {
    return gulp.src('./assets/scss/*.scss')
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        startPath: 'index.html',
        ghostMode: false,
        notify: false
    });
    style();
    gulp.watch('./assets/scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./assets/js/*.js').on('change', browserSync.reload);

}

function cleanVendors(){
    return del('./assets/vendors/**/*');
}

function buildVendors() {
    var addon1 = gulp.src('./node_modules/bootstrap/**/*')
                     .pipe(gulp.dest('./assets/vendors/bootstrap'));
    var addon2 = gulp.src('./node_modules/jquery/dist/**/*')
                     .pipe(gulp.dest('./assets/vendors/jquery'));
    var addon3 = gulp.src('./node_modules/popper.js/dist/umd/**/*')
                     .pipe(gulp.dest('./assets/vendors/popper.js'));
    var addon4 = gulp.src('./node_modules/animate.css/**/**')
                     .pipe(gulp.dest('./assets/vendors/animate.css'));
    var addon5 = gulp.src('./node_modules/wowjs/dist/*')
                     .pipe(gulp.dest('./assets/vendors/wowjs'));

    return (addon1, addon2, addon3, addon4, addon5);
}

exports.style = style;
exports.watch = watch;
exports.buildVendors = gulp.series(cleanVendors, buildVendors);