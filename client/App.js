import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Alert} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignUpPage from './Screens/SignUp'
import LoginPage from './Screens/Login';
import EventListingPage from './Screens/Home';
import CalendarPage from './Screens/calendar';
import EventPage from './Screens/event';
import AdminMain from './Screens/adminMain';

const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [isLoaded] = useFonts({
    "Cochin": require("./assets/fonts/cochin.otf")
  });

  useEffect(() => {
    async function prepare() {
      try {

        setTimeout(() => {
          return null
        }, 5000);

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!isLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <stack.Navigator initialRouteName = "login" screenOptions={{headerShown: false}}  >
          <stack.Screen name="Login" component={LoginPage} />
          <stack.Screen name="SignUp" component={SignUpPage} />
          <stack.Screen name="Home" component={EventListingPage} />
          <stack.Screen name = "calendar" component={CalendarPage}/>
          <stack.Screen name = "event" component={EventPage} />
          <stack.Screen name = 'admin' component={AdminMain} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Authenitcationpage: {
    backgroundColor: 'white',
  }
});
