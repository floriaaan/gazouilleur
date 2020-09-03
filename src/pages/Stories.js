import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Title, Subheading, Searchbar } from "react-native-paper";
import Header from "../components/Layouts/Header";
import ChipRow from "../components/Layouts/ChipRow";

import firebase from "../utils/firebase";
import CreateButton from "../components/Stories/CreateButton";
import { ScrollView } from "react-native-gesture-handler";
import Story from "../components/Stories/Story";
let db = firebase.firestore();

export default function Stories({ navigate, _auth, auth, loading }) {
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

  const [Stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      db.collection("stories").orderBy('date').onSnapshot(function (querySnapshot) {
        let _tmpList = [];

        querySnapshot.forEach(function (doc) {
          _tmpList.push({ ...doc.data(), id: doc.id });
        });

        setStories(_tmpList);
      });
    };
    fetchStories();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Stories"
        subheading="Tell the world your Gazouillis directly"
      />
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
      {Stories.length > 0 ? (
        <>
          <ScrollView
            horizontal
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {Stories.map((item, key) => {
              return (
                <Story
                  img={item.img}
                  user={item.user}
                  date={item.date}
                  id={item.id}
                  _auth={auth}
                  key={key}
                ></Story>
              );
            })}
          </ScrollView>
          <CreateButton
            auth={auth}
            _auth={_auth}
            style={styles.fab}
          ></CreateButton>
        </>
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
            auth={auth}
            _auth={_auth}
            style={{
              margin: 16,
              backgroundColor: "#fff",
            }}
          ></CreateButton>
        </View>
      )}
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
  },
});
