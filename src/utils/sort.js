export function sortObjectsArray(array, direction) {
  return array.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return direction === 'asc' ? -1 : 1;
    }
    if (nameA > nameB) {
      return direction === 'asc' ? 1 : -1;
    }

    return 0;
  });
}
