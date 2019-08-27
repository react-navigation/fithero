/* @flow */

import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import WorkoutList from '../../components/WorkoutList';
import { dateToWorkoutId } from '../../utils/date';
import { getWorkoutById } from '../../database/services/WorkoutService';
import type { NavigationType, RouteType } from '../../types';
import type { WorkoutSchemaType } from '../../database/types';
import DataProvider from '../../components/DataProvider';
import Screen from '../../components/Screen';
import WorkoutComments from '../../components/WorkoutComments';

type NavigationObjectType = {
  navigation: NavigationType,
  route: RouteType<{ day: string, addWorkoutComment: () => void }>,
};

type Props = NavigationObjectType & {};

class WorkoutScreen extends React.Component<Props> {
  componentDidMount() {
    this.props.navigation.setParams({
      addWorkoutComment: this._addWorkoutComment,
    });
  }

  _addWorkoutComment = () => {
    const day = this.props.route.params.day;
    this.props.navigation.navigate('Comments', { day });
  };

  _onAddExercises = () => {
    const day = this.props.route.params.day;
    this.props.navigation.navigate('Exercises', { day });
  };

  _onExercisePress = (exerciseKey: string, customExerciseName?: string) => {
    const day = this.props.route.params.day;
    this.props.navigation.navigate('EditSets', {
      day,
      exerciseKey,
      exerciseName: customExerciseName,
    });
  };

  _renderHeader(workout: ?WorkoutSchemaType, day: string) {
    if (workout && workout.comments) {
      return <WorkoutComments comments={workout.comments} day={day} />;
    }
    return null;
  }

  render() {
    const day = dateToWorkoutId(this.props.route.params.day);

    return (
      <Screen>
        <DataProvider
          query={getWorkoutById}
          args={[day]}
          parse={(data: Array<WorkoutSchemaType>) =>
            data.length > 0 ? data[0] : null
          }
          render={(workout: ?WorkoutSchemaType) => (
            <WorkoutList
              contentContainerStyle={styles.list}
              workout={workout}
              onPressItem={this._onExercisePress}
              ListHeaderComponent={() => this._renderHeader(workout, day)}
              dayString={day}
            />
          )}
        />
        <FAB icon="add" onPress={this._onAddExercises} style={styles.fab} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    paddingTop: 8,
    paddingHorizontal: 4,
    paddingBottom: 56 + 32, // Taking FAB into account
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default WorkoutScreen;
