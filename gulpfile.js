var gulp = require('gulp'),
	webserver = require('gulp-webserver');

gulp.task('default', function(){
	return gulp.src('./@test_templates')
		.pipe(webserver({
			host: "0.0.0.0",
			port: 3003,
			livereload: false,
			// open: 'http://localhost:3001',
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
