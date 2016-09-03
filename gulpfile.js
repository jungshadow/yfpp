var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var watchify = require('watchify');
var notify = require('gulp-notify');

var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

/* configuration variables */
var config = {
    SRC_DIR: './src/',
    DEST_DIR: './web/',
    production: !!gutil.env.prod
};

/*
  Styles Task
*/

gulp.task('styles',function() {
  // move over fonts
  gulp.src(config.SRC_DIR + 'fonts/**.*')
    .pipe(gulp.dest(config.DEST_DIR + 'fonts'));

  //move over vendor scripts
  gulp.src(config.SRC_DIR + 'scripts/vendor/**.*')
    .pipe(gulp.dest(config.DEST_DIR + 'scripts/vendor'))
});

gulp.task('sass', function () {

  return gulp.src(config.SRC_DIR + 'scss/**/*.scss')
    .pipe(sass(config.production ? {outputStyle:'compressed'} : {outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.DEST_DIR +'css'))
    .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
  gulp.watch(config.SRC_DIR + 'scss/**/*.scss', ['sass']);
});


/*
  Images
*/
gulp.task('images',function(){
  gulp.src(config.SRC_DIR + 'images/**')
    .pipe(gulp.dest(config.DEST_DIR + 'images'))
});

/*
  Browser Sync
*/
gulp.task('browser-sync', function() {
    browserSync({
        // we need to disable clicks and forms for when we test multiple rooms
        server : {},
        middleware : [ historyApiFallback() ],
        ghostMode: false,
    });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  var props = {
    entries: [config.SRC_DIR + 'scripts/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      // If you also want to uglify it
      .pipe(buffer())
      .pipe(config.production ? uglify() : gutil.noop())
      .pipe(gulp.dest(config.DEST_DIR))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('scripts', function() {
  return buildScript('main.js', false); // this will run once because we set watch to false
});

// run 'scripts' task first, then watch for future changes
gulp.task('watch', ['images', 'styles', 'sass', 'scripts', 'browser-sync'], function() {
  gulp.watch(config.SRC_DIR + 'scss/**/*.scss', ['sass']); // scss watch for style change
  return buildScript('main.js', true); // browserify watch for JS changes
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['images', 'styles', 'sass', 'scripts'], function() {
  return buildScript('main.js', false);
});


