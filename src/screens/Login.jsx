import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { login } from "../api1/UserAPI";
import ErrorModal from "../modals/error";
import SuccessModal from "../modals/success";
import WarningModal from "../modals/warningmodal";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      setModalMessage("All fields are required.");
      setWarningModalVisible(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setWarningModalVisible(true);
      return;
    }

    setLoading(true);

    const result = await login({ email, password }, dispatch);
    setLoading(false);

    if (result.success) {
      setModalMessage(result.message);
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("Home");
      }, 2000);
    } else {
      setModalMessage(result.message);
      setErrorModalVisible(true);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className="mt-10 p-3 space-y-3 flex-1">
      <View className="flex-row items-center mb-10">
        <Text className="text-xl font-bold text-gray-700 ml-3">Login</Text>
      </View>
      <View className="flex-1 justify-center px-5">
        <View>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-3 mb-4 text-base"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View className="relative">
            <TextInput
              className="border border-gray-300 rounded-lg px-3 py-3 mb-4 text-base"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={toggleShowPassword}
              className="absolute right-3 top-[17px]"
            >
              <FeatherIcon
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#4C5058"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={handleForgotPassword} className="mb-6">
          <Text className="text-left text-blue-500 ml-2">Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-800 py-3 rounded-lg justify-center items-center"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-bold text-lg">Login</Text>
          )}
        </TouchableOpacity>
        <View className="mt-6 flex items-center justify-center flex-row w-full">
          <Text className="text-gray-600">Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="text-blue-500 ml-2 text-[15px]">Sign Up</Text>
          </TouchableOpacity>
        </View>
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
      <WarningModal
        visible={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}
