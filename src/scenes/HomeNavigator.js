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
import { getDefaultNavigationOptions } from '../utils/navigation';
import { getDatePrettyFormat, getToday } from '../utils/date';
import { View, Platform, StyleSheet } from 'react-native';
import HeaderIconButton from '../components/HeaderIconButton';
import HeaderOverflowButton from '../components/HeaderOverflowButton';
import { isCustomExercise } from '../database/services/ExerciseService';
import HeaderButton from '../components/HeaderButton';
import { getExerciseName } from '../utils/exercises';

const Stack = createStackNavigator();

export default function StackScreen({ theme }) {
  return (
    <Stack.Navigator screenOptions={getDefaultNavigationOptions(theme)}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ route, navigation }) => {
          const navigateToCalendar = () => {
            navigation.navigate('Calendar', {
              today: getToday().format('YYYY-MM-DD'),
            });
          };
          const { params = {} } = route;
          return {
            headerRight: () => (
              <View style={styles.header}>
                <HeaderIconButton
                  icon="date-range"
                  onPress={navigateToCalendar}
                />
                <HeaderOverflowButton
                  actions={[i18n.t('comment_workout')]}
                  onPress={params.addWorkoutComment}
                  last
                />
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={({ route }) => {
          const { params = {} } = route;
          return {
            title: i18n.t('calendar'),
            headerRight: () => (
              <HeaderIconButton
                onPress={() => {
                  if (params.scrollToToday) {
                    params.scrollToToday();
                  }
                }}
                icon="today"
                last
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Exercises"
        component={ExercisesScreen}
        options={({ navigation }) => {
          return {
            ...Platform.select({
              android: { header: null },
            }),
            title: i18n.t('exercises'),
            headerRight: () => (
              <HeaderIconButton
                onPress={() => navigation.navigate('EditExercise')}
                icon="add"
                last
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetailsScreen}
        options={({ route }) => {
          const { params = {} } = route;
          return {
            title: '',
            headerRight: () =>
              isCustomExercise(params.id) ? (
                <View style={styles.header}>
                  <HeaderIconButton
                    onPress={() => params.editAction()}
                    icon="edit"
                  />
                  <HeaderOverflowButton
                    onPress={i => params.deleteAction(i)}
                    actions={[i18n.t('delete')]}
                    destructiveButtonIndex={1}
                    last
                  />
                </View>
              ) : (
                undefined
              ),
          };
        }}
      />
      <Stack.Screen
        name="EditSets"
        component={EditSetsScreen}
        options={({ route }) => {
          const { params = {} } = route;
          return {
            title: i18n.t('sets'),
            headerTitle: Platform.select({
              android: getExerciseName(
                params.params.exerciseKey,
                params.params.exerciseName
              ),
              ios: '',
            }),
          };
        }}
      />
      <Stack.Screen
        name="Workouts"
        component={WorkoutScreen}
        options={({ route }) => {
          const { params = {} } = route;
          return {
            title: getDatePrettyFormat(params.day, getToday(), true),
            headerRight: () => (
              <HeaderOverflowButton
                actions={[i18n.t('comment_workout')]}
                onPress={params.addWorkoutComment}
                last
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ route }) => {
          const { params = {} } = route;
          return {
            title: getDatePrettyFormat(params.day, getToday(), true),
            headerRight: () => (
              <HeaderButton onPress={params.saveComments}>
                {i18n.t('save')}
              </HeaderButton>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
});
