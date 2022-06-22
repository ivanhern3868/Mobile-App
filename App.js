import React, { useState }  from "react";
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider,Radio } from "native-base";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from './assets/logo.png'; 
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'; 

const ShareButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {alert("Permission to access camera roll is required!");return;}
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {return;}
    setSelectedImage({ localUri: pickerResult.uri });
    setShowModal2(true)};

  let openShareDialogAsync = async () => {
    if (Platform.OS === 'web') {alert(`Uh oh, sharing isn't available on your platform`);return;}
    await Sharing.shareAsync(selectedImage.localUri);}; 

  if (selectedImage !== null) {
    return <Center>
    <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
    <Modal.Content maxWidth="350">
      <Modal.CloseButton />
      <Modal.Header>Selected Image</Modal.Header>
      <Modal.Body>
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail}/>
        <Text>{"\n"}</Text>
        <Button onPress={openShareDialogAsync} style={styles.button2}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </Button>
        </View>
      </Modal.Body>
    </Modal.Content>
  </Modal>
  </Center>
  }

  return <Center>
      <Button onPress={() => setShowModal(true)}>Share</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Select Image</Modal.Header>
          <Modal.Body>
              <TouchableOpacity onPress={openImagePickerAsync} style={styles.button1}>
                  <Text style={styles.buttonText}>Pick a photo</Text>
              </TouchableOpacity>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>;
};

export default function App() {

  return (
          <NativeBaseProvider>
              <Center flex={1} px="3">
              <View style={styles.container}>
                    <Image source={logo} style={styles.logo} /> 
                    <Text style={styles.instructions}> 
                    To share a photo from your phone with a friend, just press the button below!{"\n"}</Text>
                    <ShareButton />
              </View>
              </Center>
        </NativeBaseProvider>
  );
}


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
      },
      instructions: {
        color: '#888',
        fontSize: 18,
        marginHorizontal: 15,
      }, 
      button1: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
      },
      button2: {
        backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        padding: 20,
        borderRadius: 5,
      },
      buttonText: {
        fontSize: 20,
        color: '#fff',
      }, 
      buttonText2: {
        fontSize: 20,
        color: '#fff',
      }, 
      thumbnail: {
        alignItems: 'center',
        width: 300,
        height: 350,
        resizeMode: "contain"
      }
    });