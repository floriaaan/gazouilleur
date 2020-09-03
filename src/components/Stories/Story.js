import React, { useState } from "react";

import {
  Card,
  Title,
  Paragraph,
  Divider,
  IconButton,
  Menu,
} from "react-native-paper";
import { StyleSheet, View, Platform } from "react-native";
import moment from "moment";

import firebase from "../../utils/firebase";

let db = firebase.firestore();

const Story = ({ img, user, date, id, _auth }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleDelete = async () => {
    let resp = await db.collection("stories").doc(id).delete();
    setMenuVisible(false);
    setDeleteVisible(true);
  };

  return (
    <>
      <Card elevation={10} style={styles.container}>
        <Card.Cover blurRadius={1} style={styles.image} source={{ uri: img }} />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <View style={styles.details}>
              <Title>{user}</Title>
              <Paragraph> &bull; {moment(date).fromNow()}</Paragraph>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Menu
                style={{ marginHorizontal: 5 }}
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <IconButton
                    icon="ellipsis-v"
                    color="#aaa"
                    size={15}
                    onPress={() => setMenuVisible(true)}
                  />
                }
              >
                {_auth.name === user && (
                  <>
                    <Divider />
                    <Menu.Item
                      icon="trash"
                      onPress={handleDelete}
                      title="Delete this Story 😢"
                    />
                  </>
                )}
              </Menu>
            </View>
          </View>
        </Card.Content>
      </Card>
    </>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    borderBottomColor: "#666",
    borderBottomWidth: 2,
  },
  image: {
    height: Platform.OS === "android" ? 650 : "100%",
    width: Platform.OS === "android" ? 400 : "100%",
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  actions: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  action: {
    color: "#ffb700",
  },
});
