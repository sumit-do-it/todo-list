import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default () => {
  const navigation = useNavigation();

  const openTask = useCallback((id?: string) => {
    navigation.navigate({ name: "TaskScreen", params: { id } } as never);
  }, []);

  return {openTask}
};
