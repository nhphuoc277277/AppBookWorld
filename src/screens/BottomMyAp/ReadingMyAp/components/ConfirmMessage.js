import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ConfirmMessage = props => {
  const {onShowModal, message, type} = props;
  const {colors} = useTheme();

  const renderTypeIcon = typeMessage => {
    if (typeMessage === 'error') {
      return <Ionicons name="clockcircle" size={24} color={colors.red} />;
    } else if (typeMessage === 'confirm') {
      return (
        <Ionicons name="exclamationcircle" size={24} color={colors.yellow} />
      );
    } else if (typeMessage === 'success') {
      return <Ionicons name="checkcircleo" size={24} color={colors.green} />;
    } else {
      return <Ionicons name="closecircleo" size={24} color={colors.red} />;
    }
  };
  return (
    <Modal
      onModalHide={onShowModal}
      visible={true}
      useNativeDriver={true}
      onBackdropPress={onShowModal}
      onBackButtonPress={onShowModal}
      animationInTiming={400}
      isVisible={true}
      backdropColor="black"
      hasBackdrop={true}>
      <View style={styles.modal}>
        <View style={styles.flexBox}>
          {renderTypeIcon(type)}
          <Text style={styles.textMessage}>{message}</Text>
        </View>
        <TouchableOpacity style={styles.boxClick} onPress={onShowModal}>
          <Text style={styles.textBold}>Ok</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

ConfirmMessage.propTypes = {};

const styles = StyleSheet.create({
  modal: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  flexBox: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  textMessage: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    width: '90%',
  },
  boxClick: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  textBold: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ConfirmMessage;
