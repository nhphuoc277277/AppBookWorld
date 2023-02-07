import React, { useState, useEffect } from 'react';
import { Block, Button, ModalBox, Text } from '@components';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  NativeModules,
  Platform,
} from 'react-native';
import { theme } from '@theme';
import IconView from '@components/Icon';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (scrollY, scrollYSize, _idBook) => {
  try {
    const data = {
      scrollY: scrollY,
      scrollYSize: scrollYSize,
    };

    await AsyncStorage.setItem(_idBook, JSON.stringify(data));
  } catch (err) {
    console.warn(`ERROR in seedStorage: ${err}`);
  }
};

const Header = ({
  themeBack,
  setThemeBack,
  size,
  setSize,
  _idBook,
  scrollY,
  scrollYSize,
  title,
}) => {
  const [paddingTop, setPaddingTop] = useState(0);
  const [height, setHeight] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      NativeModules.StatusBarManager.getHeight(statusBarHeight => {
        const STATUS_BAR_HEIGHT = statusBarHeight.height;
        const HEIGHT = 60 + STATUS_BAR_HEIGHT;
        setPaddingTop(STATUS_BAR_HEIGHT);
        setHeight(HEIGHT);
      });
    } else {
      const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
      const HEIGHT = 60 + STATUS_BAR_HEIGHT;
      setPaddingTop(STATUS_BAR_HEIGHT);
      setHeight(HEIGHT);
    }
  }, []);

  return (
    <Block
      backgroundColor={themeBack ? theme.colors.white : theme.colors.dark2}
      height={height}
      paddingTop={paddingTop}
      paddingHorizontal={10}
      justifyCenter
      style={styles.shadow}>
      <Block row style={styles.container} space={'between'}>
        <TouchableOpacity
          style={styles.iconBack}
          onPress={() => {
            storeData(scrollY, scrollYSize, _idBook);
            navigation.goBack();
          }}>
          <IconView
            component={'MaterialIcons'}
            name="keyboard-backspace"
            size={30}
            color={!themeBack ? theme.colors.white : theme.colors.dark2}
          />
        </TouchableOpacity>

        <Block width={'60%'}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: !themeBack ? theme.colors.white : theme.colors.dark2,
            }}>
            {title}
          </Text>
        </Block>

        <Button
          style={{ padding: 10 }}
          onPress={() => setShowModal(!isShowModal)}>
          <IconView
            component={'Entypo'}
            name={'dots-three-vertical'}
            size={20}
            color={!themeBack ? theme.colors.white : theme.colors.dark2}
          />
        </Button>
      </Block>

      {/* Modal cai dat */}
      <ModalBox
        isVisible={isShowModal}
        position={'top-right'}
        setIsVisible={setShowModal}
        containerStyle={styles.containerModal}
        onBackdropPress={() => setShowModal(!isShowModal)}>
        <Block
          style={[
            styles.modal,
            {
              backgroundColor: !themeBack
                ? theme.colors.black
                : theme.colors.white,
              borderWidth: !themeBack ? 1 : null,
              borderColor: !themeBack ? theme.colors.white : theme.colors.red,
            },
          ]}>
          <Button
            row
            style={[
              styles.rowModal,
              {
                borderBottomColor: !themeBack
                  ? theme.colors.gray
                  : theme.colors.gray3,
              },
            ]}>
            <IconView
              component={'MaterialIcons'}
              name={true ? 'favorite' : 'favorite-border'}
              size={20}
              color={themeBack ? theme.colors.red : theme.colors.white}
            />
            <Text
              style={styles.textRowModal}
              color={!themeBack ? theme.colors.white : theme.colors.dark2}>
              {true ? 'Lưu sách yêu thích ' : 'Đã lưu'}
            </Text>
          </Button>

          {/* Che do ban ngay */}
          <Button
            row
            style={[
              styles.rowModal,
              {
                borderBottomColor: !themeBack
                  ? theme.colors.gray
                  : theme.colors.gray3,
              },
            ]}
            onPress={() => setThemeBack(!themeBack)}>
            <IconView
              component={'Ionicons'}
              name={themeBack ? 'ios-sunny-outline' : 'moon-outline'}
              size={20}
              color={!themeBack ? theme.colors.white : theme.colors.dark2}
            />
            <Text
              style={styles.textRowModal}
              color={!themeBack ? theme.colors.white : theme.colors.dark2}>
              {themeBack ? 'Chế độ ban ngày' : 'Chế độ ban đêm'}
            </Text>
          </Button>

          <Block
            justifyCenter
            row
            style={[
              styles.rowModal,
              {
                borderBottomColor: !themeBack
                  ? theme.colors.gray
                  : theme.colors.gray3,
              },
            ]}>
            <Button
              onPress={() => setSize(size + 2)}
              style={[
                !themeBack
                  ? { backgroundColor: theme.colors.gray4 }
                  : { backgroundColor: theme.colors.dark2 },
                { marginRight: 20, borderRadius: 8, padding: 2 },
              ]}>
              <IconView
                component={'AntDesign'}
                name={'plus'}
                size={25}
                color={themeBack ? theme.colors.white : theme.colors.dark2}
              />
            </Button>
            <Button
              onPress={() => setSize(size - 2)}
              style={[
                !themeBack
                  ? { backgroundColor: theme.colors.gray4 }
                  : { backgroundColor: theme.colors.dark2 },
                { marginLeft: 20, borderRadius: 8, padding: 2 },
              ]}>
              <IconView
                component={'AntDesign'}
                name={'minus'}
                size={25}
                color={themeBack ? theme.colors.white : theme.colors.dark2}
              />
            </Button>
          </Block>
          <Button
            style={[styles.rowModal, { borderBottomWidth: 0 }]}
            onPress={() => setShowModal(!isShowModal)}>
            <Text
              color={!themeBack ? theme.colors.white : theme.colors.dark2}
              style={[styles.textRowModal]}>
              Đóng cài đặt
            </Text>
          </Button>
        </Block>
      </ModalBox>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  shadow: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.gray2,
  },
  modal: {
    borderRadius: 8,
    width: 200,
  },
  containerModal: {
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  rowModal: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textRowModal: {
    fontSize: 15,
    marginLeft: 10,
  },
});

export default Header;
