import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ImageItem({
	item,
	handleLongPress,
}: {
	item: { uri: string };
	handleLongPress: Function;
}) {
	return (
		<View style={styles.imageContainer}>
			<TouchableOpacity onLongPress={() => handleLongPress(item as MediaProps)}>
				<Image source={{ uri: item.uri }} style={styles.image} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		position: "relative",
		padding: 10,
	},
	image: {
		height: 125,
		width: 125,
		borderRadius: 5,
	},
});
