// 实现这个项目的构建任务
const {src, dest, parallel, series, watch} =require('gulp');
const del = require('del');
let loadPlugins = require('gulp-load-plugins');
const bs = require('browser-sync').create();

const plugins = loadPlugins();

const data = {
  menus: [],
  pkg: require('./package.json'),
  date: new Date()
}

const tempDir = 'temp';
const distDir = 'dist';

function clean() {
  return del([tempDir, distDir])
}

function scripts() {
  return src('src/assets/scripts/*.js', {base: 'src'})
    .pipe(plugins.babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest(tempDir))
    .pipe(bs.reload({stream: true}))

}

function style() {
  return src('src/assets/styles/*.scss', {base: 'src'})
    .pipe(plugins.sass())
    .pipe(dest(tempDir))
    .pipe(bs.reload({stream: true}))

}

function html() {
  return src('src/**/*.html', {base: 'src'})
    .pipe(plugins.swig({data, defaults: { cache: false }}))
    .pipe(dest(tempDir))
    .pipe(bs.reload({stream: true}))
}

function image() {
  return src('src/assets/images/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest(distDir))
}

function font() {
  return src('src/assets/fonts/**', {base: 'src'})
    .pipe(plugins.imagemin())
    .pipe(dest(distDir))
}

function extra() {
  return src('public/**', {base: 'public'})
    .pipe(dest(distDir))
}

function useref() {
  return src(`${tempDir}/*.html`, {base: tempDir})
    .pipe(plugins.useref({
      searchPath: [tempDir, '.']
    }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true
    })))
    .pipe(dest(distDir))
}

const compile = parallel(style, scripts, html);

const start = () => {

  watch('src/assets/styles/*.scss', style);
  watch('src/assets/scripts/*.js', scripts);
  watch('src/*.html', html);

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**',
  ], bs.reload);

  bs.init({
    server: {
      baseDir: [tempDir, 'src', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const build = series(clean, parallel(series(compile, useref), image, font, extra))

module.exports = {
  compile,
  build,
  start: series(compile, start),
  clean
}
