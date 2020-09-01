import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Subheading } from "react-native-paper";

export default function Header({ title, subheading }) {
  return (
    <View style={styles.header}>
      <Title style={styles.title}>{title}</Title>
      <Subheading>{subheading}</Subheading>
    </View>
  );
}

const styles = StyleSheet.create({
    
    header: {
      padding: 20,
    },
    title: {
      marginTop: 20,
      fontSize: 30,
      fontFamily: "Montserrat",
      fontWeight: "bold",
    },
  });
  
