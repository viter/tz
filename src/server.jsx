import ReactDOMServer from 'react-dom/server';
import App from './client/components/App';
import React from 'react';
import fs from 'fs';
import path from 'path';
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT;

app.use('/static', express.static(path.resolve('dist')));

const renderReactApp = async (req, res) => {
  const data = await getData(req);

  const reactHtml = ReactDOMServer.renderToString(<App data={data} />);
  const indexHtml = await fs.promises.readFile(`${path.resolve('dist')}/index.html`, 'utf-8');
  const renderedApp = indexHtml.replace(
    '<div id="root"></div>',
    `<script>window.__DATA__=${JSON.stringify(data)}</script>
    <div id="root">${reactHtml}</div>`,
  );

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

app.get('/', renderReactApp);
app.get('/posts', renderReactApp);
app.get('/albums', renderReactApp);
app.get('*', unknownHandler);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
