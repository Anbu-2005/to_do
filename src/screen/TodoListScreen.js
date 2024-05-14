import React, { useState, useEffect } from "react";
import {
  Button,
  TextInput,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const handleLogoutPress1 = async () => {
  try {
    await AsyncStorage.removeItem("password");

    navigation.navigate("Home");
  } catch (error) {
    console.error("Error ", error);
  }
};

const ProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const data = route.params?.data;
  const [textInputValue, setTextInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [EditTodo, SetEditTodo] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem("name1");
        if (value !== null) {
          setName(value);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const startEditing = (todo) => {
    SetEditTodo(todo);
    setTextInputValue(todo.text);
  };

  const handleUpdateTodo = () => {
    const updatedTodoList = todoList.map((item) => {
      if (item.id === EditTodo.id) {
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

  const addToDo = () => {
    if (textInputValue.trim() !== "") {
      const newTodo = { id: Date.now().toString(), text: textInputValue };
      setTodoList([...todoList, newTodo]);
      setTextInputValue("");
    }
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
      <View style={styles.container1}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Cochin",
            color: "#ffffff",
            left: "10%",
          }}
        >
          Hi, {name}
        </Text>
        <Text style={styles.title}>TODO LIST</Text>
      </View>

      <View style={styles.overlay}>
        <Pressable onPress={() => handleLogoutPress1(navigation)}>
          <Text style={styles.logout}>Log Out</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="ENTER TEXT"
          value={textInputValue}
          onChangeText={(text) => setTextInputValue(text)}
        />
        <View style={{ width: "50%", padding: 10 }}>
          {EditTodo ? (
            <Button
              title="Update Todo"
              color="#5c4cf3"
              onPress={handleUpdateTodo}
            />
          ) : (
            <Button title="Add Todo" color="#5c4cf3" onPress={addToDo} />
          )}
        </View>
        <FlatList
          data={todoList}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.text}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8994fc",
  },
  container1: {
    height: "20%",
    width: "100%",
    backgroundColor: "#8994fc",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    height: "80%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "#ffffff",
  },
  logout: {
    marginBottom: 10,
    color: "#5c4cf3",
    alignSelf: "flex-end",
  },
  input: {
    height: 45,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 15,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  todoText: {
    flex: 1,
    fontSize: 20,
  },
});

export default ProfileScreen;
