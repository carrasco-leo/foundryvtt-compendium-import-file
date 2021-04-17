//
// manifest.js — Compendium Import File
// ~/gulp
//

const gulp = require('gulp');

exports.manifest = function manifest() {
	return gulp.src('config/*.json')
		.pipe(gulp.dest('dist'))
}
