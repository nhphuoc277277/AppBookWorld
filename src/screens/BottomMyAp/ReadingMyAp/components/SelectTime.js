import React from 'react';
import {View, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

function SelectTime({dataSlot, defaultValue, value}) {
  return (
    <View style={styles.selectSlide}>
      <SelectDropdown
        data={dataSlot}
        buttonStyle={styles.btnStyle}
        buttonTextStyle={styles.buttonTextStyle}
        dropdownStyle={styles.dropdownStyle}
        defaultButtonText={defaultValue}
        onSelect={(selectedItem, index) => {
          value(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
      />
    </View>
  );
}
export default SelectTime;

const styles = StyleSheet.create({
  selectSlide: {
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  btnStyle: {
    height: 40,
    width: '100%',
    borderRadius: 8,
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  dropdownStyle: {
    borderRadius: 8,
  },
});
