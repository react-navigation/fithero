/* @flow */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import i18n from '../utils/i18n';
import HomeScreen from './Home';
import CalendarScreen from './Calendar';
import ExercisesScreen from './Exercises';
import EditSetsScreen from './EditSets';
import WorkoutScreen from './Workouts';
import ExerciseDetailsScreen from './ExerciseDetails';
import CommentsScreen from './Comments';

const Stack = createStackNavigator();

export default function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: i18n.t('calendar') }}
      />
      <Stack.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={{ title: i18n.t('exercises') }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={{ title: '' }}
      />
      <Stack.Screen
        name="EditSets"
        component={EditSetsScreen}
        options={{ title: i18n.t('sets') }}
      />
      <Stack.Screen name="Workouts" component={WorkoutScreen} />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
