import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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

const CreateButton = ({ _createG, auth }) => {
  const [img, setImg] = useState(
    "https://lh3.googleusercontent.com/proxy/uuBWojLsHy78sgzX1a8sJ2yO2Jgs7a4N8p9AA6BTdZOW7c9I4nE7PAtKWSo7Y3DFaCeQXyefHXUu7CWQf15W9hco7TL3V-vroFMXMPQ88-NnGVYFS1WvnsanMgOEdkXxKipgBOTY6MUJ3itThUtmzg"
  );
  const [user, setUser] = useState(auth.name);
  const [text, setText] = useState("");
  const [textValid, setTV] = useState(true);

  const [dialogVisible, setDVisible] = useState(false);
  const showDialog = () => setDVisible(true);
  const hideDialog = () => setDVisible(false);

  const [snackVisible, setSVisible] = useState(false);
  const showSnack = () => setSVisible(true);
  const hideSnack = () => setSVisible(false);

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
            />
          </Dialog.Content>
          <Dialog.Actions
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <IconButton
                icon="camera"
                color="#aaa"
                size={15}
                onPress={() => console.log("Pressed")}
              />
            </View>
            <View style={{flexDirection:'row'}}>
              <Button color="#aaaaaa" onPress={hideDialog}>
                Cancel
              </Button>
              <Button onPress={handleCreate}>Create</Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
