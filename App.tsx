import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { TodoProvider } from "@context/TodoContext";
import TodoListScreen from "@screens/TodoListScreen";
import TaskScreen from "@screens/TaskScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "@utils/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <TodoProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent
            backgroundColor={"transparent"}
            barStyle={"dark-content"}
          />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="TodoListScreen"
            >
              <Stack.Screen
                name={"TodoListScreen"}
                component={TodoListScreen}
              />
              <Stack.Screen name={"TaskScreen"} component={TaskScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </TodoProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
