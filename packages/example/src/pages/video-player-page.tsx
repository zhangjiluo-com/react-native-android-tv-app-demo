/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native';
import { Page } from '../components/Page';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export function VideoPlayerPage(props: {
  route: RouteProp<RootStackParamList, 'VideoPlayerPage'>;
}) {
  return (
    <Page>
      <View>
        <Text style={{ color: 'red' }}>hello</Text>
      </View>
    </Page>
  );
}
