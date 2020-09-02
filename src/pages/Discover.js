import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Chip, Avatar, Searchbar, ProgressBar } from "react-native-paper";
import LottieView from "lottie-react-native";

import List from "../components/Gazouilli/List";
import Header from "../components/Layouts/Header";
import CreateButton from "../components/Gazouilli/CreateButton";

export default function Discover({
  data,
  _renderGList,
  _createG,
  loading,
  _setLoading,
  navigate,
  auth,
  _auth,
}) {
  const original = data;
  const handleRefresh = () => {
    _setLoading(true);
    setTimeout(() => {
      _setLoading(false);
    }, 1000);
  };
  const [searchVisible, setSVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleSearchVisible = () => setSVisible(!searchVisible);
  const handleQueryChanges = (query) => {
    if (query !== "") {
      data = original.map((el) => {
        if (el.user.startsWith(query)) return el;
      });
    } else {
      data = original;
    }
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {false && (
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={require("./../lottie/hashtag.json")}
            autoPlay
            loop
            resizeMode="contain"
            style={{ height: 200, width: 400 }}
          ></LottieView>
        </View>
      )}

      <Header title="Discover" subheading="Subscribe to more accounts" />
      <ScrollView horizontal style={styles.chipRow}>
        <Chip
          avatar={<Avatar.Text size={24} label="FL" />}
          mode="outlined"
          style={{ marginRight: 6 }}
          onPress={() => {}}
        >
          Florian Leroux
        </Chip>
        <Chip
          icon="refresh"
          mode="outlined"
          style={{ marginRight: 6 }}
          onPress={() => handleRefresh}
        >
          Refresh
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
      </ScrollView>
      {loading ? (
        <ProgressBar
          style={{ marginHorizontal: 20, marginVertical: 4 }}
          indeterminate
          color="#ffb700"
        />
      ) : (
        <></>
      )}
      {searchVisible ? (
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={(query) => handleQueryChanges(query)}
          value={searchQuery}
        />
      ) : (
        <></>
      )}

      <List data={data} _render={_renderGList} loading={loading} />
      <CreateButton _createG={_createG} auth={auth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  chipRow: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  searchbar: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
