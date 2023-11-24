const AddNoteForm = ({ onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-7 w-full "
    >
      <input
        type="text"
        name="todo-text"
        id="todo-text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-300 text-center shadow-md"
        placeholder="What do u want to do?"
        required
      />
      <button
        type="submit"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition duration-300 shadow-md"
      >
        Add To List
      </button>
    </form>
  );
};

export default AddNoteForm;
