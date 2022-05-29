function Loader () {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-indigo-600" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
