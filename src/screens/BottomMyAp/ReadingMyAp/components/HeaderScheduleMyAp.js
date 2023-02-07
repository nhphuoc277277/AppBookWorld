import { Block } from '@components';
import { theme } from '@theme';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '@hooks';

const { colors } = theme;

const HeaderScheduleMyAp = ({ data, action }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const HEIGHT_HEADER = insets.top + 50;
  const PADDING_TOP = insets.top;
  return (
    <Block
      backgroundColor={colors.orange}
      height={HEIGHT_HEADER}
      paddingTop={PADDING_TOP}
      paddingBottom={10}
      paddingHorizontal={10}>
      <Block row paddingHorizontal={10} flex>
        <Block justifyCenter>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              style={styles.image}
              source={
                data?.avatar
                  ? { uri: data.avatar }
                  : {
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsgyx9VX6fi80cW_Twix5RPFUK2qq9S9PBP_41ONG4V0Sr93CyjuF9L00YDCNRSKoFzpA&usqp=CAU',
                  }
              }
            />
          </TouchableOpacity>
        </Block>
        <Block flex paddingHorizontal={8} justifyCenter>
          <Text style={styles.labelHello}> {data?.displayName} </Text>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  labelUsername: {
    color: colors.white,
    fontWeight: 'bold',
  },
  labelHello: {
    color: colors.white,
  },
});

export default HeaderScheduleMyAp;
