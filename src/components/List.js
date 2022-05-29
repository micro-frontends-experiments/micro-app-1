const TITLE_STUB = 'Empty title'

function List ({ onClickNote, notes, openedNoteId, onDeleteNote }) {
  return (
    <div className="columns-1">
      <ul className="list-inside ">
        {notes.map(({ title, id }) =>
          <li key={id}
              className={`cursor-pointer font-medium hover:drop-shadow-md text-lg border-neutral-200
                            border-2 rounded-md px-2 py-1 mb-2 flex justify-between items-center
                            ${openedNoteId === id ? 'bg-indigo-300' : ''}`
              }
              onClick={() => onClickNote(id)}>
            {title || TITLE_STUB}
            <button onClick={(e) => {
              e.stopPropagation()
              onDeleteNote(id)
            }}>
              <svg className="h-5 w-5 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                   stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <line x1="4" y1="7" x2="20" y2="7"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
              </svg>
            </button>
          </li>)
        }
      </ul>
    </div>
  )
}

export default List
