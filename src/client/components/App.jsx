import '../app.css';
import Home from '../pages/home';
import P404 from '../pages/p404';
import Posts from '../pages/posts';
import Albums from '../pages/albums';

const App = ({ data }) => {
  if (data.path === 'invalidpath' || Object.keys(data.content).length === 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <P404 />
      </div>
    );
  }

  let page;

  if (data.path.includes('posts')) {
    page = <Posts data={data.content} />;
  } else if (data.path.includes('albums')) {
    page = <Albums data={data.content} />;
  } else {
    page = <Home users={data.content} />;
  }

  return (
    <>
      <header className="bg-slate-500 opacity-75 py-3">
        <nav className="container mx-auto">
          <a href="/" className="font-semibold text-4xl text-slate-900 hover:text-slate-800 px-3">
            Тестове завдання
          </a>
        </nav>
      </header>
      <main className="container mx-auto py-3">
        <div>{page}</div>
      </main>
    </>
  );
};

export default App;
