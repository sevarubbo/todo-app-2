import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInScreen } from "./screens/sign-in";
import TodoScreen from "./screens/TodoScreen";
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
          <Stack.Screen
            name="Home"
            component={TodoScreen}
            options={{
              headerShown: true,
              title: "Todo List",
              headerRight: () => (
                <TouchableOpacity
                  style={styles.signOutButton}
                  onPress={() => auth.signOut()}
                >
                  <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          // User is not signed in
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    marginRight: 15,
  },
  signOutText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

registerRootComponent(App);
