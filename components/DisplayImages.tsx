import { useCallback, useMemo, useRef } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Text,
	TouchableOpacity,
} from "react-native";
import ImageItem from "./ImageItem";
import { useMediaLibraryContext } from "@/hooks/useMediaLibrary";
import { Ionicons } from "@expo/vector-icons";
import CustomBottomSheetModal from "./CustomBottomSheetModal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export default function DisplayImages() {
	const { mediaList, handleImageDelete } = useMediaLibraryContext();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const itemToBeDeleted = useRef<MediaProps | null>(null);

	const allImages = useMemo(() => Object.values(mediaList), [mediaList]);

	const handleLongPress = (item: MediaProps) => {
		console.log(item, "inside handleLongPress");
		itemToBeDeleted.current = item;
		bottomSheetModalRef.current?.present();
	};

	const handleModalClose = () => {
		bottomSheetModalRef.current?.dismiss();
	};

	const handleImageDeletion = () => {
		handleImageDelete(itemToBeDeleted.current!);
		handleModalClose();
	};

	return (
		<View style={styles.container}>
			<View style={styles.imagesContainer}>
				<FlatList
					data={allImages}
					numColumns={2}
					renderItem={({ item }) => (
						<ImageItem
							item={item as MediaProps}
							handleLongPress={handleLongPress}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>

			<CustomBottomSheetModal
				bottomSheetModalRef={bottomSheetModalRef}
				handleModalClose={handleModalClose}
			>
				<Text style={styles.contentTitle}>
					Do you want to delete the selected photo?
				</Text>
				<TouchableOpacity
					style={styles.dropdownButton}
					onPress={handleImageDeletion}
				>
					<Ionicons name="trash" size={24} color="white" />
					<Text style={styles.buttonText}>Delete</Text>
				</TouchableOpacity>
			</CustomBottomSheetModal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imagesContainer: {
		flex: 1,
		padding: 40,
	},
	contentTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	button: {
		flexDirection: "row",
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		marginHorizontal: 20,
		borderRadius: 10,
	},
	buttonText: {
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
		paddingLeft: 10,
	},
	dropdownButton: {
		width: "80%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
		flexDirection: "row",
		borderRadius: 10,
		padding: 10,
		marginVertical: 10,
	},
});
