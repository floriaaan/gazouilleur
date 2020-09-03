import React, { useState } from "react";
import { StyleSheet, View, Platform } from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  Divider,
  Snackbar,
  IconButton,
} from "react-native-paper";
import { Camera } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import firebase from "../../utils/firebase";

var storageRef = firebase.storage().ref();

const CreateButton = ({ _createG, auth }) => {
  const [img, setImg] = useState("");
  const [imgPicker, setImgPicker] = useState(null);
  const [imgVisible, setImgVisible] = useState(false);
  const [user, setUser] = useState(auth.name);
  const [text, setText] = useState("");
  const [textValid, setTV] = useState(true);

  const [dialogVisible, setDVisible] = useState(false);
  const showDialog = () => setDVisible(true);
  const hideDialog = () => setDVisible(false);

  const [snackVisible, setSVisible] = useState(false);
  const showSnack = () => setSVisible(true);
  const hideSnack = () => setSVisible(false);

  /*const [cameraPermissions, _cameraPermissions] = useState(null);
  const [cameraType, setCType] = useState(Camera.Constants.Type.back);
  const [cameraError, _cameraError] = useState(false);

  const [cameraModal, _cameraModal] = useState(false);

  const handleCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(await Camera.requestPermissionsAsync());
    _cameraPermissions(status === "granted");
    if (cameraPermissions === null || cameraPermissions === false) {
      _cameraError(true);
      _cameraModal(false);
    } else {
      _cameraError(false);
      _cameraModal(true);
    }
  };*/

  const handleCreate = () => {
    if (user !== "" && text !== "") {
      _createG(
        img ||
          "https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg",
        user,
        text
      );
      setText("");
      showSnack();
      hideDialog();
      setImg("");
    } else {
      setTV(false);
    }
  };

  const handlePicker = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const file = await fetch(result.uri);
        const blob = await file.blob();

        setImgPicker(blob);
        const uploadTask = storageRef.child("images").put(blob);
        uploadTask.on(
          "state_changed",
          function (snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log("Upload is " + progress + "% done");
          },
          function (error) {
            console.log("error", error);
          },
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                //console.log("File available at", downloadURL);
                setImg(downloadURL);
              });
            setImgVisible(false);
          }
        );
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <>
      <FAB
        style={styles.fab}
        color="#ffb700"
        label="Gazouille"
        icon="plus"
        onPress={showDialog}
      />
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Gazouille to the World 🌌</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Username 🤴"
              disabled={user !== ""}
              value={user}
              onChangeText={(e) => setUser(e)}
              mode="outlined"
              theme={{
                colors: { primary: "#ffb700", underlineColor: "transparent" },
              }}
            />
            <Divider style={{ marginVertical: 10 }} />
            <TextInput
              label="Gazouilli 👼"
              value={text}
              onChangeText={(e) => setText(e)}
              mode="outlined"
              multiline
              error={!textValid}
              numberOfLines={5}
              theme={{
                colors: { primary: "#ffb700", underlineColor: "transparent" },
              }}
            />
            {imgVisible && (
              <TextInput
                label="Image URL 🖼"
                value={img}
                onChangeText={(e) => setImg(e)}
                mode="outlined"
                theme={{
                  colors: { primary: "#ffb700", underlineColor: "transparent" },
                }}
              ></TextInput>
            )}
          </Dialog.Content>
          <Dialog.Actions
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <IconButton
                icon="camera"
                color="#aaa"
                size={15}
                onPress={() => {
                  //handleCamera();
                }}
              />
              <IconButton
                icon="microphone"
                color="#aaa"
                size={15}
                onPress={() => {
                  //handleMicrophone();
                }}
              />
              <IconButton
                icon="image"
                color="#aaa"
                size={15}
                onPress={handlePicker}
              />
              <IconButton
                icon="link"
                color="#aaa"
                size={15}
                onPress={() => {
                  setImgVisible(!imgVisible)
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button color="#aaaaaa" onPress={hideDialog}>
                Cancel
              </Button>
              <Button color="#ffb700" onPress={handleCreate}>
                Create
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
        <Snackbar
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
          visible={snackVisible}
          onDismiss={hideSnack}
          action={{
            label: "Cool 👍",
            onPress: hideSnack,
          }}
        >
          Your Gazouilli is on the Internet! 🎉
        </Snackbar>

        {/*{cameraError && (
          <Dialog
            visible={cameraError}
            onDismiss={() => {
              _cameraError(false);
            }}
          >
            <Dialog.Title>Camera 📸</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Something went wrong with permissions ...</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  _cameraError(false);
                }}
              >
                Okay ... 😕
              </Button>
            </Dialog.Actions>
          </Dialog>
        )}

        <Modal
          visible={cameraModal}
          onDismiss={() => {
            _cameraModal(false);
          }}
        >
          <Camera style={{ flex: 1 }} type={cameraType}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  setCType(
                    cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  Flip
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          )
              </Modal>*/}
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});

export default CreateButton;
