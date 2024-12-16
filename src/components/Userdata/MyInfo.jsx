import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function MyInfo() {

  return (
    <>
      <View>
        <View style={styles.adContainer}>
          <Image
            source={{ uri: "https://i.postimg.cc/mg2f3bDq/template-3.jpg" }}
            style={styles.adImage}
            resizeMode="cover"
          />
        </View>
      </View>


      
    </>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    marginTop: 10,
  },
  adImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
});








