//const { src, dest } = require('gulp');
const sync = require("browser-sync").create();
const gulp = require('gulp');
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const del = require("del");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");



// const styles = () => {
//   return gulp.src("src/sass/style.sass")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer(),
//       csso()
//     ]))
//     .pipe(rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("src/css"))
//     .pipe(sync.stream());
// }
// Styles

const styles = () => {
  return gulp.src("source/sass/style.sass")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

//exports.styles = styles;
exports.styles = styles;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;
// Clean

// const clean = () => {
//   return del("build");
// };


// Watcher

// const watcher = () => {
  
//   // gulp.watch("src/js/js.js", gulp.series(scripts));
//   // gulp.watch("src/*.html", gulp.series(html));
//   //gulp.watch("build/*.html").on("change", sync.reload);
//   gulp.watch("src/html/*.html").on("change", sync.reload);
//   gulp.watch("src/js/*.js").on("change", sync.reload);
//   gulp.watch("src/sass/**/*.sass").on("change", sync.reload);
// }

// const scripts = () => {
//   return gulp.src("src/js/js.js")
//     .pipe(terser())
//     .pipe(rename("js.min.js"))
//     .pipe(gulp.dest("build/js"))
//     .pipe(sync.stream());
// }

// exports.scripts = scripts;

// HTML

// const html = () => {
//   return gulp.src("src/html/*.html")
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest("build"));
// }

// const build = gulp.series(
//   clean,

//   gulp.parallel(
//     styles,
//     html,
//     scripts
    
//   ),
// );

// exports.build = build;


// Default


// exports.default = gulp.series(
//   clean,
 
//   gulp.parallel(
//     styles,
//     html,
//     scripts,
    
//   ),
//   gulp.series(
//     server,
//     watcher
//   ));

  // Styles

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.sass", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
