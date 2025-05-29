import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreenHeaderProps } from "@typings/common";
import colors from "@utils/colors";

const Header = (props: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
        {props.leftIcon && props.leftIcon}
      <Text numberOfLines={1} style={styles.titleStyle}>
        {props.title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    gap: 8,

    // shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // for Android
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
  },
});
