import React, { useState } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import Header from "../../components/Layouts/Header";
import { Divider, TextInput, Button, ProgressBar } from "react-native-paper";
import LottieView from "lottie-react-native";

import { score } from "react-native-zxcvbn";

import firebase from "../../utils/firebase";
let fbAuth = firebase.auth();

export default function Register({ navigate, auth, _auth }) {
  const [email, setEmail] = useState("");
  const [emailValid, setEV] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPV] = useState(true);
  const [zxcvbn, setScore] = useState({
    score: 0,
    color: "#dc3545",
  });

  const handleEmail = (text) => {
    if (text !== "") {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      emailformat.test(text) ? setEV(true) : setEV(false);
    } else {
      setEV(false);
    }
    setEmail(text);
  };

  const handlePass = async (text) => {
    if (text !== "") {
      const passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      passformat.test(text) ? setPV(true) : setPV(false);
      setPV(true);
      /*let _score = await score(text);
      console.log(_score);
      let _color;
      switch (_score) {
        case 0:
          _color = "#dc3545";
          break;
        case 1:
          _color = "#dc3545";
          break;
        case 2:
          _color = "#ffc107";
          break;
        case 3:
          _color = "#28a745";
          break;
        case 4:
          _color = "#007bff";
          break;
        default:
          _color = "#dc3545";
          break;
      }
      setScore({
        score: _score,
        color: _color,
      });*/
    } else {
      setScore({
        score: 0,
        color: "#dc3545",
      });
      setPV(false);
    }
    setPassword(text);
  };

  const handleRegister = async () => {
    if (emailValid && passwordValid) {
      const response = await fbAuth.createUserWithEmailAndPassword(email, password);
    } else {
      Alert.alert("Error");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LottieView
          source={require("../../lottie/newspaper.json")}
          autoPlay
          resizeMode="contain"
          style={{ height: 300, width: 400 }}
        ></LottieView>
      </View>
      <Header
        title="Register"
        subheading="Enter the Gazouilleur's community 👶"
      ></Header>
      <Divider style={{ marginVertical: 10 }} />
      <View style={styles.form}>
        <TextInput
          label="Email 👦"
          autoCompleteType="email"
          keyboardType="email-address"
          type="email"
          mode="outlined"
          error={!emailValid}
          onChangeText={(text) => handleEmail(text)}
          theme={{
            colors: { primary: "#ffb700", underlineColor: "transparent" },
          }}
        ></TextInput>
        <TextInput
          color="#ffb700"
          label="Password 🔐"
          mode="outlined"
          error={!passwordValid}
          secureTextEntry
          onChangeText={(text) => handlePass(text)}
          style={{ marginTop: 10 }}
          theme={{
            colors: { primary: "#ffb700", underlineColor: "transparent" },
          }}
        ></TextInput>

        <ProgressBar
          progress={(zxcvbn.score * 25) / 100}
          color={zxcvbn.color}
        />
        <Button
          color="#ffb700"
          mode="outlined"
          onPress={handleRegister}
          style={{ marginTop: 50 }}
        >
          Make your first Gazouilli
        </Button>

        <Divider style={{ marginVertical: 7 }} />

        <Button onPress={() => navigate("Login")}>Sign in</Button>

        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  form: {
    padding: 20,
  },
});
