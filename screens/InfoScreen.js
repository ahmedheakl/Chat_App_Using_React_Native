import React, { useLayoutEffect } from "react";
import { Button } from "react-native";
import { View, Image } from "react-native";
import { Text } from "react-native-elements";

const InfoScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Get to Know the App",
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: "black" },
      headerTintColor: "coral",
      headerTitleStyle: { color: "coral" },
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 200, height: 200, marginBottom: 20 }}
        source={{ uri: "https://i.ibb.co/FzZFdqm/chatbot.png" }}
      />
      <Text
        style={{
          marginBottom: 20,
          width: 400,
          textAlign: "justify",
          fontSize: 20,
          fontStyle: "italic",
        }}
      >
        This app is created for users to share common knowledge through
        open-source chats. The chats can be seen by every user. Each user can
        contribute or reply to any chat.
      </Text>
      <Button
        title="Get Started!"
        onPress={() => navigation.navigate("HomeStack")}
      />
    </View>
  );
};

export default InfoScreen;
