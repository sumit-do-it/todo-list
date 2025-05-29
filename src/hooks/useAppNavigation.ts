import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export default () => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);

  return {handleBack}
};
