import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

import { eventBus } from '../../../services/event-bus.service.js'

const KEEP_KEY = 'keepDB'

function query() {
    return storageService.query(KEEP_KEY)
}

function createNote(txt, type = 'text', color = utilService.createRandomColor()) {
    return {
        txt,
        type,
        color,
        id: utilService.makeId(),
    }
}
function getNote(id) {
    return query()
        .then(notes => {
            return notes.find(note => note.id === id)
        })
}
function deleteNote(id) {
    // query()
    //     .then(notes => {
    //         var noteIdx = notes.findIndex(note => note.id === id)
    //         notes.splice(noteIdx,1)
    //         storageService.
    //     })
    return storageService.remove(KEEP_KEY, id)
}
function updateNote({ txt, type, color }, id) {
    storageService.put(KEEP_KEY, id)
}
export const keepService = {
    query,
    createNote,
    getNote,
    updateNote,
    deleteNote,
    createNotes
}

function createNotes() {
    var notes = [
        createNote('Hello'),
        createNote('doin ok?')
    ]
    localStorage.setItem(KEEP_KEY, JSON.stringify(notes))
    return notes
}