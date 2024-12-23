import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { last } from "rxjs";

type MonthItem = {
  key: string;
  label: string;
};

type HorizontalMonthPickerProps = {
  onSelectMonth: (month: string) => void; // Setter for selected month
};

const HorizontalMonthPicker: React.FC<HorizontalMonthPickerProps> = ({
  onSelectMonth,
}) => {
  const initialDate = new Date();
  const [months, setMonths] = useState<MonthItem[]>(() =>
    generateMonths(initialDate, 12, "forward")
  );

  const [selectedMonth, setSelectedMonth] = useState<string>(
    formatMonth(initialDate)
  );
  const flatListRef = useRef<FlatList<MonthItem>>(null);

  function generatePreviousMonths(baseDate: Date, count: number): MonthItem[] {
    const generatedMonths: MonthItem[] = [];

    // console.log("Base Date: ", baseDate.toDateString());

    for (let i = 1; i < count + 1; i++) {
      const date = new Date(baseDate);
      console.log("New Base Date: ", date.toDateString());
      date.setMonth(date.getMonth() - i); // Add months for forward generation
      const formattedObject = formatMonth(date);
      generatedMonths.push(formattedObject);
    }

    return generatedMonths;
  }
  // Helper to generate months
  function generateMonths(baseDate: Date, count: number): MonthItem[] {
    const generatedMonths: MonthItem[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date(baseDate);

      date.setMonth(date.getMonth() + i); // Add months for forward generation
      const formattedObject = formatMonth(date);
      generatedMonths.push(formattedObject);
    }

    return generatedMonths;
  }

  // Helper to format month as "Sep 2023"
  function formatMonth(date: Date): MonthItem {
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

  // Add previous months when scrolling right
  const addPreviousMonths = () => {
    const firstMonth = months[0];

    const [month, year] = firstMonth.key.split(" ");
    const baseDate = new Date(parseInt(year), parseInt(month) - 1);
    const previousDate = generatePreviousMonths(baseDate, 12).reverse();

    setMonths((prev) => [...previousDate, ...prev]);

    return previousDate.length
  };

  // Add upcoming months when scrolling left
  const addUpcomingMonths = () => {
    const lastMonth = months[months.length - 1];
    const [month, year] = lastMonth.key.split(" ");

    const baseDate = new Date(parseInt(year), parseInt(month));
    const upcomingMonths = generateMonths(baseDate, 12);
    setMonths((prev) => [...prev, ...upcomingMonths]);
  };

  // Handle scroll events to detect direction
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

    console.log("Content Offset: ", contentOffset);
    console.log("Content Size: ", contentSize);
    console.log("Layout Measurement: ", layoutMeasurement);
    if (contentOffset.x + layoutMeasurement.width >= contentSize.width - 50) {
      addUpcomingMonths();
    } else if (contentOffset.x <= 50) {
        //  = months.length;
        const previousLength = addPreviousMonths();
    restoreScrollOffset(previousLength, layoutMeasurement.width);

    }
  };

  // Handle selection of a month
  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    onSelectMonth(month);
  };
  const scrollOffset = useRef(0);

  const restoreScrollOffset = (newItemsCount, contentWidth) => {
    if (flatListRef.current) {
      const itemWidth = 500; // Adjust based on your item width
      const newOffset = scrollOffset.current + newItemsCount * itemWidth;
      flatListRef.current.scrollToOffset({
        offset: newOffset,
        animated: false,
      });
    }
  };

  return (
    <FlatList
      ref={flatListRef}
      initialScrollIndex={9}
      horizontal
      data={months}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleSelectMonth(item.label)}
          style={[
            styles.capsule,
            selectedMonth === item.label && styles.selectedCapsule,
          ]}
        >
          <Text
            style={[
              styles.capsuleText,
              selectedMonth === item.label && styles.selectedCapsuleText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={20} // Increase sensitivity
      extraData={months}
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
