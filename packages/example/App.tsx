import './src/components/configureRemoteControl';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions, Text } from 'react-native';
import { theme } from './src/design-system/theme/theme';
// import { Home } from './src/pages/Home';
import { Home } from './src/pages/HomePage2';
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
import { ListWithVariableSize } from './src/pages/ListWithVariableSize';
import { AsynchronousContent } from './src/pages/AsynchronousContent';
import * as server from 'expo-http-server';
import { useEffect, useState } from 'react';
import { NetworkInfo } from 'react-native-network-info';
import { WebView } from 'react-native-webview';

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

  const [lastCalled, setLastCalled] = useState<number | undefined>();

  const html = `
	<!DOCTYPE html>
	<html>
		<body style="background-color:powderblue;">
			<h1>expo-http-server</h1>
			<p>You can load HTML!</p>
		</body>
	</html>`;

  const obj = { app: 'expo-http-server', desc: 'You can load JSON!' };

  const [webUrl, setWebUrl] = useState<string | undefined>();

  useEffect(() => {
    server.setup(9666, async (event: server.StatusEvent) => {
      if (event.status === 'ERROR') {
        // there was an error...
      } else {
        // server was STARTED, PAUSED, RESUMED or STOPPED
      }
      console.log(event.status, event.message);

      const ipv4 = await NetworkInfo.getIPV4Address();
      console.log(ipv4);
      const url = `http://${ipv4}:9666/html`;
      setWebUrl(url);
    });
    server.route('/', 'GET', async (request) => {
      console.log('Request', '/', 'GET', request);
      setLastCalled(Date.now());
      return {
        statusCode: 200,
        headers: {
          'Custom-Header': 'Bazinga',
        },
        contentType: 'application/json',
        body: JSON.stringify(obj),
      };
    });
    server.route('/html', 'GET', async (request) => {
      console.log('Request', '/html', 'GET', request);
      setLastCalled(Date.now());
      return {
        statusCode: 200,
        statusDescription: 'OK - CUSTOM STATUS',
        contentType: 'text/html',
        body: html,
      };
    });
    server.start();
    return () => {
      server.stop();
    };
  }, []);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SpatialNavigationDeviceTypeProvider>
          <Container width={width} height={height}>
            {/* <Stack.Navigator
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
            </Stack.Navigator> */}
            <Text style={{ color: 'red' }}>999</Text>
            {webUrl && <WebView source={{ uri: webUrl }}></WebView>}
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
