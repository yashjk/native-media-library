import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomBottomSheetModal from "./CustomBottomSheetModal";

export default function PhotoUploadDropdown({
	handleCameraPress,
	handleGalleryPress,
	cameraDevice,
}: {
	handleCameraPress: () => void;
	handleGalleryPress: () => void;
	cameraDevice: boolean;
}) {
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleModalClose = () => {
		bottomSheetModalRef.current?.dismiss();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handlePresentModalPress}>
				<Ionicons name="add" size={24} color="white" />
				<Text style={styles.buttonText}>Photo Upload</Text>
			</TouchableOpacity>

			<CustomBottomSheetModal
				bottomSheetModalRef={bottomSheetModalRef}
				handleModalClose={handleModalClose}
			>
				<Text style={styles.contentTitle}>Upload photo from?</Text>

				{cameraDevice && (
					<TouchableOpacity
						style={styles.dropdownButton}
						onPress={() => {
							handleModalClose();
							handleCameraPress();
						}}
					>
						<Ionicons name="camera-outline" size={24} color="white" />
						<Text style={styles.buttonText}>Camera</Text>
					</TouchableOpacity>
				)}

				<TouchableOpacity
					style={styles.dropdownButton}
					onPress={() => {
						handleModalClose();
						handleGalleryPress();
					}}
				>
					<Ionicons name="folder-outline" size={24} color="white" />
					<Text style={styles.buttonText}>Gallery</Text>
				</TouchableOpacity>
			</CustomBottomSheetModal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		borderTopColor: "lightgray",
		borderTopWidth: 1,
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	contentTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
	},
	button: {
		flexDirection: "row",
		backgroundColor: "black",
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
	backdrop: {
		...StyleSheet.absoluteFillObject,
		opacity: 0.5,
		backgroundColor: "black",
	},
});
