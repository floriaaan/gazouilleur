import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Title, Subheading } from "react-native-paper";

export default function Header({ title, subheading }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("../../../assets/icon.png")}
        style={{
          width: 50,
          height: 50,
          marginLeft: 25,
          marginTop: 10
        }}
      ></Image>
      <View style={styles.header}>
        <Title style={styles.title}>{title}</Title>
        <Subheading>{subheading}</Subheading>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    //flexDirection: "row",
    padding: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
});
