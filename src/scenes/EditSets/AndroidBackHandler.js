/* @flow */

import * as React from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';

type Props = {
  onBackPress: () => boolean,
  children?: React.Node,
};

export default function AndroidBackhandler({ onBackPress, children }: Props) {
  const onBackPressRef = React.useRef(onBackPress);

  React.useEffect(() => {
    onBackPressRef.current = onBackPress;
  });

  const hardwareBackHandler = React.useCallback(() => {
    const listener = () => {
      return onBackPressRef.current && onBackPressRef.current();
    };

    BackHandler.addEventListener('hardwareBackPress', listener);

    return () => BackHandler.removeEventListener('hardwareBackPress', listener);
  }, []);

  useFocusEffect(hardwareBackHandler);

  return children !== undefined ? children : null;
}
