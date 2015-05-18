var fs = require('fs'),
    path = require('path'),
    system = require('shelljs');

var runner = "";
var blahdir = "";
var returndata = "";

module.exports = function(fileorstring,dirpath) {
	if (typeof dirpath =="undefined") {
		dirpath = __dirname;
	} else {
		process.chdir(dirpath);
	}

//
// Load The File Or String Blah
//
	runner = "";
	blahdir = "";
	returndata = "";
	var fos = "";
	if (fileorstring=="") {
		console.log("Blah Usage: blah [script or file here]");
		process.exit(1);
	} else if (fs.existsSync(path.resolve(fileorstring))) {
		blahdir = path.resolve(path.dirname(fileorstring));
		fos = fs.readFileSync(path.resolve(fileorstring));
	} else {
		blahdir = dirpath;
		fos = fileorstring;
	}

//
// Line By Line Itteration
//
	var lines = "";
	if (typeof fos == "object") {
		lines = fos.toString().match(/^.*([\n\r]+|$)/gm);
	} else {
		lines = fos.match(/^.*([\n\r]+|$)/gm);
	}
	var z = 0;
	for (line in lines) {
	z++;
	process.lineNumber = z;

//
// Word For Word Blah Parsing
//
	line = lines[line].split(" ");
	var name = "";
	process.line = line;
	for (x=0;x<line.length;x++) {
		name = line[x];
		if (name=="") break;
		process.wordNumber = x;
		process.word = name;

//
// Word Functions
//
	var halb = name.split("(");
	if (halb=="") {
		halb = false;
	} else {
		name = halb[0];
		if (halb[1]) {
			halb = halb[1].replace(')','');
		}
	}

//
// Word Runners
//


	//
	// [-] Uninstall Handler (npm uninstall [name])
	//
	if (name[0]=="-") {
		system.exec('npm uninstall ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error or No Package Named "+ name.substr(1,name.length-1));
			}
		});

	//
	// [~] Start Handler (npm start [name])
	//
	} else if (name[0]=="~") {
		system.exec('npm start ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Start "+ name.substr(1,name.length-1));
			}
		});
	//
	// [!] Stop Handler (npm stop [name])
	//
	} else if (name[0]=="!") {
		system.exec('npm stop ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Stop "+ name.substr(1,name.length-1));
			}
		});

	//
	// [@] Restart Handler (npm restart [name])
	//
	} else if (name[0]=="@") {
		system.exec('npm restart ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Restart "+ name.substr(1,name.length-1));
			}
		});

	//
	// [^] Update Handler (npm update [name])
	//
	} else if (name[0]=="^") {
		system.exec('npm update ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Update "+ name.substr(1,name.length-1));
			}
		});

	//
	// [$] Build Handler (npm build [name])
	//
	} else if (name[0]=="$") {
		system.exec('npm build ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Build "+ name.substr(1,name.length-1));
			}
		});
	//
	// [#] Rebuild Handler (npm rebuild [name])
	//
	} else if (name[0]=="#") {
		system.exec('npm rebuild ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/npm ERR/i)) {
				console.log("Error Unable To Rebuild "+ name.substr(1,name.length-1));
			}
		});

	//
	// [%] Test Handler (npm test [name])
	//
	} else if (name[0]=="%") {
		system.exec('node test ' + name.substr(1,name.length-1), function(code, output) {
			if (output.match(/node ERR/i)) {
				console.log("Error Unable To Test "+ name.substr(1,name.length-1));
			}
		});

	//
	// [>] System Command Handler ([name])
	//
	} else if (name[0]==">") {
		system.exec(name.substr(1,name.length-1), function(code, output) {
			console.log(output);
		});

	//
	// [+] Blah Runner Creator ([name])
	//
	} else if (name[0]=="+") {
		fs.mkdirSync('./runners/');
		fs.writeFileSync('./runners/'+name+'.js',"");

	} else {
		if (halb instanceof Array) {
			halb = "";
		} else {
			halb = halb.toString();
			halb = halb.split('","');
			halb = halb.join(',');
			halb = halb.split('", "');
			halb = halb.join(',');
			halb = halb.split("','");
			halb = halb.join(',');
			halb = halb.split("', '");
			halb = halb.join(',');
			halb = halb.replace(/\'/g, '');
			halb = halb.replace(/\"/g, '');
			halb = halb.split(',');
			halb = halb[0];
		}
		try {
			if (halb) {
				runner = require(blahdir +'/runners/'+name+'.js')(halb);
			} else {
				runner = require(blahdir +'/runners/'+name+'.js');
			}
		} catch (errrr) {
			try {
				if (halb) {
					runner = require('../runners/'+name+'.js')(halb);
				} else {
					runner = require('../runners/'+name+'.js');
				}
			} catch (errr) {
				try {
					if (halb) {
						runner = require('./runners/'+name+'.js')(halb);
					} else {
						runner = require('./runners/'+name+'.js');
					}
				} catch (errr) {
					var modname = name;
					try {
						if (halb) {
							runner = require(''+modname+'')(halb);
						} else {
							runner = require(''+modname+'');
						}
					} catch (err) {
						if (~(name + "").indexOf('./')) {
							throw err;
						} else {
							system.exec('npm install ' + name, function(code, output) {
								if (output.match(/npm ERR/i)) {
									console.log("Error or No Package Named "+ name);
								} else {
									x--; // Go Back And Try Again!
								}
							});
						}
					}
				}
			}
		}

		returndata += runner;
	}

//
// End Word For Word Blah Parsing
//
	}

//
// End Line By Line Blah Parsing
//
	}

	return returndata;

}