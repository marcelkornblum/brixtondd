//Experimental

/*jslint node: true */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var gCheerio = require('gulp-cheerio');
var ngHtml2js = require("gulp-ng-html2js");
var webserver = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var streamqueue = require('streamqueue');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var stylish = require('jshint-stylish');
var domSrc = require('gulp-dom-src');
var replace = require('gulp-replace');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var livereload = require('gulp-livereload');

var htmlminOptions = {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    // removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
};

var EXPRESS_PORT = 8080;
var APP_ROOT = __dirname + '/brixtondd';
var LIVERELOAD_PORT = 11111;

var paths = {
    scripts: ['**/*.js', '!node_modules/**', '!dist/**', '!temp/**', '!lib/**']
};

function startExpress() {
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')({
        port:LIVERELOAD_PORT
    }));
    app.use(express.static(APP_ROOT));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/fonts', express.static(__dirname + '/bower_components/bootstrap/fonts'));
    app.use('/lib', express.static(__dirname + '/lib'));
    app.listen(EXPRESS_PORT, '0.0.0.0');
}

var lr;
function startLivereload() {
    lr = require('tiny-lr')();
    lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(APP_ROOT, event.path);
  console.log('Reloading for changed file:', fileName);

  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('webserver', function () {
  startExpress();
  startLivereload();
  gulp.watch([APP_ROOT + '/**/*.html', APP_ROOT + '/**/*.js'], notifyLivereload);
});




gulp.task('clean', function() {
    rimraf.sync('dist');
});

gulp.task('css', ['clean'], function() {
    return gulp.src(APP_ROOT + '/app.less')
        .pipe(less())
        .pipe(replace(/bower_components\/bootstrap\/dist\/fonts\//g, '/'))
        .pipe(replace(/bower_components\/font-awesome\/fonts\//g, '/'))
        .pipe(replace(/\/fonts\//g, '/'))
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(rename('app.full.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', ['clean'], function() {

    var templateStream = gulp.src(['!node_modules/**','!' + APP_ROOT + '/index.html','!_SpecRunner.html','!.grunt/**','!dist/**','!temp/**','!bower_components/**', '**/*.html'])
        .pipe(htmlmin(htmlminOptions))
        .pipe(ngHtml2js({
            moduleName: 'brixtondd',
            stripPrefix: 'brixtondd/'
        }));

    var jsStream = domSrc({file: 'brixtondd/index.html',selector:'script[data-build!="exclude"]',attribute:'src'});


    var combined = streamqueue({ objectMode: true });

    combined.queue(jsStream);
    combined.queue(templateStream);

    return combined.done()
        // .pipe(require('gulp-print')())
        .pipe(concat('app.full.min.js'))
        .pipe(replace(/\/fonts\//g, '/'))
        .pipe(ngAnnotate())
        .pipe(uglify({
            mangle:false,
            // compress: false
        }))
        .pipe(gulp.dest('dist/'));

});

gulp.task('indexHtml', ['clean'], function() {
    return gulp.src(APP_ROOT + '/index.html')
        .pipe(gCheerio(function ($) {
            $('script[data-remove!="exclude"]').remove();
            $('link[data-remove!="exclude"]').remove();
            $('body').append('<script src="app.full.min.js"></script>');
            $('head').append('<link rel="stylesheet" href="app.full.min.css">');
        }))
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', ['clean'], function(){
    return gulp.src(APP_ROOT + '/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', ['clean'], function(){
    return gulp.src(['bower_components/font-awesome/fonts/**', 'bower_components/bootstrap/dist/fonts/**'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function(){
    gulp.src(['!node_modules/**','!.grunt/**','!dist/**','!bower_components/**', APP_ROOT + '/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('build', ['clean', 'css', 'js', 'indexHtml', 'images', 'fonts']);
gulp.task('default', ['webserver']);
