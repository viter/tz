import PostCard from '../components/PostCard';

export default function Posts({ data }) {
  return (
    <>
      <p className="font-semibold text-3xl text-cyan-900 text-center m-10">Posts</p>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
