'use strict';

var script = "";
if (process.argv[0]=="node" | process.argv[0]=="nodejs") {
    script = process.argv.slice(2,process.argv.length).join(" ");
} else {
    script = process.argv.slice(1,process.argv.length).join(" ");
}

if (typeof script === "undefined") {
    console.log("BLAH > Missing Script Location or Input");
    process.exit(1);
}

require('./lib/blah.js')(script);
