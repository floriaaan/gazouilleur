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

const Gazouilli = ({ img, text, user, date, loading, id }) => {
  const [isLiked, setLike] = useState(false);
  const [isDisiked, setDislike] = useState(false);

  const handleLike = () => {
    setDislike(false);
    setLike(!isLiked);
  };

  const handleDislike = () => {
    setLike(false);
    setDislike(!isDisiked);
  };

  return (
    <Card elevation={10} style={styles.container}>
      <Card.Cover blurRadius={1} style={styles.image} source={{ uri: img }} />
      <Card.Content>
        <View style={styles.details}>
          <Title>{user}</Title>
          <Paragraph> &bull; {date}</Paragraph>
        </View>
        <Divider style={{ marginTop: 5, marginBottom: 5 }} />

        <Paragraph>{text}</Paragraph>
      </Card.Content>
      <Card.Content>
        {isLiked && (
          <LottieView
            source={require("../../lottie/like-heart-button.json")}
            autoPlay
          />
        )}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <IconButton
          icon="heart"
          color={isLiked ? "#28A745" : "#aaa"}
          size={20}
          onPress={handleLike}
        />
        <IconButton
          icon="times"
          color={isDisiked ? "#dc3545" : "#aaa"}
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
