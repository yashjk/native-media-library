import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Task = ({
	task,
	i,
	handleTaskDelete,
}: {
	task: string;
	i: number;
	handleTaskDelete: Function;
}) => {
	const [taskStatus, setTaskStatus] = useState(false);

	return (
		<View style={styles.task}>
			<TouchableOpacity onPress={() => setTaskStatus(!taskStatus)}>
				<View style={styles.taskStatus}>
					{taskStatus && <Text style={styles.tickMark}>✓</Text>}
				</View>
			</TouchableOpacity>
			<Text style={taskStatus ? styles.taskTextDone : styles.taskText}>
				{task}
			</Text>

			<Button title="Delete" onPress={() => handleTaskDelete(i)} />
		</View>
	);
};

const styles = StyleSheet.create({
	task: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	taskText: {
		fontSize: 20,
		margin: 10,
	},
	taskTextDone: {
		fontSize: 20,
		margin: 10,
		textDecorationLine: "line-through",
	},
	taskStatus: {
		width: 18,
		height: 18,
		backgroundColor: "lightgray",
		borderRadius: 4,
	},
	tickMark: {
		padding: 2,
		fontWeight: "bold",
	},
});
