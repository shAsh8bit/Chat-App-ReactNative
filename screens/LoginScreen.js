import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Image, Input } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  return (
    <>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Image
            source={{
              uri: "https://logosarchive.com/wp-content/uploads/2021/07/Whatsapp-logo-icon-transparent.png",
            }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              autoFocus
              type="email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              type="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={signIn}
            />
          </View>
          <Button
            containerStyle={styles.button}
            buttonStyle={{
              backgroundColor: "#00bfa5",
            }}
            title="Login"
            onPress={signIn}
          />
          <Button
            containerStyle={styles.button}
            buttonStyle={{
              borderColor: "#00bfa5",
            }}
            titleStyle={{ color: "#00bfa5" }}
            onPress={() => navigation.navigate("Register")}
            type="outline"
            title="Register"
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
