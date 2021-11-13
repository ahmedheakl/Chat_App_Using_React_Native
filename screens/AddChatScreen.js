import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../firebase";
import firebase from "firebase";

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a New Chat",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "coral",
      headerTitleStyle: { color: "coral" },
    });
  }, [navigation]);

  const addNewMessage = (id) => {};

  const _addChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: chat,
      })
      .then(() => {
        db.collection("chats").onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.data().chatName == chat) {
              db.collection("chats").doc(doc.id).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: "A new Chat is Created",
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
              });
            }
          });
        });

        setChat("");
        navigation.goBack();
      });

    //
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ flexDirection: "row", marginLeft: 20 }}>
        <Ionicons
          name="chatbox"
          style={{ marginTop: 10 }}
          size={24}
          color="black"
        />
        <Input
          autoFocus
          value={chat}
          onChangeText={(text) => setChat(text)}
          placeholder="Write the name of the chat"
          style={styles.input}
        />
      </View>

      <View style={styles.button}>
        <Button color="orange" title="Add Chat" onPress={_addChat} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  input: {
    width: 250,
    marginBottom: 5,
  },
  button: {
    width: 200,
    paddingTop: 5,
  },
});

export default AddChatScreen;
