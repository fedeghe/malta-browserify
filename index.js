require('malta').checkExec('browserify');
// this is somehow a special case cause jsdoc is meant to be used only as console tool
// then:
// - we cannot test with require
// - we do not need to require, it's (hopefully) installed
// - we need to lauch it as a new process
// 
// var deps = ['jsdoc'];
// deps && deps.length && require('malta2').checkDeps(deps);


// 
// http://usejsdoc.org/

const path = require('path'),
	fs = require('fs'),
	child_process = require('child_process');

function malta_browserify(o, options) {

	const self = this,
		start = new Date(),
        pluginName = path.basename(path.dirname(__filename)),
        opts = [o.name, '-o', o.name];

    let msg;

    options = options || {};

    if (options.args) options.push(options.args)

	return (solve, reject) => {
		try {
            const ls = child_process.spawn('browserify', opts);
            ls.stdout.on('data', m => {
				console.log(m)
			});
			ls.on('exit', () => {
				o.content = fs.readFileSync(o.name) + "";
				msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name;
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
		} catch (err) {
            reject(`Plugin ${pluginName} error:\n${err}`);
			self.doErr(err, o, pluginName);
		}
	};
}
malta_browserify.ext = 'js';
module.exports = malta_browserify;