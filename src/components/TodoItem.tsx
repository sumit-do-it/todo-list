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
import AntDesign from '@expo/vector-icons/AntDesign';

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

  const onPress = useCallback(() => {
    openTask(item?.id);
  }, []);

  return (
    <Pressable style={[styles.itemContainer, containerStyle]} onPress={onPress}>
      {/* <View></View> */}
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.footer}>
        <AntDesign name="arrowright" size={20} color={colors.primary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.black
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});
