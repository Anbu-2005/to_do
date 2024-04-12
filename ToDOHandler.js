import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "./config";
import { ref, set, get } from "firebase/database";

import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  const value = AsyncStorage.getItem("my");
  console.log(value);
  if (value !== null) {
    return true;
  } else {
    return false;
  }
};

const getIsSignedIn1 = async () => {
  await AsyncStorage.clear();
  const value = AsyncStorage.getItem("my");

  if (value == null) {
    return true;
  } else {
    return false;
  }
};

const MyStack = () => {
  let SignedIn = getIsSignedIn();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {SignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreenan}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen name="MyTasks" component={ProfileScreen} />
            <Stack.Screen name="Register" component={HomeScreen1} />
          </>
        ) : (
          <Stack.Screen name="Profile" component={ProfileScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const getData1 = async (email, password) => {
  console.log(email, password);
  try {
    await AsyncStorage.setItem("my", password);
    await AsyncStorage.setItem("email", email);
    const value = await AsyncStorage.getItem("my");
    console.log(value);

    if (value == null) {
      Alert.alert("alredy login");
    } else {
      await AsyncStorage.setItem("my", password);
      await AsyncStorage.setItem("email", email);
      if (email == headings && password == texts) {
        Alert.alert(" Login Succesfull");
      } else {
        Alert.alert(" Invalid password and Email");
      }
    }
  } catch (e) {
    console.log(error);
  }
};

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [headings, setHeadings] = useState([]);
  const [texts, setTexts] = useState([]);

  const getData2 = async (email, password) => {
    console.log(email, password);
    try {
      await AsyncStorage.setItem("my", password);
      await AsyncStorage.setItem("email", email);
      const value = await AsyncStorage.getItem("my");
      console.log(value);

      if (value == null) {
        Alert.alert("alredy login");
      } else {
        await AsyncStorage.setItem("my", password);
        await AsyncStorage.setItem("email", email);
        if (email == headings && password == texts) {
          Alert.alert(" Login Succesfull");
          navigation.navigate("MyTasks", { name: "Welcome" });
        } else {
          Alert.alert(" Invalid password and Email");
        }
      }
    } catch (e) {
      console.log(error);
    }
  };

  const handleLoginPress = () => {
    set(ref(db, "posts/" + email), {
      titl: email,
      bod: password,
    });

    const loggedIn = getData2(email, password);

    if (loggedIn) {
      if (headings == email && texts == password) {
      }
      console.log("yes");
    } else {
      Alert.alert("Invalid Password");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={email}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Register" onPress={navigate()} />

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
      </View>
    </View>
  );
};

const HomeScreenan = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [headings, setHeadings] = useState([]);
  const [texts, setTexts] = useState([]);

  const getData2 = async (email, password) => {
    console.log(email, password);
    var a = 1234;
    var b = 123;
    try {
      await AsyncStorage.setItem("my", password);
      await AsyncStorage.setItem("email", email);
      const value = await AsyncStorage.getItem("my");
      console.log(value);

      if (value == null) {
        Alert.alert("alredy login");
      } else {
        await AsyncStorage.setItem("my", password);
        await AsyncStorage.setItem("email", email);

        if (email == a && password == b) {
          Alert.alert(" Login Succesfull");
          navigation.navigate("MyTasks", { name: "Welcome" });
        } else {
          Alert.alert(" Invalid password and Email");
        }
      }
    } catch (e) {
      console.log(error);
    }
  };
  const navigate = () => {
    navigation.navigate("Register");
  };

  const handleLoginPress = () => {
    const loggedIn = getData2(email, password);

    if (loggedIn) {
      Alert.alert("Login Sucessfull");
    }
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={email}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
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
        <Button title="Regiter" onPress={navigate} />
      </View>
    </View>
  );
};

const HomeScreen1 = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [headings, setHeadings] = useState([]);
  const [texts, setTexts] = useState([]);

  const getData2 = async (email, password) => {
    console.log(email, password);
    try {
      await AsyncStorage.setItem("my", password);
      await AsyncStorage.setItem("email", email);
      const value = await AsyncStorage.getItem("my");
      console.log(value);

      if (value == null) {
        Alert.alert("alredy login");
      } else {
        Alert.alert(" Login Succesfull");
        navigation.navigate("MyTasks", { name: "Welcome" });
      }
    } catch (e) {
      console.log(error);
    }
  };

  const handleLoginPress = () => {
    set(ref(db, "posts/" + email), {
      titl: email,
      bod: password,
    });
    setEmail("");
    setPassword("");
  };
  const handleLoginPress1 = () => {
    const postsRef = ref(db, "posts/" + email);
    get(postsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            console.log("Title:", data.titl);
            console.log("Body:", data.bod);
          });
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          value={email}
          placeholder={"Email"}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputField}
          value={password}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
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
        <Button title="Check" onPress={handleLoginPress1} />
      </View>
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  const [textInputValue, setTextInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [EditTodo, SetEditTodo] = useState();

  const startEditing = (todo) => {
    SetEditTodo(todo);
    setTextInputValue(todo.text);
  };

  const handleUpdateTodo = () => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === EditTodo.id) {
        console.log(item.text, item.id);
        return { ...item, text: textInputValue };
      }
      return item;
    });
    setTodoList(updatedTodoList);
    SetEditTodo(null);
    setTextInputValue("");
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };
  const addToDo = (
    textInputValue,
    setTodoList,
    todoList,
    setTextInputValue
  ) => {
    if (textInputValue.trim() !== "") {
      const newTodo = { id: Date.now().toString(), text: textInputValue };
      setTodoList([...todoList, newTodo]);
      setTextInputValue("");
    }
  };
  const Logout1 = async () => {
    getIsSignedIn1();
    const value = AsyncStorage.getItem("my");
    await AsyncStorage.removeItem("my");

    console.log(value);
    if (value !== null) {
      await AsyncStorage.removeItem("my");

      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.containerProfile}>
      <Text style={styles.title}></Text>
      <View style={styles.inputContainer1}>
        <Button title="LOG OUT" onPress={Logout1}></Button>
        <TextInput
          style={styles.input}
          placeholder="ENTER TEXT"
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
        />

        {EditTodo ? (
          <Button
            title="update Todo"
            color="#87ceeb"
            onPress={() => handleUpdateTodo()}
          />
        ) : (
          <Button
            title="Add Todo"
            color="#87ceeb"
            onPress={() =>
              addToDo(textInputValue, setTodoList, todoList, setTextInputValue)
            }
            style={styles.button}
          />
        )}
      </View>

      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.text}>{item.text}</Text>
            <Button
              title="Update"
              color="#c0c0c0"
              onPress={() => startEditing(item)}
              style={styles.button1}
            />
            <Button
              title="Remove"
              color="#c0c0c0"
              style={styles.button1}
              onPress={() => removeTodo(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    width: "86%",
    alignItems: "center",
    color: "#ffffff",
  },
  inputField: {
    marginVertical: 20,
    width: "90%",
    height: 40,
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 20,
    color: "#000000",
  },

  //ProfileScreeen css styles
  containerProfile: {
    flex: 1,
    padding: 20,
    backgroundColor: "#c0c0c0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer1: {
    marginBottom: 20,
  },
  input: {
    height: 55,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  button: {
    marginBottom: 10,
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderColor: "#000000",
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  text: {
    flex: 1,
    fontSize: 12,
  },
  button1: {
    marginLeft: 10,
    alignItems: "center",
  },
});

export default MyStack;
