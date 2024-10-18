import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { AddTask } from "@/components/AddTask";
import { Task } from "@/components/Task";

export default function Home() {
	const [tasks, setTasks] = useState<string[]>([]);

	const handleTaskDelete = (i: number) => {
		const newTasks = [...tasks];
		newTasks.splice(i, 1);
		setTasks(newTasks);
	};

	return (
		<View style={styles.container}>
			<AddTask setTasks={setTasks} tasks={tasks} />

			<View style={{ width: "70%" }}>
				{tasks.map((task, i) => (
					<Link href={`/tasks/${task}`} key={`${task}-${i}`} asChild>
						<TouchableOpacity>
							<Task task={task} i={i} handleTaskDelete={handleTaskDelete} />
						</TouchableOpacity>
					</Link>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
