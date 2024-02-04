import AlbumCard from '../components/AlbumCard';

export default function Albums({ data }) {
  return (
    <>
      <p className="font-semibold text-3xl text-cyan-900 text-center m-10">Albums</p>
      <ul>
        {data.map((album) => (
          <li key={album.id}>
            <AlbumCard album={album} />
          </li>
        ))}
      </ul>
    </>
  );
}
