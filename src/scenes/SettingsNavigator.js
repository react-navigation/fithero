/* @flow */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '../utils/i18n';
import SettingsScreen from './Settings';
import { getDefaultNavigationOptions } from '../utils/navigation';

const Stack = createStackNavigator();

export default function StackScreen({ theme }) {
  return (
    <Stack.Navigator screenOptions={getDefaultNavigationOptions(theme)}>
      <Stack.Screen
        name="Settings"
        options={{ title: i18n.t('menu__settings') }}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}
