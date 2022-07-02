const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel')
const ugli = require('gulp-uglify')
const concat = require('gulp-concat')

// пути к файлам
const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}
//  обработка скриптов
function scripts () {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(ugli())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

// задача для обработки sass предпроцессора
function buildStyles() {
    return gulp.src(paths.styles.src)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.styles.dest));
  };
  

// вочер для просмотра изменений
function watch () {
    gulp.watch(paths.styles.src, buildStyles)
    gulp.watch(paths.scripts.src, scripts)
}

// последовательный вызов тасков
const build = gulp.series(gulp.parallel(scripts,buildStyles), watch)

exports.buildStyles = buildStyles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.default = build