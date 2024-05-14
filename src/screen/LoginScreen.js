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
import {
  ref,
  getDocs,
  collection,
  deleteDoc,
  doc,
  set,
  get,
  remove,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreNameAsync = async (value) => {
  try {
    await AsyncStorage.setItem("name1", value);
  } catch (e) {
    console.log("error");
  }
};

const LoginScreen = ({ navigation }) => {
  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [email, setEmail] = useState("");

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const StoreData = async (password) => {
    try {
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log("error");
    }
  };

  const handleLoginPress = () => {
    const postsRef = ref(db, "posts/" + email);
    get(postsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let found = false;
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            console.log("Title:", data.title);
            console.log("Body:", data.body);
            console.log(data.bod);
            const password = data.body;
            const email1 = data.title;

            if (password === passwords && email1 === emails) {
              found = true;
            }
          });
          if (found) {
            StoreNameAsync(emails);
            alert("Login Successful");

            setEmails("");
            setPasswords("");
            StoreData(passwords);
            navigation.navigate("MyTasks", { name: "Welcome" });
          } else {
            alert("Invalid email or password");
          }
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
          height: "25%",
          width: "100",
          backgroundColor: "#130c32",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>LOGIN YOUR ACCOUNT</Text>
      </View>
      <View style={styles.overlay}>
        <View style={{ marginBottom: 20 }}>
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
        <View style={{ marginBottom: 45 }}>
          <Text style={{ fontsize: 20, left: "5%", fontWeight: "500" }}>
            Your Username
          </Text>

          <TextInput
            style={styles.input}
            value={emails}
            placeholder={"Username"}
            placeholderTextcolor="#fc2404"
            onChangeText={(text) => setEmails(text)}
          />
          <Text style={{ fontsize: 20, left: "5%", fontWeight: "500" }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            value={passwords}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPasswords(text)}
          />

          <TouchableOpacity onPress={handleLoginPress}>
            <View style={styles.loginButton}>
              <Text style={styles.loginButtonText}>LOG IN</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
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
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
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
    height: 50,
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

export default LoginScreen;
