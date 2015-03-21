//
// Start - Uses ShellJS To Process The Entire Line
//
system = require('shelljs');

module.exports = function() {
	console.log("Start is :",process.line,process.word,process.line[process.wordNumber]);


process.exit(1);

}