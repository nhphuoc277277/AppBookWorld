import React, {useState, useEffect} from 'react';
import {Block} from '@components';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  NativeModules,
  Platform,
} from 'react-native';
import {theme} from '@theme';
import IconView from '@components/Icon';
import {useNavigation, useRoute} from '@react-navigation/native';

const Topbar = ({bookmark}) => {
  const [paddingTop, setPaddingTop] = useState(0);
  const [height, setHeight] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      NativeModules.StatusBarManager.getHeight(statusBarHeight => {
        const STATUS_BAR_HEIGHT = statusBarHeight.height;
        const HEIGHT = 50 + STATUS_BAR_HEIGHT;
        setPaddingTop(STATUS_BAR_HEIGHT);
        setHeight(HEIGHT);
      });
    } else {
      const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
      const HEIGHT = 50 + STATUS_BAR_HEIGHT;
      setPaddingTop(STATUS_BAR_HEIGHT);
      setHeight(HEIGHT);
    }
  }, []);

  return (
    <Block
      height={height}
      paddingTop={paddingTop}
      paddingHorizontal={10}
      justifyCenter>
      <Block row style={styles.container} space={'between'}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => navigation.goBack()}>
          <IconView
            component={'MaterialIcons'}
            name="keyboard-backspace"
            size={30}
            color={theme.colors.black}
          />
        </TouchableOpacity>
        {bookmark !== undefined && (
          <TouchableOpacity style={styles.iconBookmark}>
            {bookmark === true ? (
              <IconView
                component={'Ionicons'}
                name={'bookmark'}
                size={25}
                color={theme.colors.red}
              />
            ) : (
              <IconView
                component={'Ionicons'}
                name={'bookmark-outline'}
                size={25}
                color={theme.colors.black}
              />
            )}
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  iconBack: {
    alignItems: 'center',
    justifyCenter: 'center',
    padding: 5,
  },
  textHeader: {
    fontSize: 16,
    color: 'white',
    marginRight: 10,
    flex: 1,
    fontWeight: 'bold',
  },
});

export default Topbar;
