import useCodePush from './useCodePush';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {Progress} from './Progress';
import Text from '../Text';
import {theme} from '@theme';
import Block from '@components/Block';
const ModalCodePush = () => {
  const {restartApp, isVisible, isProcess, percentUpdated, messenger} =
    useCodePush();
  const {width} = useWindowDimensions();

  if (isVisible) {
    return (
      <Block style={[styles.container, {width}]}>
        <Pressable style={styles.modal}>
          <Progress
            step={percentUpdated || 0}
            steps={100}
            height={10}
            messenger={messenger}
          />
          <Block style={styles.view}>
            {isProcess && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={restartApp}
                style={styles.TouchableOpacityOnHindeModal}>
                <Text style={styles.text}>Khởi động lại</Text>
              </TouchableOpacity>
            )}
          </Block>
        </Pressable>
      </Block>
    );
  }
  return <Block />;
};
export default ModalCodePush;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundOpacity,
    position: 'absolute',
    top: 0,
    bottom: -100,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.white,
    width: '90%',
    borderRadius: 10,
    padding: 10,
  },

  TouchableOpacityOnHindeModal: {
    padding: 7,
    backgroundColor: theme.colors.orangeBol,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  view: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 10,
  },
  text: {
    color: theme.colors.white,
  },
});

/**

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(App));

 */
