import React, { useState, useEffect } from "react";

import {
  Card,
  Title,
  Paragraph,
  Divider,
  IconButton,
  Menu,
  Snackbar,
  Portal,
  Dialog,
  Button,
  List,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import LottieView from "lottie-react-native";
import { StyleSheet, View, Platform } from "react-native";
import moment from "moment";

import firebase from "../../utils/firebase";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "firebase";

let db = firebase.firestore();

const Gazouilli = ({
  img,
  text,
  user,
  date,
  loading,
  id,
  isLiked,
  isDisliked,
  _auth,
}) => {
  const [_isLiked, setLike] = useState(isLiked);
  const [_isDisliked, setDislike] = useState(isDisliked);
  const [comments, setComments] = useState([]);

  const [menuVisible, setMenuVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const [addCommentsVisible, setAddCommentsVisible] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentTextValid, setCommentTextValid] = useState(true);

  const [snackVisible, setSVisible] = useState(false);
  const showSnack = () => setSVisible(true);
  const hideSnack = () => setSVisible(false);

  const handleComments = () => {
    if (commentText !== "" && commentText.length < 40) {
      setCommentTextValid(true);
      if (commentTextValid) {
        db.collection("gazouillis").doc(id).collection("comments").doc().set({
          user: _auth.name,
          text: commentText,
        });
        setCommentText("");
        setAddCommentsVisible(false);
      }
    } else {
      setCommentTextValid(false);
    }
  };

  const update = () => {
    try {
      db.collection("gazouillis")
        .doc(id)
        .update({ isLiked: _isLiked, isDisliked: _isDisliked });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = () => {
    setDislike(false);
    setLike(!_isLiked);

    update();
  };

  const handleDislike = () => {
    setLike(false);
    setDislike(!_isDisliked);

    update();
  };

  const handleDelete = async () => {
    let resp = await db.collection("gazouillis").doc(id).delete();
    setDeleteVisible(true);
  };

  useEffect(() => {
    const fetchComments = async () => {
      db.collection("gazouillis")
        .doc(id)
        .collection("comments")
        .onSnapshot(function (querySnapshot) {
          let _tmpList = [];
          querySnapshot.forEach(function (doc) {
            _tmpList.push(doc.data());
          });
          setComments(_tmpList);
        });
    };
    fetchComments();
  }, []);
  //console.log(_auth)
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
              <IconButton
                icon="comments"
                color="#aaa"
                size={15}
                onPress={() => {
                  setCommentsVisible(true);
                }}
              />
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
                <Menu.Item
                  icon="heart"
                  color="#28A745"
                  onPress={handleLike}
                  title="Like 🥰"
                />
                <Menu.Item
                  icon="times"
                  onPress={handleDislike}
                  title="Dislike 😒"
                />
                {_auth.name === user && (
                  <>
                    <Divider />
                    <Menu.Item
                      icon="trash"
                      onPress={handleDelete}
                      title="Delete this Gazouilli 😢"
                    />
                  </>
                )}
              </Menu>
            </View>
          </View>

          <Divider style={{ marginTop: 7, marginBottom: 7 }} />

          <Paragraph>{text}</Paragraph>
        </Card.Content>
        <Card.Content>
          {_isLiked && (
            <LottieView
              source={require("../../lottie/like-heart-button.json")}
              autoPlay
            />
          )}
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <IconButton
            icon="heart"
            color={_isLiked ? "#28A745" : "#aaa"}
            size={20}
            onPress={handleLike}
          />
          <IconButton
            icon="times"
            color={_isDisliked ? "#dc3545" : "#aaa"}
            size={20}
            onPress={handleDislike}
          />
        </Card.Actions>
      </Card>
      <Snackbar
        visible={deleteVisible}
        onDismiss={() => {
          setDeleteVisible(false);
        }}
        action={{
          label: "Cool 😎",
          onPress: () => {
            setDeleteVisible(false);
          },
        }}
      >
        This Gazouilli is deleted. 🚮
      </Snackbar>
      <Portal>
        <Dialog
          visible={commentsVisible}
          onDismiss={() => {
            setCommentsVisible(false);
          }}
        >
          <Dialog.Title>Comments of this Gazouilli 👶</Dialog.Title>
          <Dialog.Content>
            {comments.length > 0 ? (
              <ScrollView style={{ height: 330 }}>
                <List.Section>
                  {comments.map((el, key) => {
                    return (
                      <React.Fragment key={key}>
                        <TouchableRipple
                          onLongPress={() => {
                            console.log("Long press");
                          }}
                        >
                          <List.Item title={el.text} description={el.user} />
                        </TouchableRipple>
                        <Divider style={{ marginVertical: 3 }} />
                      </React.Fragment>
                    );
                  })}
                </List.Section>
              </ScrollView>
            ) : (
              <List.Item
                title="No comments 😓"
                description="But you should comment to this Gazouilli 🥱"
                left={(props) => <List.Icon {...props} icon="comments" />}
              />
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              color="#333"
              onPress={() => {
                setCommentsVisible(false);
              }}
            >
              Close
            </Button>
            <Button
              color="#ffb700"
              onPress={() => {
                setAddCommentsVisible(true);
              }}
            >
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog
          visible={addCommentsVisible}
          onDismiss={() => setAddCommentsVisible(false)}
        >
          <Dialog.Title>Comment on the Gazouilli 🤓</Dialog.Title>
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
              label="Comment 📨"
              value={commentText}
              onChangeText={(e) => setCommentText(e)}
              mode="outlined"
              multiline
              error={!commentTextValid}
              numberOfLines={3}
              theme={{
                colors: { primary: "#ffb700", underlineColor: "transparent" },
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <View style={{ flexDirection: "row" }}>
              <Button
                color="#aaa"
                onPress={() => {
                  setAddCommentsVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button color="#ffb700" onPress={handleComments}>
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
      </Portal>
    </>
  );
};

export default Gazouilli;

const styles = StyleSheet.create({
  container: {
    margin: 30,
    borderBottomColor: "#666",
    borderBottomWidth: 2,
  },
  image: {
    height: Platform.OS === "android" ? 400 : "100%",
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

// TODO : add comments
