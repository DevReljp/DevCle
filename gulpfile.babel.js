import gulp from 'gulp'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import uglify from 'gulp-uglify'
import plumber from 'gulp-plumber'
import browserify from 'browserify'
import source from 'vinyl-source-stream'

var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var Cache = require('gulp-file-cache');
var babel = require('gulp-babel')

var cache = new Cache();

var concat = require('gulp-concat');

gulp.task("sass", function() {
  gulp.src("./clientsrc/sass/**/*scss")
    .pipe(plumber())
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest("./public/css"))
});

gulp.task('js', function() {
  browserify({
    entries: ["./clientsrc/js/main.js"], // ビルド対象のファイル
    debug: true, // sourcemapを出力、chromeでのdebug可能にする
    transform: ['cssify']
  })
  .bundle()
  .on('error', console.error.bind(console)) // js compileエラーでもwatchを止めない
  .pipe(source("app.js")) // ビルド後のファイル名
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./public/js/")); // 生成先の指定
});

gulp.task('debugserver', function() {
  livereload.listen();

  nodemon({
    exec: 'node-inspector --web-port 3002 & node --debug',
    script: './server.js',
    ext: 'js, json',
    task: ['compile'],
    ignore: [   // nodemon ignore directory
      'views',
      'public',
      'clientsrc'
    ],
    env: {
      'NODE_ENV': 'development'
    },
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^application\ started/.test(chunk)) {
        livereload.reload();
      }
      process.stdout.write(chunk);
    });
    this.stderr.on('data', function(chunk) {
      process.stderr.write(chunk);
    });
  });

});

gulp.task('watch', function() {
  gulp.watch(["./clientsrc/js/**/*.js"], ["js"]);
  gulp.watch(["./clientsrc/sass/**/*.scss"], ["sass", "js"]); // jsでcssをrequireしているのでjsも実行する
  gulp.watch(["./public/**/*.*", "./views/**/*.*"], function(e) {
    livereload.changed(e);
  });
});

gulp.task('compile', function () {
  var stream = gulp.src('./src/**/*.js') // your ES2015 code
                   .pipe(cache.filter()) // remember files
                   .pipe(babel({})) // compile new ones
                   .pipe(cache.cache()) // cache them
                   .pipe(gulp.dest('./')) // write them
  return stream // important for gulp-nodemon to wait for completion
})

gulp.task("default", [
  'compile',
  'debugserver',
  'sass',
  'js',
  'watch'
]);

gulp.task("build", [
  'sass',
  'js'
]);