var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");

var jsPath = [
    "./views/conf/*.js",
    "./views/utils/*.js", 
    "./views/index.js"
];

gulp.task("watch-js", ["js"], function() {
    gulp.watch(jsPath, ["js"]);
});

gulp.task("js", function() {
    gulp.src(jsPath)
        .pipe(concat("min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./views/dist/"));
});

gulp.task("default", ["watch-js"], function() {});