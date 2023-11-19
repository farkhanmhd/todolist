const AddNoteForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10 items-center">
      <input
        type="text"
        name="todo-text"
        id="todo-text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
        placeholder="What do u want to do?"
        style={{ transition: ".2s" }}
        required
      />
      <button
        type="submit"
        className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
        style={{ transition: ".3s" }}
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;
