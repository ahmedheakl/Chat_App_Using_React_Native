import React, { useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import firebase from "firebase";

export default function ChatScreen({ navigation, route }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const unsub = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return unsub;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL,
            }}
          />
          <Text
            style={{
              color: "coral",
              fontSize: 20,
              paddingLeft: 10,
              paddingTop: 6,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    setInput("");
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "auto"}
        style={styles.avoidView}
      >
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          {messages.map(({ id, data }) =>
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.receiver}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  position="absolute"
                  bottom={-15}
                  size={30}
                  right={-5}
                  rounded
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.receiverText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.sender}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  position="absolute"
                  bottom={-15}
                  size={30}
                  left={-5}
                  rounded
                  source={{
                    uri: data.photoURL,
                  }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        {/* </TouchableWithoutFeedback> */}
        <View style={styles.footer}>
          <TextInput
            placeholder="Write a Message"
            value={input}
            onChangeText={(text) => setInput(text)}
            style={styles.textInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "black",
    borderRadius: 30,
  },
  avoidView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
  },

  receiver: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "black",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "coral",
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 15,
  },
  receiverText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
});
