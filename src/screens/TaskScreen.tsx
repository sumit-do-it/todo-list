import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import colors from "@utils/colors";
import Header from "../components/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAppNavigation from "../hooks/useAppNavigation";
import useTaskScreen from "../hooks/useTaskScreen";
import { useRoute, RouteProp } from "@react-navigation/native";

type TaskScreenParams = {
  id?: string;
};

type TaskScreenRouteProp = RouteProp<{ TaskScreen: TaskScreenParams }, 'TaskScreen'>;

const TaskScreen: React.FC = () => {
  const { params } = useRoute<TaskScreenRouteProp>();
  const { titleRef, descriptionRef, scrollRef, title, description, setTitle, setDescription } =
    useTaskScreen({
      id: params?.id,
    });
  const { handleBack } = useAppNavigation();
  const backButton = () => {
    return (
      <Pressable hitSlop={8} onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title={"Your Task"} leftIcon={backButton()} />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.contentContainer}>
        <TextInput
          ref={titleRef}
          multiline
          style={styles.titleInput}
          placeholder="Enter your task title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          ref={descriptionRef}
          multiline
          style={styles.contentInput}
          placeholder="✍️"
          value={description}
          onChangeText={setDescription}
        />
        <View style={styles.footer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
  },
  titleInput: {
    paddingVertical: 8,
    minHeight: 62,
    fontSize: 28,
    fontWeight: "700",
    color: colors.black,
    lineHeight: 36,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  contentInput: {
    minHeight: 48,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: colors.gray,
  },
  footer: {
    height: 200,
  },
});
