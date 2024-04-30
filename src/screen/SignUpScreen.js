import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { db } from "../../config";
import { ref, set, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const handleLoginPress1 = () => {
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
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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
      alert("Email is  invalid format");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters ");
      return;
    }

    set(ref(db, "posts/" + email), {
      title: email,
      body: password,
    });

    navigation.navigate("MyTasks", { name: "Welcome" });
    setEmail("");
    setPassword("");
    setEmail1("");
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
        Register Your ACCOUNT
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
          value={email}
          placeholder={"Username"}
          onChangeText={(text) => setEmail(text)}
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
          value={email1}
          placeholder={"Email"}
          onChangeText={(text) => validateEmail(text)}
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
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => StoreData(text)}
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
            <Text style={{ color: "white" }}>Register</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignupScreen;
