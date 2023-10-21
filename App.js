import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import AppStyle from './common/styles/styleSheets';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLogin from './screens/login';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TimeLine from './screens/Timeline';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    async function isTokenPresent() {
      const getToken = await AsyncStorage.getItem('token');
      const isTokenPresent = !!getToken && JSON.parse(getToken)?.token;

      if (isTokenPresent) setUserLoggedIn(true);
      setAppReady(true);
    }

    isTokenPresent();
  }, []);

  async function onLayoutView() {
    if (isAppReady) await SplashScreen.hideAsync();
  }


  return (
    <View style={AppStyle.fullFlex} onLayout={onLayoutView}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!isUserLoggedIn ?
              <Stack.Screen name='appLogin' component={AppLogin} options={{ headerShown: false }} />
              : <Stack.Screen name='timeline' component={TimeLine} options={{ headerShown: false }} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </View>
  );
}

export default App;
