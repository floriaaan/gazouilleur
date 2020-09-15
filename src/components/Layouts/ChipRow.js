import React from "react";
import { ScrollView, Linking } from "react-native";
import { Chip, Avatar } from "react-native-paper";

import firebase from "../../utils/firebase";

const fbAuth = firebase.auth();

export default function ChipRow({
  auth,
  toggleSearchVisible,
  navigate,
}) {
  return (
    <ScrollView
      horizontal
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
      }}
      showsHorizontalScrollIndicator={false}
    >
      <Chip
        avatar={<Avatar.Text size={24} label={auth && auth.user ? "XX" : '?'} />}
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => {
          navigate("User");
        }}
      >
        {auth && auth.user ? auth.user.email : 'Anonym'}
      </Chip>
      <Chip
        icon="globe"
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => navigate("Discover")}
      >
        Discover
      </Chip>
      <Chip
        icon="camera"
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => navigate("Stories")}
      >
        Stories
      </Chip>
      
      <Chip
        icon="search"
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={toggleSearchVisible}
      >
        Search
      </Chip>
      <Chip
        icon="lock"
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => {
          fbAuth.signOut();
          navigate("Login");
        }}
      >
        Log out
      </Chip>
      <Chip
        icon="github"
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => {
          Linking.openURL("https://github.com/floriaaan");
        }}
      >
        Github Repo
      </Chip>
    </ScrollView>
  );
}
