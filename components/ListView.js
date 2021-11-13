import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItem, Avatar, Text } from "react-native-elements";
import { db } from "../firebase";

export default function ListView({ id, chatName, enterChat }) {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => ({ data: doc.data() })));
      });

    return unsub;
  }, []);
  if (chatMessages.length !== 0) {
    return (
      <ListItem
        containerStyle={{
          backgroundColor: "black",
          marginBottom: 5,
          borderRadius: 10,
        }}
        onPress={() => enterChat(id, chatName)}
        key={id}
        bottomDivider
      >
        <Avatar
          rounded
          source={{
            uri: chatMessages[0].data.photoURL,
          }}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{ fontWeight: "bold", fontSize: 18, color: "coral" }}
          >
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: "white" }}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {chatMessages[0].data.displayName}
            </Text>
            : {chatMessages[0].data.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  } else {
    return (
      <View style={{ alignItems: "center" }}>
        <Text h4>Wait for Messages to Load!</Text>
      </View>
    );
  }
}
