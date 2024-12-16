import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { register } from "../api1/UserAPI";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import WarningModal from "../modals/warningmodal";
import * as DocumentPicker from "expo-document-picker";
import FormData from "form-data";
import * as FileSystem from 'expo-file-system';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const file = result.assets[0];
      const fileType = file.mimeType;
      const fileSize = file.size;

      if (!ALLOWED_FILE_TYPES.includes(fileType)) {
        setModalMessage(
          "Invalid file type. Only PDF, JPEG, and PNG are allowed."
        );
        setWarningModalVisible(true);
        return;
      }

      if (fileSize > MAX_FILE_SIZE) {
        setModalMessage("File size exceeds the limit of 5MB.");
        setWarningModalVisible(true);
        return;
      }

      setFile(file);
    } else {
      console.error("No file was selected.");
    }
  };

  const handleSignUp = async () => {
    if (loading) return;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      setModalMessage("All fields are required.");
      setWarningModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setWarningModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setWarningModalVisible(true);
      return;
    }

    if (!file) {
      setModalMessage("Please upload a file.");
      setWarningModalVisible(true);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", phoneNumber);
    formData.append("password", password);

    const fileInfo = await FileSystem.getInfoAsync(file.uri);
    formData.append("file", {
      uri: fileInfo.uri,
      type: file.mimeType || "application/octet-stream",
      name: file.name || "uploaded_file"
    });

    try {
      const result = await register(formData);

      if (result.success === true) {
        setModalMessage(result.message);
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
        setModalMessage(result.message);
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error("Error in signup:", error);
      setModalMessage("An unexpected error occurred.");
      setErrorModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex w-full h-[100%] px-4">
      <View className="flex-row items-center mb-10 absolute top-14 left-5">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#4C5058" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-700 ml-3">Sign Up</Text>
      </View>
      <View className="mt-32 p-1 space-y-4 flex-1">
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          editable={!loading}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          editable={!loading}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="Phone Number(e.x. 1953546785)"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-3 text-base"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          editable={!loading}
        />
        
        <TouchableOpacity className="bg-gray-800 py-3 rounded-lg justify-center items-center" onPress={handleFileUpload}>
          {file ? (
            <Text className="text-white font-bold text-lg">
              Selected Driver's license
            </Text>
          ) : (
            <Text className="text-white font-bold text-lg">Upload Driver's license</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity className="bg-gray-800 py-3 rounded-lg justify-center items-center" onPress={handleSignUp} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Sign Up</Text>
          )}
        </TouchableOpacity>
      </View>

      <SuccessModal visible={modalVisible} onClose={() => setModalVisible(false)} message={modalMessage} />
      <ErrorModal visible={errorModalVisible} onClose={() => setErrorModalVisible(false)} message={modalMessage} />
      <WarningModal visible={warningModalVisible} onClose={() => setWarningModalVisible(false)} message={modalMessage} />
    </ScrollView>
  );
}
