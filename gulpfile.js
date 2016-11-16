var gulp = require('gulp');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var browserSync = require('browser-sync');
var bsReload = require('browser-sync').reload;
var eslint = require('gulp-eslint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');

gulp.task('script', function() {
  return browserify('./frontend/src/scripts/script.js')
    .transform(babelify.configure({
      presets: ['es2015','react'], sourceMaps: true,
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./frontend/dist/js'));
});

gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: './backend/bin/www.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  }).on('start', function () {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('browser-sync', ['nodemon'], function (){
  browserSync.init({
    proxy: "localhost:3000",
    files: ["./frontend/dist/**"],
    port: '1408',
    notify: true
  });
});

gulp.task('html', function () {
  gulp.src('frontend/src/*.html')
    .pipe(gulp.dest('frontend/dist'))
});

gulp.task('image', function () {
  gulp.src('frontend/src/img/*')
    .pipe(gulp.dest('frontend/dist/img'))
});

gulp.task('sass-lint', function () {
  return gulp.src(['frontend/src/**/*.scss', '!frontend/src/styles/base.scss'])
    .pipe(sassLint({
      options: {
        formatter: 'stylish'
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sass',['sass-lint'], function () {
  gulp.src('frontend/src/styles/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./frontend/dist/css'))
    .pipe(gulp.dest('frontend/dist/css/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('vendor', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('frontend/dist/css'));
  gulp.src('node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('frontend/dist/js'));
});

gulp.task('js-lint', function () {
  return gulp.src(['frontend/src/scripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('frontend/src/*.html', ['html', bsReload]);
  gulp.watch('frontend/src/**/*.scss', ['sass']);
  gulp.watch('frontend/src/scripts/**/*.js', ['script', bsReload]);
});


gulp.task('build', ['html', 'sass' , 'script', 'js-lint', 'image', 'vendor']);
