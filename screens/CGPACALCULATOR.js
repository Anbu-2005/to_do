import React, { useState } from "react";

import {
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const handleLogoutPress1 = async () => {
  try {
    await AsyncStorage.removeItem("password");

    navigation.navigate("Home");
  } catch (error) {
    console.error("Error ", error);
  }
};
const CGPACALCULATOR1 = () => {
  navigation.navigate("CGPACALCULATOR");
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

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
          alignSelf: "center",
        }}
      >
        TODO LIST
      </Text>

      <View style={{ marginBottom: 10 }}>
        <Pressable onPress={handleLogoutPress1}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
      
      <TextInput
        style={{
          height: 45,
          borderColor: "#000000",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: "#ffffff",
          borderRadius: 5,
        }}
        placeholder="ENTER TEXT"
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
      />
      <View style={{ width: "50%", padding: 10 }}>
        {EditTodo ? (
          <Button
            title="update Todo"
            color="#5c4cf3"
            onPress={() => handleUpdateTodo()}
          />
        ) : (
          <Button
            title="Add Todo"
            color="#5c4cf3"
            onPress={() =>
              addToDo(textInputValue, setTodoList, todoList, setTextInputValue)
            }
          />
        )}
      </View>
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              padding: 15,
              height: 50,
              borderColor: "#000000",
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#f2f2f2",
            }}
          >
            <Text style={{ flex: 1, fontSize: 20 }}>{item.text}</Text>

            <Button
              title="Edit"
              color="#5c4cf3"
              onPress={() => startEditing(item)}
            />

            <Button
              title="Remove"
              color="#5c4cf3"
              onPress={() => removeTodo(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProfileScreen;
