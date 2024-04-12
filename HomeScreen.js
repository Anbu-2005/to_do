import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  FlatList,
} from "react-native";

const Stack = createNativeStackNavigator();

const getIsSignedIn = () => {
  const value = AsyncStorage.getItem("my");
  console.log(value);
  if (value == null) {
    return true;
  }
};


const MyStack = () => {

  const SignedIn = getIsSignedIn();

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

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");

      if (email === storedEmail && password === storedPassword) {
        navigation.navigate("Profile");
      } else {
        Alert.alert("Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong, please try again later");
    }
  };

  return (
    <View style={styles.container}>
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
          secureTextEntry={true}
        />
        <Button title="Login" color="#2E8B57" onPress={handleLoginPress} />
      </View>
    </View>
  );
};

const ProfileScreen = () => {
  const [textInputValue, setTextInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todoList");
      setTodoList(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = () => {
    if (textInputValue.trim() !== "") {
      const newTodo = { id: Date.now().toString(), text: textInputValue };
      setTodoList([...todoList, newTodo]);
      saveData([...todoList, newTodo]);
      setTextInputValue("");
    }
  };

  const saveData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("todoList", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
    saveData(updatedTodoList);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
        placeholder="Enter Todo"
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.text}</Text>
            <Button
              title="Remove"
              onPress={() => handleRemoveTodo(item.id)}
              color="#FF6347"
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
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "80%",
  },
  inputField: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default MyStack;
