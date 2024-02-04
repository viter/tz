export default function PostCard({ post }) {
  return (
    <div className="m-3 bg-slate-300 bg-opacity-50 rounded-md p-3">
      <p>{post.body}</p>
    </div>
  );
}
