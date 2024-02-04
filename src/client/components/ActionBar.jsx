import SearchField from './SearchField';
import SortBtn from './SortBtn';

export default function ActionBar({ handleSorBtnClick, direction, handleSearch, searchText }) {
  return (
    <div className="m-3 bg-slate-300 bg-opacity-75 rounded-md p-3 px-[18px] flex justify-between">
      <SortBtn handleSorBtnClick={handleSorBtnClick} direction={direction} />
      <SearchField handleSearch={handleSearch} searchText={searchText} />
    </div>
  );
}
