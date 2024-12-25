import React, { useState, useRef } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

type Month = {
  id: number;
  name: string;
};

const getMonthName = (id: number): string => {
  const baseDate = new Date(); // Dec 2024
  const targetDate = new Date(baseDate.setMonth(baseDate.getMonth() + id));
  return targetDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
};

function formatMonth(date: Date): { key: string; label: string } {
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

interface HorizontalMonthPickerProps {
  onSelectMonth: (month: string) => void;
}

const HorizontalMonthPicker: React.FC<HorizontalMonthPickerProps> = ({
  onSelectMonth,
}) => {
  const initialMonths: Month[] = Array.from({ length: 11 }, (_, i) => {
    const id = i - 5; // 5 months before and 5 after the current months
    return { id, name: getMonthName(id) };
  });

  const [months, setMonths] = useState<Month[]>(initialMonths);
  const listRef = useRef<FlatList<Month>>(null);
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
    const newMonths: Month[] = [];

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

  const handleEndReached = ({
    distanceFromEnd,
  }: {
    distanceFromEnd: number;
  }) => {
    if (distanceFromEnd < 0) {
      loadMorePastMonths();
    } else {
      loadMoreFutureMonths();
    }
  };

  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // UseEffect to select the current date as selected
  React.useEffect(() => {

    const currentDate = new Date().toLocaleString("default", {
      month: "short",
      year: "numeric",
    })

    setSelectedMonth(currentDate)
    
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.x < 50 && !isLoading.current) {
      loadMorePastMonths();
    }
  };

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    // if ((typeof onSelectMonth === "function")) {
    //   console.log("Calling outside setFunction")
    //   onSelectMonth(month);
    // }
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
          onPress={() => handleSelectMonth(item.name)}
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
      onEndReached={handleEndReached}
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
