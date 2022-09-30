const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass")(require("sass"));
const minifyCSS = require("gulp-csso");
const minifyJS = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");

var mainJs = "assets/js/main/";
var vendorJs = "assets/js/vendors/";
var mainCss = "assets/css/main/";

//Sass
gulp.task("sass", function () {
  gulp
    .src("assets/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("assets/css/main"))
    .pipe(browserSync.stream());
});
//Sass

//Master
var JSFilesMaster = [
  vendorJs + "jquery-3.6.1.min.js",
  vendorJs + "jquery.mask.min.js",
  vendorJs + "select2.min.js",
  mainJs + "main.js",
];
gulp.task("jsMaster", function () {
  return gulp
    .src(JSFilesMaster)
    .pipe(concat("master.min.js"))
    .pipe(minifyJS())
    .pipe(gulp.dest("assets/js"))
    .pipe(browserSync.stream());
});
var CSSFilesMaster = [
  mainCss + "reset.css",
  mainCss + "select2.css",
  mainCss + "main.css",
];

gulp.task("cssMaster", function () {
  return gulp
    .src(CSSFilesMaster)
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat("master.min.css"))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});
//Master

//Watch, klasördeki değişiklikleri algılayıp otomatik çalıştırma
gulp.task("watch", function () {
  gulp.watch("assets/scss", gulp.series("sass"));
  gulp.watch("assets/css/main", gulp.series("cssMaster"));
  gulp.watch("assets/js/main", gulp.series("jsMaster"));
  gulp.watch("assets/js/vendors", gulp.series("jsMaster"));
});

//Default tüm taskları toplu çalıştırma
//Sassda degisiklik varsa bu komuttan önce çalışması gerek //gulp sass olarak
gulp.task("default", gulp.parallel("jsMaster", "cssMaster"));
