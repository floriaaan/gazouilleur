import React, { useState } from "react";

import {
  Card,
  Title,
  Paragraph,
  Divider,
  IconButton,
} from "react-native-paper";
import LottieView from "lottie-react-native";
import { StyleSheet, View, Platform } from "react-native";
import moment from "moment";

import firebase from "../../utils/firebase";

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
}) => {
  const [_isLiked, setLike] = useState(isLiked);
  const [_isDisliked, setDislike] = useState(isDisliked);

  const update = () => {
    try {
      db.collection("gazouillis")
        .doc(id)
        .update({ isLiked: _isLiked, isDisliked: _isDisliked });
    } catch (err) {
      console.log(err)
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

  return (
    <Card elevation={10} style={styles.container}>
      <Card.Cover blurRadius={1} style={styles.image} source={{ uri: img }} />
      <Card.Content>
        <View style={styles.details}>
          <Title>{user}</Title>
          <Paragraph> &bull; {moment(date).fromNow()}</Paragraph>
        </View>
        <Divider style={{ marginTop: 5, marginBottom: 5 }} />

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