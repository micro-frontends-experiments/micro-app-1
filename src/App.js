import './App.css'
import List from './components/List'
import Editor from './components/Editor'
import { useEffect, useState } from 'react'
import { deleteNote, getNotes, putNote } from './api/endpoints'
import useDebouncedValue from './hooks/useDebouncedValue'
import isDeepEqual from 'lodash.isequal'

function App ({ userId }) {
  console.log('MicroApp1 has rendered')

  const [notes, setNotes] = useState([])
  const [openedNote, setOpenedNote] = useState(null)

  const debouncedOpenedNote = useDebouncedValue(openedNote, 700)

  useEffect(() => {
    const prevOpenedNoteState = notes.find(n => n.id === openedNote?.id)
    if (debouncedOpenedNote && !isDeepEqual(prevOpenedNoteState, debouncedOpenedNote)) {
      putNote(userId, debouncedOpenedNote)
        .then((data) => setNotes(notes => notes.map(n => n.id === data?.id ? data : n)))
    }
  }, [debouncedOpenedNote])

  useEffect(() => {
    if (userId) {
      getNotes(userId)
        .then((data) => {
          setNotes(data)
        })
    }
  }, [userId])

  const onClickNote = (id) => setOpenedNote(notes.find(note => note.id === id))

  const onDeleteNote = (noteId) => {
    deleteNote(userId, noteId)
      .then(({ success }) => {
        if (success) {
          setNotes(notes => notes.filter(n => n.id !== noteId))
          if (openedNote.id === noteId) {
            setOpenedNote(null)
          }
        }
      })
  }

  return (
    <div className="flex flex-row mx-auto h-screen px-4 py-4 justify-around">
      <div className="basis-[48%]">
        <List onClickNote={onClickNote} notes={notes} openedNoteId={openedNote?.id} onDeleteNote={onDeleteNote}/>
      </div>
      <div className="basis-[48%]">
        {openedNote && <Editor openedNote={openedNote} setOpenedNote={setOpenedNote} userId={userId} />}
      </div>
    </div>
  )
}

export default App
