import { useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputSubmitEditingEventData,
	View,
	Dimensions,
} from "react-native";

export const AddTask = ({
	setTasks,
	tasks,
}: {
	setTasks: Function;
	tasks: string[];
}) => {
	const [currentTask, setCurrentTask] = useState("");

	const handleTaskAddition = (
		e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
	) => {
		e.preventDefault();
		setTasks([...tasks, currentTask]);
		setCurrentTask("");
	};

	return (
		<View>
			<TextInput
				onSubmitEditing={(e) => handleTaskAddition(e)}
				value={currentTask}
				style={styles.input}
				onChangeText={(text) => setCurrentTask(text)}
				placeholder="Add a task"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: Dimensions.get("window").width - 20,
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		margin: 10,
		padding: 10,
		borderRadius: 10,
	},
});
