const TITLE_PLACEHOLDER = 'Empty title'
const TEXT_PLACEHOLDER = 'Empty text'

function Editor ({ openedNote, setOpenedNote }) {
  const onChangeText = (event) => setOpenedNote((note) => ({ ...note, text: event.target.value }))
  const onChangeTitle = (event) => setOpenedNote((note) => ({ ...note, title: event.target.value }))

  return (
    <div className="column-1 h-full">
      <input
        value={openedNote.title}
        className="w-full border-2 px-2 py-1 mb-2 rounded-md border-neutral-200 font-medium text-lg"
        onChange={onChangeTitle}
        placeholder={TITLE_PLACEHOLDER}
      />
      <textarea
        value={openedNote.text}
        className=
          "w-full border-2 min-h-full resize-none outline-0
          px-2 py-1 rounded-md border-neutral-200"
        onChange={onChangeText}
        placeholder={TEXT_PLACEHOLDER}
      />
    </div>
  )
}

export default Editor
