#B-L-A-H
![enter image description here](https://raw.githubusercontent.com/active9/b-l-a-h/master/blah.png)

  Basic Language Automation Helper.

```js
var blah = require('b-l-a-h');
console.log(blah('Hello World'));
```

## Installation

```bash
$ npm install b-l-a-h
```

## Features

  * Dynamic Package Management
  * High Performance Basic Language Automation
  * Executable for running blah files quickly

## Quick Start

  The quickest way to get started with blah is to utilize the executable:

  Install the blah executable:

```bash
$ npm install -g b-l-a-h
```

  Run the command line:

```bash
$ blah
```

## Philosophy

  The blah philosophy is to provide a lightweight robust basic language automation helper, making
  it a great solution for bash like script runners.

  Blah utilizes runners to perform javascript tasks or falls back to npmjs packages.

## Examples

  To view the examples, clone the Blah repo and install the dependencies:

```bash
$ git clone git://github.com/active9/b-l-a-h.git
$ cd b-l-a-h
$ npm install
```

  Then run whichever example you want:

```bash
$ node index.js examples/helloworld.blah
```

## Reference

  Blah uses triggers to alter an object runner. By default the trigger is set for install/run.

  Blah uses the following trigger syntax:

  - [-] Uninstall Handler
  - [~] Start Handler
  - [!] Stop Handler
  - [@] Restart Handler
  - [^] Update Handler
  - [$] Build Handler
  - [#] Rebuild Handler
  - [%] Test Handler
  - [>] System Command Handler
  - [+] BLAH RUNNER CREATOR
  - [] Install Handler (Default No Trigger)

## Tutorials

###runners.blah
  This tutorial teaches the use of blah runners. A runner is simply a script located in the runners folder of your .blah file.
  
  Lets make a folder called test.
```bash
mkdir test
```

  Now cd into that folder and create a folder named runners.
```bash
cd test
mkdir runners
```

Within the runners folder lets create a new file called hello.js with the following contents:
```js
module.exports = function() {
	return "Hello";
}
```

Now go back to the test folder and create a file test.blah with the following contents.
```js
hello
```


Now run the following command:
```bash
blah test.blah
```

But you aren't done yet. Runners only operate if the file exists within the runners sub folder. If a runner is not found for the specific name the npmjs registry will be used instead. So now lets append a popular package to be installed.

Editing test.blah we now have the following:
```js
hello rpid
```

This example would try to run the runner hello and then install the package rpid from npmjs.com

Lets alter this example a bit more and uninstall rpid. Editing test.blah we now have the following:
```js
hello -rpid
```

Now if you ran this example rpid would uninstall from the node_modules folder. Triggers can be used before any package runner name. 

###expressupdate.blah
  Creating a blah update script is simple. Let's create a script that updates express. Save the below text into the file expressupdate.blah
```js
^express
```
Now run the following within the same folder as expressupdate.blah

```bash
blah expressupdate.blah
```

###more examples
  More examples an be found in the examples folder on github.
  
## License

  MIT

