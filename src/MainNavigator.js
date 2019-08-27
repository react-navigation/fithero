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
import HeaderButton from './components/HeaderButton';
import HeaderIconButton from './components/HeaderIconButton';
import {getDefaultNavigationOptions} from "./utils/navigation";
import withTheme from "./utils/theme/withTheme";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default withTheme(function App({ theme }) {
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
                options={{
                  tabBarIcon: tabBarIcon('home'),
                  title: i18n.t('menu__home'),
                }}
                component={HomeNavigator}
              />
              <Tab.Screen
                name="Statistics"
                options={{
                  tabBarIcon: tabBarIcon('show-chart'),
                  title: i18n.t('menu__statistics'),
                }}
                component={StatisticsNavigator}
              />
              <Tab.Screen
                name="Settings"
                options={{
                  tabBarIcon: tabBarIcon('settings'),
                  title: i18n.t('menu__settings'),
                }}
                component={SettingsNavigator}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="EditExercise"
          component={EditExerciseScreen}
          options={({ route, navigation }) => {
            const { params = {} } = route;
            return {
              ...getDefaultNavigationOptions(theme),
              title: params.id
                ? i18n.t('edit_exercise')
                : i18n.t('new_exercise'),
              headerLeft: () => (
                <HeaderIconButton
                  icon="close"
                  onPress={() => navigation.goBack()}
                />
              ),
              headerRight: () => (
                <HeaderButton onPress={params.onSave}>
                  {i18n.t('save')}
                </HeaderButton>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
})
