import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";


const CustomModal = ({ modalVisible, setModalVisible, title, text, onClose, position = "center" as JustifyContent }) => {
  const handleModalClose = () => {
    setModalVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const positionStyle = {justifyContent: position};

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleModalClose}
    >
      <View style={[styles.centeredView, positionStyle]} onTouchEnd={handleModalClose}>
        <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{title}</Text>
            <View style={styles.separator} />
            <Text style={styles.modalText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    margin: 25,
  },
  modalView: {
    backgroundColor: "#ffb703",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%'
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: "#000",
    marginVertical: 10,

  },
  modalText: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: '600',
    textAlign: "center"
  }
});

export default CustomModal;