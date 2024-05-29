const { default: chalk } = require('chalk')
const fs = require('fs')

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if(foundNote) {
        console.log(chalk.green.bgBlack.inverse(`Found title of ${foundNote.title}`))
    } else {
        console.log(chalk.red.bgBlack('No note of this title'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bgCyanBright('Your Notes'))
    notes.forEach(element => {
        console.log(element.title)
    });
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // performance isn't great using filter, we can stop the process when we find a dup
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote) {
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

const removeNote = (title) => {
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

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
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
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}