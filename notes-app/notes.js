const { default: chalk } = require('chalk')
const fs = require('fs')

const getNotes = function() {
    console.log('Your notes...')
    return ''
}

const addNote = function(title, body) {
    const notes = loadNotes()
    // check if dup note is present using filter method
    const duplicateNotes = notes.filter(function(note) {
        return note.title === title
    })

    if(duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bgGreenBright('Note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }

}

const removeNote = function(title) {
    const notes = loadNotes()
    let noteToBeDestroyed = notes.find(note => note.title === title);
    if (noteToBeDestroyed) {
        let newArray = notes.filter(note => note.title !== title);
        saveNotes(newArray)
        console.log(chalk.green.bgGreenBright('Note removed!'))
    } else {
        console.log(chalk.red.inverse('No note of that title'))
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    console.log(dataJSON, 'SAVE NOTES;')
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    // defensive code using try catch
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}