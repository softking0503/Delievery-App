import { View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#9A9A9A" />
      <TextInput
        style={styles.input}
        placeholder="Seach input..."
        placeholderTextColor="#9A9A9A"
      />
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F8",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    paddingLeft: 10,
  },
};
