import { useGlobalState, setGlobalState } from './index';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import axios from 'axios';

import MainContainer from './navigation/MainContainer';
import LoginScreen from './navigation/screens/LoginScreen/LoginScreen';
import RegisterScreen from './navigation/screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './navigation/screens/ForgotPasswordScreen/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [localhost] = useGlobalState("localhost");
  const [user] = useGlobalState("user");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ animation: 'none', contentStyle: { backgroundColor: '#FFFFFF' } }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={MainContainer}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;