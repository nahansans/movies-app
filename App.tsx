import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { StackParamsList } from './src/references/types/navigation'

import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import { createStackNavigator, TransitionPresets, TransitionSpecs } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const Stack = createSharedElementStackNavigator<StackParamsList>({});

const App = () => {
  React.useEffect(() => {
    StatusBar.setHidden(true)
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerShown: false, 
        }}
      >
        <Stack.Screen
          name = 'Home'
          component = {Home}
        />
        <Stack.Screen
          name = 'Detail'
          component = {Detail}
          options = {{
            ...TransitionSpecs.FadeInFromBottomAndroidSpec,
            ...TransitionPresets.FadeFromBottomAndroid
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App