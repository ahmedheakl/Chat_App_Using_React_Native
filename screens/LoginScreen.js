import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "react-native";
import { Keyboard } from "react-native";
import { StyleSheet, Image, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { auth, db } from "../firebase";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useState(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);
  const _login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
      <StatusBar style="light" />
      <Image
        source={{ uri: "https://i.ibb.co/FzZFdqm/chatbot.png" }}
        style={styles.image}
      />
      <Input
        containerStyle={styles.inputText}
        placeholder="Email"
        type="email"
        autoFocus
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <Input
        containerStyle={styles.inputText}
        placeholder="Password"
        type="password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        onSubmitEditting={_login}
      />

      <Button containerStyle={styles.button} title="Login" onPress={_login} />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
        containerStyle={styles.button}
        type="outline"
      />
      <View style={{ padding: 20 }}></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  inputText: {
    width: 300,
    paddingTop: 10,
  },
  button: {
    width: 200,
    paddingTop: 5,
  },
});
export default LoginScreen;
