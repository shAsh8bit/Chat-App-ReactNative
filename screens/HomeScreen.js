import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CHATS",
      headerLeft: () => {
        return (
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar
                rounded
                source={{
                  uri:
                    auth?.currentUser?.photoURL ||
                    "https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png",
                }}
              />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: 70,
              marginRight: 10,
            }}
          >
            <TouchableOpacity activeOpacity={0.5}>
              <FontAwesome name="camera" size={23} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("AddChat")}
              activeOpacity={0.5}
            >
              <MaterialIcons name="chat" size={25} color="white" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
