import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { FAB, Portal, Dialog, Button, IconButton, Title } from "react-native-paper";
import { Camera } from "expo-camera";

import moment from "moment";

import firebase from "../../utils/firebase";
let db = firebase.firestore();
var storageRef = firebase.storage().ref();

export default function CreateButton({ style, auth, _auth }) {
  const [cameraRef, setCameraRef] = useState();
  const [cameraDialogVisible, setCameraDialogVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [img, setImg] = useState("");
  const [user, setUser] = useState(auth.name);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handlePicture = async () => {
    if (cameraRef) {
      const pic = await cameraRef.takePictureAsync({ quality: 0.7 });
      const file = await fetch(pic.uri);
      const blob = await file.blob();

      const uploadTask = storageRef.child("stories").put(blob);
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
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            //console.log("File available at", downloadURL);
            setImg(downloadURL);
          });
        }
      );
    }
  };

  const handleSend = () => {
    if (img !== "") {
      db.collection("stories").doc().set({
        img: img,
        user: user,
        date: moment().toISOString(),
      });
      setCameraDialogVisible(false);
      setImg("");
    }

  };

  return (
    <>
      <FAB
        style={style}
        color="#ffb700"
        label="Stories"
        icon="plus"
        onPress={() => {
          setCameraDialogVisible(true);
        }}
      />
      <Portal>
        <Dialog
          style={{ flex: 1 }}
          visible={cameraDialogVisible}
          onDismiss={() => setCameraDialogVisible(false)}
        >
          <Dialog.Content style={{ flex: 1 }}>
            {img === "" ? (<Camera
              style={{ flex: 1, height: 200 }}
              ratio="1:1"
              type={type}
              useCamera2Api
              ref={(ref) => {
                setCameraRef(ref);
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <IconButton
                  icon={Camera.Constants.Type.back ? "user" : "image"}
                  color="#fff"
                  size={40}
                  style={{
                    flex: 0.3,
                    alignSelf: "flex-end",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                />
                <IconButton
                  icon="camera"
                  color="#fff"
                  size={40}
                  style={{
                    flex: 0.3,
                    alignSelf: "flex-end",
                    alignItems: "center",
                  }}
                  onPress={handlePicture}
                />
                <></>
              </View>
            </Camera>) : <Title>Already taken 😉</Title>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button color="#aaa" onPress={() => setCameraDialogVisible(false)}>Close</Button>
            <Button color="#ffb700" onPress={handleSend}>Send</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({});
