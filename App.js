import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import firebase from "./src/utils/firebase";

let db = firebase.firestore();

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import moment from "moment";

import Gazouilli from "./src/components/Gazouilli/Gazouilli";
import Discover from "./src/pages/Discover";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";
import User from "./src/pages/User";

import "./src/utils/fix";
import Stories from "./src/pages/Stories";

export default function App() {
  const _tmpAuth = {
    name: "Florian",
    acronym: "Florian".split(" ").map((word) => {
      if (word.length > 0) return word[0];
    }),
  };

  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  const [loading, setLoading] = useState(true);

  const [navigation, _navigate] = useState("Login");
  const [auth, _auth] = useState(_tmpAuth);

  const [Gazs, setGazs] = useState([]);
  const _createG = (img, user, text) => {
    db.collection("gazouillis").doc().set({
      img: img,
      user: user,
      text: text,
      date: moment().toISOString(),
      isLiked: false,
      isDisliked: false,
    });
    setGazs([
      ...Gazs,
      {
        img: img,
        user: user,
        text: text,
        date: "today",
      },
    ]);
  };

  useEffect(() => {
    db.collection("gazouillis")
      .orderBy("date")
      .onSnapshot(function (querySnapshot) {
        let _tmpList = [];

        querySnapshot.forEach(function (doc) {
          _tmpList.push({ ...doc.data(), id: doc.id });
        });

        setGazs(_tmpList);
      });
    setLoading(false);
  }, []);

  const _renderGaz = ({ item, key }) => {
    return (
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
    );
  };

  return (
    <>
      {!loaded ? (
        <AppLoading></AppLoading>
      ) : (
        <PaperProvider
          settings={{
            icon: (props) => <AwesomeIcon {...props} />,
          }}
        >
          {navigation === "Register" && (
            <Register navigate={_navigate} auth={auth} _auth={_auth}></Register>
          )}
          {navigation === "Login" && (
            <Login navigate={_navigate} auth={auth} _auth={_auth}></Login>
          )}
          {navigation === "Discover" && (
            <Discover
              data={Gazs}
              loading={loading}
              _setLoading={setLoading}
              _renderGList={_renderGaz}
              _createG={_createG}
              navigate={_navigate}
              auth={auth}
              _auth={_auth}
            />
          )}
          {navigation === "User" && (
            <User navigate={_navigate} auth={auth} _auth={_auth} />
          )}
          {navigation === "Stories" && (
            <Stories
              navigate={_navigate}
              auth={auth}
              _auth={_auth}
              loading={loading}
              _setLoading={setLoading}
            />
          )}

          <StatusBar style="auto" />
        </PaperProvider>
      )}
    </>
  );
}

/*
<Login></Login>
<Discover
            data={Gazs}
            loading={loading}
            _setLoading={setLoading}
            _renderGList={_renderGaz}
            _createG={_createG}
          />
*/
