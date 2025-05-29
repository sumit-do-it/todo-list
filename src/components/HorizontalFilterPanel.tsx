import {
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { FilterItem } from "@typings/todo";

interface HorizontalFilterPanelProps {
  items: FilterItem[];
  onSelect?: (itemId: FilterItem['id']) => void;
  initialSelectedId?: FilterItem['id'];
}

const HorizontalFilterPanel: React.FC<HorizontalFilterPanelProps> = ({
  items,
  onSelect,
  initialSelectedId,
}) => {
  const [selectedId, setSelectedId] = useState<FilterItem['id'] | undefined>(
    initialSelectedId
  );

  const handleSelect = (itemId: FilterItem['id']) => {
    setSelectedId(itemId);
    onSelect?.(itemId);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      {items.map((item) => (
        <Pressable
          hitSlop={8}
          key={item.id}
          onPress={() => handleSelect(item.id)}
          style={[
            styles.pill,
            selectedId === item.id
              ? styles.selectedPill
              : styles.unselectedPill,
          ]}
        >
          <Text
            style={[
              styles.pillText,
              selectedId === item.id
                ? styles.selectedText
                : styles.unselectedText,
            ]}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default HorizontalFilterPanel;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20, 
  },
  selectedPill: {
    backgroundColor: "#2196F3", // Material Blue
  },
  unselectedPill: {
    backgroundColor: "#E0E0E0", // Light Gray
  },
  pillText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  unselectedText: {
    color: "#757575", // Dark Gray
  },
});
