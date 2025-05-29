import React, { useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useTodo } from "@context/TodoContext";
import { TodoItem } from "@components/TodoItem";
import { Todo } from "@typings/todo";
import HorizontalFilterPanel from "../components/HorizontalFilterPanel";
import colors from "../utils/colors";
import Header from "../components/Header";
import { SCREEN_WIDTH, TODO_LIST_ITEM_HEIGHT } from "@utils/constants";
import Feather from "@expo/vector-icons/Feather";
import useTaskHandler from "../hooks/useTaskHandler";

type ListItem = Todo | { id: "NEW" };

const TodoListScreen: React.FC = () => {
  const {openTask} = useTaskHandler();
  const { todos, filters, setCurrentFilter, loading } = useTodo();
  

  const data = useMemo<ListItem[]>(() => {
    return [{ id: "NEW" }, ...todos];
  }, [todos]);

  const headerElement = useMemo(() => {
    return <Header title={"Todo List"} />;
  }, []);

  const renderNewCard = useCallback(() => {
    return (
      <Pressable style={[styles.itemContainer, styles.newCardContainer]} onPress={()=>openTask()}>
        <Feather name="plus" size={36} color={colors.primary} />
        <Text style={styles.newText}>{"New Task"}</Text>
      </Pressable>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: ListItem; index: number }) => {
      if (item.id === "NEW") {
        return renderNewCard();
      }

      return <TodoItem item={item as Todo} containerStyle={index%2 ? {marginRight: 16}: {marginLeft: 16}} />;
    },
    []
  );

  const getItemLayout = (_, index) => {
    return {
      length: TODO_LIST_ITEM_HEIGHT,
      offset: (TODO_LIST_ITEM_HEIGHT + 12) * Math.floor(index / 2),
      index,
    };
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        {headerElement}
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {headerElement}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <HorizontalFilterPanel
            items={filters}
            onSelect={setCurrentFilter}
            initialSelectedId={filters[0]?.id}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    paddingBottom: 20,
    gap: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 16,
    gap: 12,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: SCREEN_WIDTH / 2 - 6 - 16,
    height: TODO_LIST_ITEM_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
  },
  newCardContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    marginLeft: 16,
  },
  newText: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
