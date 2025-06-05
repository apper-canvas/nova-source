import notesData from '../mockData/note.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let notes = [...notesData]

const noteService = {
  async getAll() {
    await delay(200)
    return [...notes]
  },

  async getById(id) {
    await delay(150)
    const note = notes.find(note => note.id === id)
    if (!note) {
      throw new Error('Note not found')
    }
    return { ...note }
  },

  async create(noteData) {
    await delay(300)
    const newNote = {
      ...noteData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      isPinned: false
    }
    notes.unshift(newNote)
    return { ...newNote }
  },

  async update(id, noteData) {
    await delay(250)
    const index = notes.findIndex(note => note.id === id)
    if (index === -1) {
      throw new Error('Note not found')
    }
    notes[index] = { ...notes[index], ...noteData }
    return { ...notes[index] }
  },

  async delete(id) {
    await delay(200)
    const index = notes.findIndex(note => note.id === id)
    if (index === -1) {
      throw new Error('Note not found')
    }
    const deletedNote = notes.splice(index, 1)[0]
    return { ...deletedNote }
  }
}

export default noteService