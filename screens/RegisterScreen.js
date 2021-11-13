import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, StatusBar, Button, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  // Define States for Input Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Changing the layout of hte header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const _register = () => {
    const unsub = auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageURL ||
            "https://concretesmartlights.com/assets/img/faces/francesco.jpg",
        });
      })
      .catch((err) => alert(err.message));
    setImageURL("");
    setName("");
    setPassword("");
    setEmail("");
    navigation.navigate("Home");
    return unsub;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 20 }}>
        Create a New User
      </Text>
      <Input
        autofocus
        placeholder="Full Name"
        type="text"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        type="password"
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Input
        placeholder="Image URL (OPTIONAL)"
        type="text"
        value={imageURL}
        onChangeText={(text) => {
          setImageURL(text);
        }}
      />
      <View style={{ width: 200 }}>
        <Button title="Register" color="orange" onPress={_register} />
      </View>
      <View style={{ padding: 30 }}></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
