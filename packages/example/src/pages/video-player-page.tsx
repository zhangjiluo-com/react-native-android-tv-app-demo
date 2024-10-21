/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native';
import { Page } from '../components/Page';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Video, VideoRef } from 'react-native-video';
import { useEffect, useRef, useState } from 'react';
import { useServer } from '../hooks/use-server';

export function VideoPlayerPage(props: {
  route: RouteProp<RootStackParamList, 'VideoPlayerPage'>;
}) {
  const videoRef = useRef<VideoRef>(null);
  const [testStr, setTestStr] = useState('');
  useServer({
    onPlay() {
      videoRef.current?.resume();
      setTestStr('收到play信号');
    },
    onPause() {
      videoRef.current?.pause();
      setTestStr('收到pause信号');
    },
  });

  useEffect(() => {
    setTimeout(() => {
      // videoRef.current?.resume();
    }, 2e3);
  }, []);

  function onLoad(event: any) {
    videoRef.current?.resume();
  }

  return (
    <Page>
      <View style={{ width: 'auto', flex: 1, backgroundColor: 'blue' }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            width: '100%',
            height: 40,
            opacity: 0.3,
            backgroundColor: 'green',
          }}
        >
          <Text>{testStr}</Text>
        </View>
        <Video
          ref={videoRef}
          paused
          style={{ flex: 1, backgroundColor: 'yellow' }}
          source={{ uri: 'https://av-cdn.ifun.com/cae2c9732f6fa762f5205c9e5170479a.mp4' }}
          controls
          onLoad={onLoad}
        ></Video>
      </View>
    </Page>
  );
}
