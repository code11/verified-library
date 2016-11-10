const babel = require('gulp-babel');
var gulp = require('gulp'),
    watch = require('gulp-watch');

webserver = require('gulp-webserver');

gulp.task('babel', function(){
    return watch('src/ve.js', function () {
        gulp.src('src/ve.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('./dist'))
    })})

gulp.task('webserver', function(){
	return gulp.src('./dist/anticimex')
		.pipe(webserver({
			host: "0.0.0.0",
			port: 3001,
			livereload: true,
			open: 'http://localhost:3001',
			browser: 'chrome',
			proxies: [
			//{ source: '/api', target:'http://localhost:3010/api' }
			{ source: '/api', target:'https://verified-dev.c11.io/api' },
			{ source: '/api-v2', target:'https://verified-dev.c11.io/api-v2' }
			//{ source: '/api-docs', target:'http://verified.c11.io/api-docs' }
			// { source: '/swift', target:'https://s3.ocloud.basefarm.net/swift' }
			]
		}));
});

gulp.task('default',['webserver','babel'])
