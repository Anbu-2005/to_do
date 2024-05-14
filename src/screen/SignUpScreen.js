import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { db } from "../../config";
import { ref, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const images = {
  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQaTIsDuPplTf34OCN5uiqOQLcK-9AYxNKjanb-z5jjU1drNOyQoRR9BZIWU_H6MXjTXc&usqp=CAU",
};
const StoreNameAsync = async (value) => {
  try {
    await AsyncStorage.setItem("name1", value);
  } catch (e) {
    console.log("error");
  }
};
const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");

  const StoreData = async (password) => {
    setPassword(password);
    try {
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log("error");
    }
  };

  const validateEmail = (text) => {
    setEmail1(text);
  };

  const handleLoginPress = () => {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!email || !password || !email1) {
      alert("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(email1)) {
      alert("Email is in an invalid format");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    set(ref(db, "posts/" + email), {
      title: email,
      body: password,
    });

    StoreNameAsync(email);
    navigation.navigate("MyTasks", { data: email });
    setEmail("");
    setPassword("");
    setEmail1("");
  };

  return (
    <View
      style={[
        styles.container,

        {
          flexDirection: "column",
        },
      ]}
    >
      <View
        style={{
          height: "30%",
          backgroundColor: "#130c32",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>SIGNUP YOUR ACCOUNT</Text>
      </View>

      <View style={styles.overlay}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              left: "5%",
              top: "1%",
            }}
          >
            Sign In
          </Text>
        </View>

        <Text style={{ fontsize: 15, left: "5%" }}>Your Username</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder={"Username"}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={{ fontsize: 15, left: "5%" }}>Email</Text>
        <TextInput
          style={styles.input}
          value={email1}
          placeholder={"Email"}
          onChangeText={(text) => validateEmail(text)}
        />
        <Text style={{ fontsize: 15, left: "5%" }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => StoreData(text)}
        />
        <TouchableOpacity onPress={handleLoginPress}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130c32",
  },

  overlay: {
    backgroundColor: "#ffffff",
    justifyContent: "center",

    alignSelf: "auto",
    flex: 1,

    borderTopStartRadius: 70,
    borderTopEndRadius: 70,
  },
  title: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontFamily: "Cochin",
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#cbcddf",
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 40,
    color: "#000",
    borderColor: "#000000",
    width: "90%",
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#130c32",

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  signupText: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
  },
  signupLink: {
    color: "#130c32",
    textAlign: "center",
    fontSize: "30",
    fontWeight: "bold",
  },
});

export default SignupScreen;
