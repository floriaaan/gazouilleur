import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  Button,
  TextInput,
  Divider,
  Snackbar,
} from "react-native-paper";

const CreateButton = ({ _createG, auth }) => {
  const [img, setImg] = useState("https://picsum.photos/500");
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
              disabled
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
            style={{ flexDirection: "row-reverse", justifyContent: "flex-end" }}
          >
            <Button onPress={handleCreate}>Create</Button>
            <Button color="#aaaaaa" onPress={hideDialog}>
              Cancel
            </Button>
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
