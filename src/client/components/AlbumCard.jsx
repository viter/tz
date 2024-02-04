export default function AlbumCard({ album }) {
  return (
    <div className="m-3 bg-slate-300 bg-opacity-50 rounded-md p-3">
      <p className="text-xl font-bold text-slate-700">{album.name}</p>
      <p>
        Year: <span className="text-teal-900">{album.year}</span>
      </p>
    </div>
  );
}
