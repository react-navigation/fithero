/* @flow */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '../utils/i18n';
import StatisticsScreen from './Statistics';
import { getDefaultNavigationOptions } from '../utils/navigation';
import withTheme from '../utils/theme/withTheme';
import type { AppThemeType } from '../redux/modules/settings';

const Stack = createStackNavigator();

export default withTheme(function StackScreen({
  theme,
}: {
  theme: AppThemeType,
}) {
  return (
    <Stack.Navigator screenOptions={getDefaultNavigationOptions(theme)}>
      <Stack.Screen
        name="Statistics"
        options={{ title: i18n.t('menu__statistics') }}
        component={StatisticsScreen}
      />
    </Stack.Navigator>
  );
});
