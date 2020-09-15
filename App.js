import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import firebase from "./src/utils/firebase";
import "./src/utils/fix";
let db = firebase.firestore();
let fbAuth = firebase.auth();

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import moment from "moment";

import Gazouilli from "./src/components/Gazouilli/Gazouilli";
import Discover from "./src/pages/Discover";
import Stories from "./src/pages/Stories";
import User from "./src/pages/User";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";

export default function App() {
  const [navigation, _navigate] = useState("Login");
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = fbAuth.onAuthStateChanged((auth) => {
      if (auth && auth.uid) {
        setUser(auth);
        _navigate("Discover");
        setInitializing(false);
      }
    });
    if (user === null || initializing) {
      setUser(null);
      _navigate("Login");
    }
    return subscriber;
  }, []);

  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  const [Gazs, setGazs] = useState([]);
  const _createG = (img, text) => {
    console.log(user.uid)
    db.collection("gazouillis").doc().set({
      img: img,
      uid: user.uid,
      text: text,
      date: moment().toISOString(),
      isLiked: false,
      isDisliked: false,
    });
  };
  const _renderGaz = ({ item, key }) => {
    return (
      <Gazouilli
        id={item.id}
        img={item.img}
        uid={item.uid}
        text={item.text}
        date={item.date}
        isLiked={item.isLiked}
        isDisliked={item.isDisliked}
        auth={user}
        key={key}
      ></Gazouilli>
    );
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
  }, []);
  //console.log(user);
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
            <Register navigate={_navigate}></Register>
          )}
          {navigation === "Login" && <Login navigate={_navigate}></Login>}

          {!initializing && navigation === "Discover" && (
            <Discover
              data={Gazs}
              _renderGList={_renderGaz}
              _createG={_createG}
              navigate={_navigate}
              auth={user}
            />
          )}
          {!initializing && navigation === "User" && (
            <User navigate={_navigate} auth={user} />
          )}
          {!initializing && navigation === "Stories" && (
            <Stories navigate={_navigate} auth={user} />
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
