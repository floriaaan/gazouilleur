import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  Divider,
  Snackbar,
  IconButton,
  Paragraph,
  Modal,
} from "react-native-paper";
import { Camera } from "expo-camera";

const CreateButton = ({ _createG, auth }) => {
  const [img, setImg] = useState(
    "https://lh3.googleusercontent.com/proxy/uuBWojLsHy78sgzX1a8sJ2yO2Jgs7a4N8p9AA6BTdZOW7c9I4nE7PAtKWSo7Y3DFaCeQXyefHXUu7CWQf15W9hco7TL3V-vroFMXMPQ88-NnGVYFS1WvnsanMgOEdkXxKipgBOTY6MUJ3itThUtmzg"
  );
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
      _createG(img, user, text);
      setUser("");
      setText("");
      showSnack();
      hideDialog();
    } else {
      setTV(false);
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
                onPress={() => {
                  setImgVisible(!imgVisible);
                  !imgVisible
                    ? setImg(
                        "https://lh3.googleusercontent.com/proxy/uuBWojLsHy78sgzX1a8sJ2yO2Jgs7a4N8p9AA6BTdZOW7c9I4nE7PAtKWSo7Y3DFaCeQXyefHXUu7CWQf15W9hco7TL3V-vroFMXMPQ88-NnGVYFS1WvnsanMgOEdkXxKipgBOTY6MUJ3itThUtmzg"
                      )
                    : setImg("");
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

