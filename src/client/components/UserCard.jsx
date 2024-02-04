export default function UserCard({ user }) {
  return (
    <div className="m-3 my-4 p-2">
      <p className="font-bold text-slate-700 mb-3">{user.name}</p>
      <a href={`/posts?userId=${user.id}`} className="text-cyan-900 hover:text-cyan-700">
        posts
      </a>
      <span className="text-slate-600 mx-3">|</span>
      <a href={`/albums?userId=${user.id}`} className="text-cyan-900 hover:text-cyan-700">
        albums
      </a>
    </div>
  );
}
