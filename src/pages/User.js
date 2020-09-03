import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Header from "../components/Layouts/Header";
import { Divider, IconButton, Title, Subheading } from "react-native-paper";
import LottieView from "lottie-react-native";

import firebase from "../utils/firebase";
import Gazouilli from "../components/Gazouilli/Gazouilli";

let db = firebase.firestore();

export default function User({ navigate, auth, _auth }) {
  const [Gazs, setGazs] = useState([]);

  useEffect(() => {
    const fetchGazs = async () => {
      const snapshot = await db
        .collection("gazouillis")
        .orderBy("date")
        .where("user", "==", auth.name)
        .get();

      snapshot.forEach(function (querySnapshot) {
        let _tmpList = [];

        querySnapshot.forEach(function (doc) {
          _tmpList.push({ ...doc.data(), id: doc.id });
        });

        setGazs(_tmpList);
      });
    };
    fetchGazs();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LottieView
          source={require("../lottie/wink.json")}
          autoPlay
          resizeMode="contain"
          style={{ height: 300, width: 400 }}
        ></LottieView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header
          title={auth.name}
          subheading="Your friendly neighbourhood 😎"
        ></Header>
        <IconButton
          icon="arrow-left"
          color="#333"
          size={20}
          style={{ marginRight: 20, marginTop: 20 }}
          onPress={() => navigate("Discover")}
        />
      </View>

      <Divider style={{ marginVertical: 10 }} />

      {Gazs.length > 0 ? (
        Gazs.map((item, key) => {
          return (
            <React.Fragment key={key}>
              <Gazouilli
                id={item.id}
                img={item.img}
                user={item.user}
                text={item.text}
                date={item.date}
                isLiked={item.isLiked}
                isDisliked={item.isDisliked}
                _auth={auth}
                key={key}
              ></Gazouilli>
              <Divider style={{ marginVertical: 4 }}></Divider>
            </React.Fragment>
          );
        })
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center", marginTop:200 }}>
          <Title>Still no Gazouilis 😰</Title>
          <Subheading>
            You really should thinking about posting one some day 🙄
          </Subheading>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
