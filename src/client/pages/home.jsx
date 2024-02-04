import { useEffect, useRef, useState } from 'react';
import UserCard from '../components/UserCard';
import { sortObjectsArray } from '../../utils/sort';
import ActionBar from '../components/ActionBar';

export default function Home({ users }) {
  const [usersList, setUsersList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const direction = useRef('');

  useEffect(() => {
    //Тут я поновлюю стейт при натисканні кнопопк "вперед" та "назад" у бравзері
    window.addEventListener('popstate', setStateFromUrlSearchParams);

    setStateFromUrlSearchParams();

    return () => {
      window.removeEventListener('popstate', setStateFromUrlSearchParams);
    };
  }, []);

  function setStateFromUrlSearchParams() {
    const params = new URL(location).searchParams;
    const sortDirection = params.get('sort');
    const search = params.get('search');
    let listedUsers = users;

    if (['asc', 'desc'].includes(sortDirection)) {
      direction.current = sortDirection;
      if (users.length) {
        listedUsers = sortObjectsArray(users, sortDirection);
      }
    }

    if (search) {
      setSearchText(search);
      listedUsers = listedUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      );
    } else {
      setSearchText('');
    }

    setUsersList([...listedUsers]);
  }

  function handleSorBtnClick() {
    let listedUsers = users;
    const url = new URL(location);
    const params = url.searchParams;
    const sortDirection = params.get('sort');

    if (direction.current === 'asc' || sortDirection === 'asc') {
      url.searchParams.set('sort', 'desc');
      direction.current = 'desc';
    } else if (direction.current === 'desc' || sortDirection === 'desc') {
      url.searchParams.set('sort', 'asc');
      direction.current = 'asc';
    } else {
      url.searchParams.set('sort', 'asc');
      direction.current = 'asc';
    }

    history.pushState({}, '', url);

    listedUsers = sortObjectsArray(users, direction.current);

    const search = params.get('search');
    if (search) {
      setSearchText(search);
      listedUsers = listedUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setUsersList([...listedUsers]);
  }

  function handleSearch(e) {
    setSearchText(e.target.value);
    const url = new URL(location);
    const params = url.searchParams;
    const sort = params.get('sort');
    url.searchParams.set('search', e.target.value);

    if (sort) {
      url.searchParams.set('sort', sort);
    }

    history.pushState({}, '', url);

    const sortedUsers = users.filter((user) =>
      user.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    setUsersList([...sortedUsers]);
  }

  return (
    <>
      <ActionBar
        handleSorBtnClick={handleSorBtnClick}
        direction={direction.current}
        handleSearch={handleSearch}
        searchText={searchText}
      />
      <div className="m-3 bg-slate-300 bg-opacity-30 rounded-md">
        <ul className="list-outside">
          {usersList.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
