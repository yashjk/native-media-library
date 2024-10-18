import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
	Camera,
	useCameraDevice,
	useCameraPermission,
} from "react-native-vision-camera";
import { Ionicons } from "@expo/vector-icons";

export default function CameraModal({
	setIsCapturing,
	handleImageAddition,
	onCameraError,
}: {
	setIsCapturing: React.Dispatch<React.SetStateAction<boolean>>;
	handleImageAddition: (selectedFile: string) => Promise<void>;
	onCameraError: () => void;
}) {
	const [cameraType, setCameraType] = useState<"front" | "back">("front");
	const device = useCameraDevice(cameraType);
	const camera = useRef<Camera>(null);
	const { hasPermission } = useCameraPermission();

	if (!hasPermission) {
		alert("Sorry, we need camera permissions to make this work!");
		return;
	}

	const capturePhoto = async () => {
		if (camera.current !== null) {
			const rawImage = await camera.current.takePhoto({});
			handleImageAddition(rawImage.path);
			setIsCapturing(false);
		}
	};

	return (
		<View style={styles.cameraContainer}>
			<Camera
				ref={camera}
				style={StyleSheet.absoluteFill}
				isMirrored={false}
				outputOrientation="preview"
				device={device!}
				photo={true}
				isActive={true}
				onError={() => {
					console.log("Camera Error");

					onCameraError();
				}}
			/>

			<TouchableOpacity
				style={styles.camBack}
				onPress={() => setIsCapturing(false)}
			>
				<Ionicons name="arrow-back" size={30} color="white" />
			</TouchableOpacity>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.cameraFlip}
					onPress={() =>
						setCameraType(cameraType === "front" ? "back" : "front")
					}
				>
					<Ionicons name="camera-reverse" size={40} color="white" />
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.camButton}
					onPress={() => capturePhoto()}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
		position: "relative",
	},
	buttonContainer: {
		backgroundColor: "rgba(0,0,0,0.2)",
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		bottom: 0,
		padding: 20,
	},
	cameraFlip: {
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		marginBottom: 10,
		position: "absolute",
		left: 20,
		bottom: 25,
	},
	camButton: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: "#B2BEB5",
		alignSelf: "center",
		borderWidth: 4,
		borderColor: "white",
	},
	camBack: {
		alignSelf: "center",
		position: "absolute",
		backgroundColor: "black",
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		borderRadius: 10,
		left: 5,
		top: 10,
	},
});
