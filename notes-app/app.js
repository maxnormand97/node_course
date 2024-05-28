// const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')

// Set yargs version
yargs.version('1.1.0');
// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body)
  }
});

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title: {
          describe: 'note title',
          demandOption: true,
          type: 'string'
      }
    },
    handler: function(argv) {
      notes.removeNote(argv.title)
    }
});

// List command
yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler: function() {
      console.log('Here you are sir');
    }
});

// Read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    handler: function() {
      console.log('your not is like dis');
    }
});

console.log(process.argv);
console.log(yargs.argv);
