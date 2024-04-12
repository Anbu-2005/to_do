import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  if (value != null) {
    return true;
  }
};

const MyStack = () => {
  const SignedIn = getIsSignedIn();
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("my");
    } catch (e) {
      console.log("logout");
    }

    console.log("Done.");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {SignedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const getData1 = async (email, password) => {
  console.log(email, password);
  try {
    const value = await AsyncStorage.getItem("my");
    if (value != null) {
      Alert.alert("alredy login");
    } else {
      let a = 1234;
      let b = 12345;
      if (email == a && password == b) {
        await AsyncStorage.setItem("my", password);
        await AsyncStorage.setItem("email", email);

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

  const handleLoginPress = () => {
    const loggedIn = getData1(email, password);
    if (loggedIn) {
      navigation.navigate("Profile", { name: "Welcome" });
    } else {
      Alert.alert("Invalid Password");
    }
  };
  const handleLoginPress1 = () => {
    navigation.navigate("Profile", { name: "Welcome" });
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
        {" "}
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
            <Text style={{ color: "white" }} Button></Text>
          </View>
        </TouchableOpacity>
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

  removeitem = async () => {
    try {
      await AsyncStorage.removeItem("my");
    } catch (e) {
      console.log("ajith");
    }

    console.log("Done.");
  };
  return (
    <View style={styles.containerProfile}>
      <Text style={styles.title}> Todo App</Text>
      <View style={styles.inputContainer1}>
        <TextInput
          style={styles.input}
          placeholder="ENTER TEXT"
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
        />

        {EditTodo ? (
          <Button title="update Todo" onPress={() => handleUpdateTodo()} />
        ) : (
          <Button
            title="Add Todo"
            onPress={() =>
              addToDo(textInputValue, setTodoList, todoList, setTextInputValue)
            }
          />
        )}
        <Button title="Logout" onPress={() => removeValue()} />
      </View>
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.text}>{item.text}</Text>
            <Button
              title="Update"
              onPress={() => startEditing(item)}
              style={styles.button1}
            />
            <Button
              title="Remove"
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
    width: "96%",
    alignItems: "center",
    color: "#ffffff",
  },
  inputField: {
    marginVertical: 20,
    width: "80%",
    height: 40,
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 20,
    color: "#000000",
  },

  //ProfileScreeen css styles
  containerProfile: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button1: {
    marginVertical: 5,
    backgroundColor: "#7db6a3",
    width: 20,
    alignSelf: "flex-start",
  },

  button: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#7db6a3",
    borderRadius: 5,
    alignSelf: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer1: {
    flexDirection: "row",
    marginBottom: 20,
  },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#F5F5DC",

    borderRadius: 5,
    width: "98%",
  },

  input: {
    marginBottom: 10,
    padding: 10,
    width: "70%",
  },
  text: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default MyStack;
