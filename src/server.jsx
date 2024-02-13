const ReactDOMServer = require('react-dom/server');
const App = require('./client/components/App');
const React = require('react');
const fs = require('fs');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const app = express();
//const PORT = process.env.PORT;

//app.use('/static', express.static(path.resolve('dist')));

const renderReactApp = async (req, res) => {
  const data = await getData(req);

  const reactHtml = ReactDOMServer.renderToString(<App data={data} />);
  const indexHtml = await fs.promises.readFile(`${path.resolve('dist')}/index.html`, 'utf-8');
  const renderedApp = indexHtml.replace(
    '<div id="root"></div>',
    `<script>window.__DATA__=${JSON.stringify(data)}</script>
    <div id="root">${reactHtml}</div>`,
  );
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).send(renderedApp);
};

const unknownHandler = async (req, res) => {
  const data = {
    path: 'invalidpath',
  };
  const reactHtml = ReactDOMServer.renderToString(<App data={data} />);
  const indexHtml = await fs.promises.readFile(`${path.resolve('dist')}/index.html`, 'utf-8');
  const renderedApp = indexHtml.replace(
    '<div id="root"></div>',
    `<script>window.__DATA__=${JSON.stringify(data)}</script>
    <div id="root">${reactHtml}</div>`,
  );
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.status(200).send(renderedApp);
};

async function getData(req) {
  let path = 'invalidpath';
  if (req.path === '/') path = '/users';
  if (req.path === '/posts') path = `/posts?userId=${req.query.userId}`;
  if (req.path === '/albums') path = `/albums?userId=${req.query.userId}`;
  try {
    const response = await fetch(`https://my-json-server.typicode.com/viter/mockdb${path}`);
    const responseData = await response.json();
    const data = {
      content: Object.keys(responseData).length ? responseData : {},
      path,
    };
    return data;
  } catch (err) {
    return {};
  }
}

app.get('/api', renderReactApp);
app.get('/api/posts', renderReactApp);
app.get('/api/albums', renderReactApp);
app.get('*', unknownHandler);
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

module.exports = app;
