import React from 'react';
import {Block} from '@components';
import {TextInput, StyleSheet, Keyboard} from 'react-native';
import {theme} from '@theme';
import MaterialIconsI from 'react-native-vector-icons/MaterialIcons';
const {colors} = theme;

const Search = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  width,
}) => {
  return (
    <Block>
      <Block style={styles.searchBar__unclicked}>
        {/* search Icon */}
        <MaterialIconsI name="search" size={20} color="black" />
        {/* Input field */}
        <TextInput
          style={[styles.input, width ? {width: width} : {width: '97%'}]}
          placeholder="Tìm kiếm"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <MaterialIconsI
            name="clear"
            size={20}
            color="black"
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
              setClicked(false);
            }}
            style={styles.border_clear}
          />
        )}
      </Block>
      {/* cancel button, depending on whether the search bar is clicked or not */}
    </Block>
  );
};

const styles = StyleSheet.create({
  searchBar__unclicked: {
    padding: 5,
    flexDirection: 'row',
    width: '97%',
    backgroundColor: colors.gray3,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  input: {
    fontSize: 14,
    marginLeft: 10,
    height: 40,
  },
  border_clear: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 3,
    position: 'absolute',
    right: 10,
  },
});

export default Search;
