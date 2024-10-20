import './src/components/configureRemoteControl';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions, Text, View } from 'react-native';
import { theme } from './src/design-system/theme/theme';
import { Home } from './src/pages/Home';
// import { Home } from './src/pages/HomePage2';
import { Home as Home3 } from './src/pages/HomePage3';
import { ProgramGridPage } from './src/pages/ProgramGridPage';
import { Menu } from './src/components/Menu/Menu';
import { MenuProvider } from './src/components/Menu/MenuContext';
import styled from '@emotion/native';
import { useFonts } from './src/hooks/useFonts';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProgramInfo } from './src/modules/program/domain/programInfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProgramDetail } from './src/pages/ProgramDetail';
import { NonVirtualizedGridPage } from './src/pages/NonVirtualizedGridPage';
import { GridWithLongNodesPage } from './src/pages/GridWithLongNodesPage';
import { useTVPanEvent } from './src/components/PanEvent/useTVPanEvent';
import { SpatialNavigationDeviceTypeProvider } from '../lib/src/spatial-navigation/context/DeviceContext';
import { VideoPlayerPage } from './src/pages/video-player-page';
// import { ListWithVariableSize } from './src/pages/ListWithVariableSize';
// import { AsynchronousContent } from './src/pages/AsynchronousContent';
// import * as server from 'expo-http-server';
// import { useEffect, useState } from 'react';
// import { NetworkInfo } from 'react-native-network-info';
// import { WebView } from 'react-native-webview';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: undefined;
  ProgramGridPage: undefined;
  NonVirtualizedGridPage: undefined;
  GridWithLongNodesPage: undefined;
  ListWithVariableSize: undefined;
  AsynchronousContent: undefined;
};

export type RootStackParamList = {
  TabNavigator: undefined;
  ProgramDetail: { programInfo: ProgramInfo };
  VideoPlayerPage: { videoId?: string | number };
};

const RenderMenu = (props: BottomTabBarProps) => <Menu {...props} />;

const TabNavigator = () => {
  return (
    <MenuProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
        tabBar={RenderMenu}
        sceneContainerStyle={{
          marginLeft: theme.sizes.menu.closed,
          backgroundColor: theme.colors.background.main,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="ProgramGridPage" component={Home3} />
        {/* <Tab.Screen name="NonVirtualizedGridPage" component={NonVirtualizedGridPage} />
        <Tab.Screen name="GridWithLongNodesPage" component={GridWithLongNodesPage} />
        <Tab.Screen name="ListWithVariableSize" component={ListWithVariableSize} />
        <Tab.Screen name="AsynchronousContent" component={AsynchronousContent} /> */}
      </Tab.Navigator>
    </MenuProvider>
  );
};

function App() {
  useTVPanEvent();
  const { height, width } = useWindowDimensions();
  const areFontsLoaded = useFonts();

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SpatialNavigationDeviceTypeProvider>
          <Container width={width} height={height}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.colors.background.main,
                },
              }}
              initialRouteName="TabNavigator"
            >
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen name="ProgramDetail" component={ProgramDetail} />
              <Stack.Screen name="VideoPlayerPage" component={VideoPlayerPage} />
            </Stack.Navigator>
            {/* <View>
              <Text style={{ color: 'red' }}>
                {webUrl}
                {'\n'}
              </Text>
              <Text style={{ color: 'red' }}>{lastCalled2}</Text>
            </View>
            {webUrl && <WebView source={{ uri: webUrl }}></WebView>} */}
          </Container>
        </SpatialNavigationDeviceTypeProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;

const Container = styled.View<{ width: number; height: number }>(({ width, height }) => ({
  width,
  height,
  flexDirection: 'row-reverse',
  backgroundColor: theme.colors.background.main,
}));
