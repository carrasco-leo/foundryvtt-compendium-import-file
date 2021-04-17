//
// clean.js — Compendium Import File
// ~/gulp
//

const del = require('del');

/**
 * @return {Promise<void>}
 */
exports.clean = function clean() {
	return del(['dist/**']);
}
