import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Chip,
  Avatar,
  Searchbar,
  ProgressBar,
  Title,
  Subheading,
} from "react-native-paper";
import LottieView from "lottie-react-native";

import List from "../components/Gazouilli/List";
import Header from "../components/Layouts/Header";
import CreateButton from "../components/Gazouilli/CreateButton";
import ChipRow from "../components/Layouts/ChipRow";

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
  const handleRefresh = () => {};
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
            source={require("./../lottie/things.json")}
            autoPlay
            loop
            resizeMode="contain"
            style={{ height: 200, width: 400 }}
          ></LottieView>
        </View>
      )}

      <Header title="Discover" subheading="Subscribe to more accounts" />
      <ChipRow
        auth={auth}
        _auth={_auth}
        handleRefresh={handleRefresh}
        toggleSearchVisible={toggleSearchVisible}
        navigate={navigate}
      ></ChipRow>
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
      <View style={{ height: 790 }}>
        {data.length > 0 ? (
          <List data={data} _render={_renderGList} loading={loading} />
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 300,
            }}
          >
            <Title>Still no Stories 📼</Title>
            <Subheading>
              Nothing to tell here... Unless you have something to share us 🤔
            </Subheading>
            <CreateButton
              _createG={_createG}
              auth={auth}
              style={{
                margin: 16,
                backgroundColor: "#fff",
              }}
            />
          </View>
        )}
      </View>
      <View style={{ flexDirection: "row" }}>
        <CreateButton _createG={_createG} auth={auth} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  searchbar: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});
