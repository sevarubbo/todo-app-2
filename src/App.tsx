import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "./screens/sign-in";
import { registerRootComponent } from "expo";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#fff" },
        }}
      >
        {user ? (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // User is not signed in
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Temporary HomeScreen component - you can move this to a separate file later
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Todo App!</Text>
      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

registerRootComponent(App);
