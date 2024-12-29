import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            height: 70, // Increase the height of the tab bar
            paddingBottom: 5, // Add space at the bottom
            paddingTop: 5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarActiveTintColor: "#65a30d",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Credit",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="plus.circle.fill" color={color} />
          ),
          tabBarActiveTintColor: "#65a30d",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="remove"
        options={{
          title: "Debit",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="minus.circle.fill" color={color} />
          ),
          tabBarActiveTintColor: "#65a30d",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
          tabBarActiveTintColor: "#65a30d",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
        }}
      />
    </Tabs>
  );
}
