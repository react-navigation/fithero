/* @flow */

import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';

import withTheme from '../utils/theme/withTheme';
import type { NavigationType } from '../types';
import type { ThemeType } from '../utils/theme/withTheme';

type Props = {
  comments: string,
  day: string,
  theme: ThemeType,
};

function WorkoutComments({ theme, comments, day }: Props) {
  const navigation: NavigationType = useNavigation();
  const { colors } = theme;

  return (
    <Card
      style={styles.comments}
      onPress={() => navigation.navigate('Comments', { day })}
    >
      <Card.Content>
        <Text style={{ color: colors.secondaryText }}>{comments}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  comments: {
    marginHorizontal: 8,
    marginVertical: 4,
  },
});

export default withTheme(WorkoutComments);
