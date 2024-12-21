import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BarSegment {
  value: number; // Represents the proportional value for the segment
  style?: ViewStyle; // Custom styles for the segment (e.g., backgroundColor, borderRadius, etc.)
}

interface MulticolorBarProps {
  segments: BarSegment[]; // List of objects defining segments
  barHeight?: number; // Optional: Height of the entire bar
  barStyle?: ViewStyle; // Optional: Additional styles for the bar container
}

const MulticolorBar: React.FC<MulticolorBarProps> = ({
  segments,
  barHeight = 20, // Default height of the bar
  barStyle,
}) => {
  // Calculate the total value of all segments
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <View
      style={[
        styles.barContainer,
        { height: barHeight },
        barStyle, // Add optional styles for the bar
      ]}
    >
      {segments.map((segment, index) => {
        // Calculate the proportional width for each segment
        const widthPercentage = (segment.value / totalValue) * 100;

        return (
          <View
            key={index}
            style={[
              styles.segment,
              { width: `${widthPercentage}%` }, // Set proportional width
              segment.style, // Apply custom styles for each segment
            ]}
          />
        );
      })}
    </View>
  );
};

export default MulticolorBar;

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row', // Ensures segments are arranged horizontally
    width: '100%', // Bar takes the full width of the container
    overflow: 'hidden',
    borderRadius: 10, // Optional: Makes the bar edges rounded
    backgroundColor: '#e0e0e0', // Optional: Default background for the bar
  },
  segment: {
    height: '100%', // Each segment inherits the bar's height
  },
});
