import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

import { eventBus } from '../../../services/event-bus.service.js'

const KEEP_KEY = 'keepDB'

function query() {
    return storageService.query(KEEP_KEY)
}

function createNote({ txt = '', type = 'text', color = utilService.createRandomColor() }) {
    console.log('creating note with color', color)
    return {
        txt,
        type,
        color,
    }
}
function getNote(id) {
    return query()
        .then(notes => {
            return notes.find(note => note.id === id)
        })
}
function deleteNote(id) {
    return storageService.remove(KEEP_KEY, id)
}
function updateNote({ txt, type, color }, id) {
    storageService.put(KEEP_KEY, id)
}
function addNote(note) {
    note.id = utilService.makeId()
    return storageService.post(KEEP_KEY, note)
}

export const keepService = {
    query,
    createNote,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    createNotes
}

function createNotes() {

    var notes = [
        addNote(createNote('Hello')),
        addNote(createNote({ txt: 'doin ok ?', type: 'todo' }))
    ]
    return Promise.all(notes).then(ans => {
        console.log("🚀 ~ file: keep.service.js ~ line 54 ~ Promise.all ~ ans", ans)
        localStorage.setItem(KEEP_KEY, JSON.stringify(ans))
        return Promise.resolve(ans)
    })

}