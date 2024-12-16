import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { updateUser } from "../api1/UserAPI";
import SuccessModal from "../modals/success";
import ErrorModal from "../modals/error";


export default function EditProfileScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId } = route.params;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const [imageUri, setImageUri] = useState(
    "https://i.postimg.cc/rwj0LpfX/man.jpg"
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          setIsLoggedIn(true);
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmailInput(user.email);
          setPhoneNumberInput(user.phone_number);
          // setUsernameInput(user.name);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch token", error);
      }
    };

    checkToken();
  }, []);

  const handleSave = async () => {
    try {
      const userData = {
        firstName: FirstName,
        lastName: LastName,
        email: emailInput,
        phone_number: phoneNumberInput,
      };
      const storedUserData = await AsyncStorage.getItem("userData");
      let parsedUserData = {};
      if (storedUserData) {
        parsedUserData = JSON.parse(storedUserData);
      }
      if (
        parsedUserData.firstName === FirstName &&
        parsedUserData.lastName === LastName &&
        parsedUserData.email === emailInput &&
        parsedUserData.phone_number === phoneNumberInput
      ) {
        setModalMessage("No change!");
        setErrorModalVisible(true);
        return;
      }

      const result = await updateUser(userId, userData);

      if (result && result.success) {
        const updatedUserData = {
          ...parsedUserData,
          ...userData,
        };

        dispatch(setUser({ ...updatedUserData }));

        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData));

        setModalMessage(result.message);
        setModalVisible(true);
        setTimeout(() => {
        navigation.navigate("UserInfoScreen");
        }, 2000);
      } else {
        setModalMessage(result.message);
        setErrorModalVisible(true);
        navigation.navigate("UserInfoScreen");
      }
    } catch (error) {
      console.error("Error while saving profile:", error);
      alert("An error occurred while saving the profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#4C5058" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>
      <View style={styles.profileSection}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={styles.input}
            value={FirstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            value={LastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            value={FirstName + " " + LastName}
            editable={false}
            selectTextOnFocus={false}
            placeholder="Username"
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={emailInput}
            onChangeText={setEmailInput}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={phoneNumberInput}
            onChangeText={setPhoneNumberInput}
            placeholder="Phone Number"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4C5058",
    marginLeft: 10,
  },
  profileSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFC6AE",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4C5058",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
