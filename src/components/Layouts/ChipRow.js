import React from "react";
import { ScrollView, Linking } from "react-native";
import { Chip, Avatar } from "react-native-paper";

export default function ChipRow({
  auth,
  _auth,
  handleRefresh,
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
        avatar={<Avatar.Text size={24} label={auth.acronym} />}
        mode="outlined"
        style={{ marginRight: 6 }}
        onPress={() => {
          navigate("User");
        }}
      >
        {auth.name}
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
          _auth({});
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
