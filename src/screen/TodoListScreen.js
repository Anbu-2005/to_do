import React, { useState } from "react";

import { Button, TextInput, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const handleLogoutPress1 = async () => {
  try {
    await AsyncStorage.removeItem("password");

    navigation.navigate("Home");
  } catch (error) {
    console.error("Error logging out: ", error);
  }
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
    <View style={{ flex: 1, padding: 20, backgroundColor: "#c0c0c0" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        My Tasks
      </Text>
      <View style={{ marginBottom: 20 }}>
        <Button title="LOG OUT" onPress={handleLogoutPress1} />
      </View>
      <TextInput
        style={{
          height: 55,
          borderColor: "#000000",
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: "#ffffff",
          borderRadius: 10,
        }}
        placeholder="ENTER TEXT"
        value={textInputValue}
        onChangeText={(text) => setTextInputValue(text)}
      />
      {EditTodo ? (
        <Button
          title="Update Todo"
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
        />
      )}
      <FlatList
        data={todoList}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              padding: 10,
              borderColor: "#000000",
              borderWidth: 3,
              borderRadius: 10,
              backgroundColor: "#ffffff",
            }}
          >
            <Text style={{ flex: 1 }}>{item.text}</Text>
            <Button
              title="Update"
              color="#c0c0c0"
              onPress={() => startEditing(item)}
            />
            <Button
              title="Remove"
              color="#c0c0c0"
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
