import { FilterItem } from "@typings/todo";
import { Dimensions } from "react-native";

export const TodoListFilters: FilterItem[] = [
  {
    id: "ALL",
    label: "All",
  },
  { id: "PENDING", label: "Pending" },
  { id: "COMPLETED", label: "Completed" },
];

export const TODO_LIST_ITEM_HEIGHT = 150;

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')
