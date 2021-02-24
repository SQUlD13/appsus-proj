import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage-service.js'

import { eventBus } from '../../../services/event-bus.service.js'

const KEEP_KEY = 'keepDB'

function query() {
    return storageService.query(KEEP_KEY)
}

function createNote({ txt = '', isList = false, color = utilService.createRandomColor(), textColor = '#222' }) {
    console.log('creating note with color', color)
    return {
        content: [{
            txt,
            id: utilService.makeId()
        }],
        isList,
        color,
        textColor
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
function updateNote(note) {
    return storageService.put(KEEP_KEY, note)
}
function addNote(note) {
    note.id = utilService.makeId()
    return storageService.post(KEEP_KEY, note)
}
function addContentListItem(id) {
    return storageService.get(KEEP_KEY, id)
        .then(note => {
            note.content = [...note.content, { txt: '', id: utilService.makeId() }]
            storageService.put(KEEP_KEY, note)
            return Promise.resolve(note)
        })
}
export const keepService = {
    query,
    createNote,
    getNote,
    addNote,
    updateNote,
    deleteNote,
    createNotes,
    addContentListItem,
}

function createNotes() {

    var notes = [
        addNote(createNote({ txt: 'Hello' })),
        addNote(createNote({ txt: 'doin ok ?', type: 'todo' }))
    ]
    return Promise.all(notes).then(ans => {
        console.log("🚀 ~ file: .service.js ~ line 54 ~ Promise.all ~ ans", ans)
        localStorage.setItem(KEEP_KEY, JSON.stringify(ans))
        return Promise.resolve(ans)
    })

}