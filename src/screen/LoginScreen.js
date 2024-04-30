import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
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

const LoginScreen = ({ navigation }) => {
  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [email, setEmail] = useState("");
  const navigate = () => {
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
            console.log("Title:", data.titl);
            console.log("Body:", data.bod);
            console.log(data.bod);
            const password = data.bod;
            const email1 = data.titl;

            if (password === passwords && email1 === emails) {
              found = true;
            }
          });
          if (found) {
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        LOGIN YOUR ACCOUNT
      </Text>
      <Text style={{ textAlign: "left", color: "red" }}>Welcome back</Text>
      <View style={{ width: "86%", alignItems: "center", color: "#ffffff" }}>
        <TextInput
          style={{
            marginVertical: 20,
            width: "90%",
            height: 40,
            borderWidth: 3,
            borderRadius: 5,
            paddingHorizontal: 20,
            color: "#000000",
          }}
          value={emails}
          placeholder={"Username"}
          onChangeText={(text) => setEmails(text)}
        />
        <TextInput
          style={{
            marginVertical: 20,
            width: "90%",
            height: 40,
            borderWidth: 3,
            borderRadius: 5,
            paddingHorizontal: 20,
            color: "#000000",
          }}
          value={passwords}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPasswords(text)}
        />
        <TouchableOpacity onPress={handleLoginPress}>
          <View
            style={{
              backgroundColor: "#1e90ff",
              width: 250,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 7,
              marginBottom: 70,
              padding: 10,
            }}
          >
            <Text style={{ color: "white" }}>LOG IN</Text>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>Already have an Account?</Text>
        <TouchableOpacity onPress={navigate}>
          <Text style={{ color: "#1e90ff", marginTop: 5 }}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
