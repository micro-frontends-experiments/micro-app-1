import './App.css'
import List from './components/List'
import Editor from './components/Editor'
import { useEffect, useState } from 'react'
import { addNote, deleteNote, getNotes, putNote } from './api/endpoints'
import useDebouncedValue from './hooks/useDebouncedValue'
import isDeepEqual from 'lodash.isequal'
import Loader from './components/Loader'

function App ({ userId }) {
  console.log('MicroApp1 has rendered')

  const [notes, setNotes] = useState([])
  const [openedNote, setOpenedNote] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const debouncedOpenedNote = useDebouncedValue(openedNote, 700)

  const addNewNote = () => {
    setIsLoading(true)
    addNote(userId)
      .then(data => {
        setNotes(notes => [{ id: data.id }, ...notes])
        setOpenedNote({ text: '', title: '', id: data.id })
        setIsLoading(false)
      })
  }

  useEffect(() => {
    window.addEventListener('addButtonClick', addNewNote)

    return () => {
      window.removeEventListener('addButtonClick', addNewNote)
    }
  }, [addNewNote])

  useEffect(() => {
    const prevOpenedNoteState = notes.find(n => n.id === openedNote?.id)
    if (debouncedOpenedNote && !isDeepEqual(prevOpenedNoteState, debouncedOpenedNote)) {
      setNotes(notes => notes.map(n => n.id === debouncedOpenedNote.id ? debouncedOpenedNote : n))
      putNote(userId, debouncedOpenedNote)
        .then((data) => setNotes(notes => notes.map(n => n.id === data?.id ? data : n)))
    }
  }, [debouncedOpenedNote])

  useEffect(() => {
    if (userId) {
      getNotes(userId)
        .then(({ notes }) => {
          setNotes(notes)
        })
    }
  }, [userId])

  const onClickNote = (id) => setOpenedNote(notes.find(note => note.id === id))

  const onDeleteNote = (noteId) => {
    setNotes(notes => notes.filter(n => n.id !== noteId))
    if (openedNote?.id === noteId) {
      setOpenedNote(null)
    }
    deleteNote(userId, noteId)
  }

  if (isLoading) {
    return <Loader/>
  }

  return (
    <div className="flex flex-row mx-auto min-h-full px-4 py-4 justify-around">
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
