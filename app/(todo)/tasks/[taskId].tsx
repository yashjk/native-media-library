import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function Page() {
	const { taskId } = useLocalSearchParams();
	return (
		<View>
			<Text style={{ marginTop: 100 }}>{taskId}</Text>
		</View>
	);
}
