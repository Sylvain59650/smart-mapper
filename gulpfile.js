var babel = require("gulp-babel");
var gulp = require("gulp");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
//var umd = require("gulp-umd");

var chemins = {
  sources: "./sources/",
  distrib: "./distrib/",
  demo: "./docs/demo/",
  vendor: "./docs/3parts"
};



gulp.task("smart-mapper.min.js", ["vendor"], () => {
  return gulp.src([
      "sources/smart-mapper.js"
    ])
    .pipe(concat("smart-mapper.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true,
      comments: false
    }))

  .pipe(gulp.dest(chemins.distrib))
});

gulp.task("vendor", () => {
  return gulp.src([
      "./node_modules/htmlelement-extension/distrib/htmlElement.min.js",
      "./node_modules/htmlelement-events-extension/distrib/htmlElement-events.min.js",
      "./node_modules/passthrough-object/distrib/passthrough-object.min.js"
    ])
    .pipe(gulp.dest(chemins.vendor))
});

gulp.task("demo", () => {
  return gulp.src([
      "sources/smart-mapper.js"
    ])
    .pipe(concat("smart-mapper.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: false,
      comments: false
    }))

  .pipe(gulp.dest(chemins.demo + "modules/smart-mapper/distrib/"))
});

gulp.task("watch:smart-mapper.min.js", function() {
  watch("./sources/smart-mapper.js", function() {
    gulp.run("smart-mapper.min.js");
  });
});



gulp.task("default", ["smart-mapper.min.js", "demo", "vendor"]);


gulp.task("all", ["default"]);

gulp.task("watch", ["watch:smart-mapper.min.js"]);