import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  ViewStyle,
} from "react-native";
import { Todo } from "@typings/todo";
import { useTodo } from "@context/TodoContext";
import { SCREEN_WIDTH, TODO_LIST_ITEM_HEIGHT } from "@utils/constants";
import colors from "@utils/colors";
import useTaskHandler from "../hooks/useTaskHandler";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface TodoItemProps {
  item: Todo;
  containerStyle?: ViewStyle;
}

export const TodoItem: React.FC<TodoItemProps> = ({ item, containerStyle }) => {
  const { openTask } = useTaskHandler();
  const { toggleTodo, deleteTodo } = useTodo();

  const handleDelete = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => deleteTodo(item.id),
        style: "destructive",
      },
    ]);
  };

  const handleComplete = useCallback(() => {
    toggleTodo(item.id);
  }, []);

  const onPress = useCallback(() => {
    openTask(item?.id);
  }, []);

  return (
    <Pressable style={[styles.itemContainer, containerStyle]} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Pressable onPress={handleDelete} hitSlop={8} style={styles.deleteContainer}>
          <MaterialCommunityIcons
            name={"delete-outline"}
            size={20}
            color={colors.error}
          />
        </Pressable>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {item.description}
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable hitSlop={8} onPress={handleComplete}>
          <MaterialCommunityIcons
            name={
              item.completed
                ? "checkbox-multiple-marked-outline"
                : "checkbox-marked-outline"
            }
            size={20}
            color={item.completed ? colors.success : colors.black}
          />
        </Pressable>
        <AntDesign name="arrowright" size={20} color={colors.primary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contentContainer: { flex: 1, gap: 4 },
  itemContainer: {
    width: SCREEN_WIDTH / 2 - 6 - 16,
    height: TODO_LIST_ITEM_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.lightGreyBlue,
    gap: 4,
    padding: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.black,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.gray,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteContainer: {
    position: "absolute",
    height: 22,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreyBlue,
    right: 0,
    top: 0,
    zIndex: 2,
  },
});
