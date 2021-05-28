const shell = require('shelljs');

shell.rm('-rf', 'lib', 'es');
shell.exec('father-build build');
