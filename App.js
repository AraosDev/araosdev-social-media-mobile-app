import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import AppStyle from './common/styles/styleSheets';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLogin from './screens/login';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import DashBoard from './screens/DashBoard';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from './common/styles/colors';
import { Feather } from '@expo/vector-icons';
import { setUserDetails } from './store/slices/loginSlice';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

function Root({ isUserLoggedIn, setAppReady, setUserLoggedIn }) {

  const { userDetails } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    async function isTokenPresent() {
      const getUser = await AsyncStorage.getItem('user');
      const isTokenPresent = !!getUser && JSON.parse(getUser)?.token;
      const isUserLogged = Object.keys(userDetails).length;
      if (getUser && !isUserLogged) dispatch(setUserDetails(JSON.parse(getUser)?.user));
      if (isTokenPresent || isUserLogged) setUserLoggedIn(true);
      else setUserLoggedIn(false);
      setAppReady(true);
    }

    isTokenPresent();
  }, [userDetails, isUserLoggedIn]);

  return (
    <Stack.Navigator>
      {!isUserLoggedIn
        ? (
          <Stack.Screen
            name='appLogin'
            component={AppLogin}
            options={{ headerShown: false }}
          />
        )
        : (
          <Stack.Screen
            name='dashboard'
            component={DashBoard}
            options={{
              headerShown: false,
              headerRight: ({ tintColor }) => (
                <Feather
                  style={styles.iconStyle}
                  name="message-circle"
                  size={24}
                  color={tintColor}
                />
              )
            }}
          />
        )
      }
    </Stack.Navigator>
  );
}

function App() {
  const [isAppReady, setAppReady] = useState(false);
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);


  async function onLayoutView() {
    if (isAppReady) await SplashScreen.hideAsync();
  }


  return (
    <View style={AppStyle.fullFlex} onLayout={onLayoutView}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Root setAppReady={setAppReady} isUserLoggedIn={isUserLoggedIn} setUserLoggedIn={setUserLoggedIn} />
        </NavigationContainer>
      </Provider>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  iconStyle: {
    paddingHorizontal: 10
  }
});
