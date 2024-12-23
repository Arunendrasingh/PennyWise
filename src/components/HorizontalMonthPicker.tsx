import React, { useState, useRef } from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";

type MonthItem = {
  key: string;
  label: string;
};

type HorizontalMonthPickerProps = {
  onSelectMonth: (month: string) => void; // Setter for selected month
};

const getMonthName = (id) => {
  const baseDate = new Date(2024, 11, 1); // Dec 2024
  const targetDate = new Date(baseDate.setMonth(baseDate.getMonth() + id));
  return targetDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
};
function formatMonth(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error(`Invalid Date: ${date}`);
  }
  const label = `${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()}`;

  const indexFormattedMonth = `${date.toLocaleString("default", {
    month: "numeric",
  })} ${date.getFullYear()}`;

  return { key: indexFormattedMonth, label };
}

const HorizontalMonthPicker: React.FC<HorizontalMonthPickerProps> = ({
  onSelectMonth,
}) => {
  const initialMonths = Array.from({ length: 11 }, (_, i) => {
    const id = i - 5; // 5 months before and 5 after the current months
    return { id, name: getMonthName(id) };
  });

  const [months, setMonths] = useState<MonthItem[]>(initialMonths);
  const listRef = useRef(null);
  const isLoading = useRef(false);

  const loadMoreFutureMonths = () => {
    const lastMonth = months[months.length - 1];
    const newMonths = [];

    for (let i = 1; i <= 3; i++) {
      const nextId = lastMonth.id + i;
      newMonths.push({ id: nextId, name: getMonthName(nextId) });
    }

    setMonths([...months, ...newMonths]);
  };

  const loadMorePastMonths = () => {
    if (isLoading.current) return;
    isLoading.current = true;

    const firstMonth = months[0];
    const newMonths = [];

    for (let i = 1; i <= 3; i++) {
      const prevId = firstMonth.id - i;
      newMonths.unshift({ id: prevId, name: getMonthName(prevId) });
    }

    setMonths((prevMonths) => [...newMonths, ...prevMonths]);

    // Ensure view doesn't shift after prependin
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollToIndex({
          index: newMonths.length + 5,
          animated: false,
          // viewPosition: 0,
          // viewOffset: -20,
        });
      }
      isLoading.current = false;
    }, 0);
  };

  const handleEndReached = ({ distanceFromEnd }) => {
    if (distanceFromEnd < 0) {
      loadMorePastMonths();
    } else {
      loadMoreFutureMonths();
    }
  };

  const [selectedMonth, setSelectedMonth] = useState<string>(false);
  // Handle scroll events to detect direction
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x < 70 && !isLoading.current) {
      loadMorePastMonths();
    }
  };

  // Handle selection of a month
  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    onSelectMonth(month);
  };

  return (
    <FlatList
      ref={listRef}
      initialScrollIndex={5}
      horizontal
      data={months}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleSelectMonth(item.label)}
          style={[
            styles.capsule,
            selectedMonth === item.name && styles.selectedCapsule,
          ]}
        >
          <Text
            style={[
              styles.capsuleText,
              selectedMonth === item.name && styles.selectedCapsuleText,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={20}
      getItemLayout={(data, index) => ({
        length: 100,
        offset: 100 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
  },
  capsule: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  selectedCapsule: {
    backgroundColor: "#007bff",
  },
  capsuleText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCapsuleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HorizontalMonthPicker;
