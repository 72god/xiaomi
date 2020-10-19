var {
    src,
    dest,
    series
} = require("gulp");

var babel = require("gulp-babel")
var uglify = require("gulp-uglify");
// var htmlmin = require("gulp-htmlmin");
var cleanCss = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
// var Sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");

//ES6 转ES5并且压缩js
function change() {
    return src("./WWW/js/*")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(dest("WWW1/js"))
}

// 压缩html
// function htmlmin() {
//     return src("./WWW/**/*")
//         .pipe(babel({
//             presets: ["es2015"]
//         }))
//         .pipe(uglify())
//         .pipe(dest("WWW1/html"))
// }

//ES6 转ES5并且压缩js
function doCss() {
    return src("./WWW/css/*")
        .pipe(cleanCss())
        .pipe(dest("WWW1/css"))
}

function doImg() {
    return src("./WWW/images/**/*")
        .pipe(imagemin())
        .pipe(dest("WWW1/images"))
}

function data() {
    return src("./WWW/data/*.json")
        .pipe(dest("WWW1/data"))
}

function html() {
    return src("./WWW/html/*.html")
        .pipe(dest("WWW1/html"))
}

function index() {
    return src("./WWW/index.html")
        .pipe(dest("WWW1/index.html"))
}
module.exports.begin = series([change, doCss, doImg, data, html, index])