import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import ListView from "../components/ListView";
import { auth, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsub;
  }, []);
  // Implement SignOut
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  //   Adjusting the Style of the naviagation
  const leftStyle = useLayoutEffect(() => {
    navigation.setOptions({
      title: "My App",
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "black",
      headerTitleStyle: { color: "black" },
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity onPress={signOut} style={{ paddingLeft: 10 }}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddChat");
          }}
          style={{ paddingRight: 10 }}
        >
          <Ionicons name="md-pencil" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        {chats.map(({ id, data: { chatName } }) => {
          return (
            <ListView
              key={id}
              id={id}
              chatName={chatName}
              enterChat={enterChat}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
