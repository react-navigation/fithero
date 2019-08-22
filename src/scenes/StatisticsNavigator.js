/* @flow */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '../utils/i18n';
import StatisticsScreen from './Statistics';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Statistics"
        options={{ title: i18n.t('menu__statistics') }}
        component={StatisticsScreen}
      />
    </Stack.Navigator>
  );
}
