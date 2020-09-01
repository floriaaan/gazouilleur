import React, { useState, useEffect } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import Header from "../../components/Layouts/Header";
import { Divider, TextInput, Button } from "react-native-paper";
import LottieView from "lottie-react-native";

import * as LocalAuthentication from "expo-local-authentication";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailValid, setEV] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPV] = useState(true);

  const handleEmail = (text) => {
    if (text !== "") {
      const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      emailformat.test(text) ? setEV(true) : setEV(false);
    } else {
      setEV(true);
    }
    setEmail(text);
  };

  const handlePass = (text) => {
    if (text !== "") {
      const passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      passformat.test(text) ? setPV(true) : setPV(false);
    } else {
      setPV(true);
    }
    setPassword(text);
  };

  const [biometricsCompatible, setBC] = useState(false);

  const handleLogin = () => {
    if (
      emailValid &&
      passwordValid &&
      password === "Testing123!" &&
      email === "tetra96@live.fr"
    ) {
      Alert.alert("Success", "Logged in!");
    } else {
      Alert.alert("Error", "Not logged");
    }
  };

  useEffect(() => {
    const checkBio = async () => {
      const isBioCompatible = await checkDeviceForHardware();
      const hasBio = await checkForEnrolled();
      if (isBioCompatible && hasBio) {
        setBC(true);
      }
    };
    checkBio();
  }, []);

  const checkDeviceForHardware = async () => {
    return await LocalAuthentication.hasHardwareAsync();
  };
  const checkForEnrolled = async () => {
    return await LocalAuthentication.isEnrolledAsync();
  };

  const scanBiometrics = async () => {
    let result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Log into Gazouilli",
    });
    if (result.success) {
      Alert.alert("Success", "Fingerprint works");
    } else {
      Alert.alert("Error", "Fingerprint does not works");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <LottieView
          source={require("./../../lottie/auth.json")}
          autoPlay
          resizeMode="contain"
          style={{ height: 300, width: 400 }}
        ></LottieView>
      </View>
      <Header
        title="Login"
        subheading="Connect to your Gazouillis's world 👶"
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
        ></TextInput>
        <TextInput
          color="#ffb700"
          label="Password 🔐"
          mode="outlined"
          error={!passwordValid}
          secureTextEntry
          onChangeText={(text) => handlePass(text)}
          style={{ marginTop: 10 }}
        ></TextInput>
        <Button
          color="#ffb700"
          mode="outlined"
          onPress={handleLogin}
          style={{ marginTop: 50 }}
        >
          Log into Gazouilli
        </Button>
        {biometricsCompatible && (
          <Button
            mode="outlined"
            onPress={scanBiometrics}
            style={{ marginTop: 5 }}
          >
            Use biometrics
          </Button>
        )}
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
