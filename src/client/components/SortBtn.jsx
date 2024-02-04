export default function SortBtn({ handleSorBtnClick, direction }) {
  return (
    <button
      className="bg-slate-600 hover:bg-slate-500 active:bg-fuchsia-900 text-white text-sm px-4 py-1 rounded-sm min-w-24"
      onClick={handleSorBtnClick}
    >
      sort
      {direction === 'asc' ? (
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          className="inline-block ml-3"
        >
          <path d="M2 16a2 2 0 01-2-2V2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L7.5 5.707V11.5a.5.5 0 001 0z" />
        </svg>
      ) : direction === 'desc' ? (
        <svg
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          className="inline-block ml-3"
        >
          <path d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5a.5.5 0 011 0z" />
        </svg>
      ) : null}
    </button>
  );
}
