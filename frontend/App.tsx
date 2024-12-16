import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import TimerScreen from './screens/TimerScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ホーム' }} />
            <Stack.Screen name="List" component={ListScreen} options={{ title: 'タイマー一覧' }} />
            <Stack.Screen name="Create" component={CreateScreen} options={{ title: '新規作成' }} />
            <Stack.Screen name="Edit" component={EditScreen} options={{ title: '編集' }} />
            <Stack.Screen name="TimerScreen" component={TimerScreen} options={{ title: 'タイマー' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
