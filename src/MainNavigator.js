/* @flow */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/core';
import { useBackButton } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import tabBarIcon from './components/tabBarIcon';
import i18n from './utils/i18n';
import HomeNavigator from './scenes/HomeNavigator';
import SettingsNavigator from './scenes/SettingsNavigator';
import StatisticsNavigator from './scenes/StatisticsNavigator';
import EditExerciseScreen from './scenes/EditExercise/EditExerciseScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const ref = React.useRef();

  useBackButton(ref);

  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator mode="modal" screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Main" options={{ header: null }}>
          {() => (
            <Tab.Navigator
              initialRouteName="Home"
              shifting={false}
              keyboardHidesNavigationBar={false}
            >
              <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                  tabBarIcon: tabBarIcon('home'),
                  title: i18n.t('menu__home'),
                }}
              />
              <Tab.Screen
                name="Statistics"
                component={StatisticsNavigator}
                options={{
                  tabBarIcon: tabBarIcon('show-chart'),
                  title: i18n.t('menu__statistics'),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsNavigator}
                options={{
                  tabBarIcon: tabBarIcon('settings'),
                  title: i18n.t('menu__settings'),
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="EditExercise" component={EditExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
