import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useFonts } from "@use-expo/font";

import { AppLoading } from "expo";

import Gazouilli from "./src/components/Gazouilli/Gazouilli";
import Discover from "./src/pages/Discover";
import Login from "./src/pages/auth/Login";
import Register from "./src/pages/auth/Register";

const Stack = createStackNavigator();
export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });
  const [loading, setLoading] = useState(true);
  const gazs = [
    {
      img:
        "https://avatars0.githubusercontent.com/u/10078837?s=460&u=3c5bb03510dda069aa9b69c2d345719a3f1a073a&v=4",
      user: "Florian",
      text: "Quand je serai grand, je serai astronaute 👨‍🚀",
      date: "one year ago",
    },
    {
      img:
        "https://avatars1.githubusercontent.com/u/56133800?s=460&u=ef6aa2e5035ba38f4c04c4c492a8c17c464a27b8&v=4",
      user: "Ophélie",
      text: "Franchement, je hais les guêpes 🐝",
      date: "one week ago",
    },
    {
      img:
        "http://fr.web.img6.acsta.net/r_1920_1080/newsv7/19/10/29/17/32/27969310.jpg",
      user: "Peter B.",
      text: "Je veux rentrer chez moi, t'es pas ma mère 🙅‍♂️.",
      date: "two week ago",
    },
  ];

  const [Gazs, setGazs] = useState(gazs);
  const _createG = (img, user, text) => {
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
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const _renderGaz = ({ item, key }) => {
    return (
      <Gazouilli
        id={key - 1}
        img={item.img}
        user={item.user}
        text={item.text}
        date={item.date}
        key={key}
      ></Gazouilli>
    );
  };

  const [navigation, _navigate] = useState("Login");
  const [auth, _auth] = useState({ name: "Florian" });

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
