import { route, start, setup, stop, Status } from 'expo-http-server';
import mitt, { Emitter } from 'mitt';
import { useEffect } from 'react';
import { NetworkInfo } from 'react-native-network-info';

const html = (title: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>${title}</h1>
    <form action="/play" method="post">
      <button type="submit">发送播放信号</button>
    </form>
    <form action="/pause" method="post">
      <button type="submit">发送暂停信号</button>
    </form>
  </body>
</html>`;

let serverClient: {
  stop(): void;
  status: Status;
  emitter: Emitter<{
    play: undefined;
    pause: undefined;
  }>;
  port: number;
  url: string;
};

function startServer() {
  if (!serverClient) {
    serverClient = {
      stop,
      status: 'STOPPED',
      emitter: mitt(),
      port: 9666,
      url: '',
    };
  }
  setup(serverClient.port, async function (params) {
    serverClient.status = params.status;
    const ipv4 = await NetworkInfo.getIPV4Address();
    serverClient.url = `http://${ipv4}:${serverClient.port}/`;
  });

  route('/', 'GET', async function () {
    return {
      statusCode: 200,
      contentType: 'text/html',
      body: html(''),
    };
  });
  route('/api/play', 'POST', async () => {
    serverClient.emitter.emit('play');
    return {
      statusCode: 200,
      contentType: 'text/html',
      body: html('play success'),
    };
  });
  route('/api/pause', 'POST', async () => {
    serverClient.emitter.emit('pause');
    return {
      statusCode: 200,
      contentType: 'text/html',
      body: html('pause success'),
    };
  });

  start();
  return serverClient;
}

export function useServer(listen?: { onPlay?(): void; onPause?(): void }) {
  const server = startServer();
  const onPlay = listen?.onPlay;
  const onPause = listen?.onPause;

  useEffect(() => {
    onPlay && server.emitter.on('play', onPlay);
    onPause && server.emitter.on('pause', onPause);

    return () => {
      onPlay && server.emitter.off('play', onPlay);
      onPause && server.emitter.on('pause', onPause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listen]);
}
