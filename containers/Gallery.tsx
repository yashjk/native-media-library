import { useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useMediaLibraryContext } from "@/hooks/useMediaLibrary";
import CameraModal from "@/components/CameraModal";
import Container from "@/containers/Container";
import DisplayImages from "@/components/DisplayImages";
import PhotoUploadDropdown from "@/components/PhotoUploadDropdown";
import { useCameraDevice } from "react-native-vision-camera";

export default function Gallery() {
	const [file, setFile] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);
	const { handleImageAddition } = useMediaLibraryContext();
	const device = useCameraDevice("back");

	console.log({ device });

	const handleGalleryPress = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			setIsCapturing(false);
			alert("Sorry, we need camera roll permissions to make this work!");
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				const selectedFile = result.assets[0]?.uri;
				setFile(selectedFile);
				handleImageAddition(selectedFile);
			}
		}

		console.log({ status });
	};

	const handleCameraPress = async () => {
		setIsCapturing(true);
	};

	const onCameraError = useCallback(() => {
		setIsCapturing(false);
	}, []);

	if (isCapturing && !device) {
		return (
			<CameraModal
				setIsCapturing={setIsCapturing}
				handleImageAddition={handleImageAddition}
				onCameraError={onCameraError}
			/>
		);
	}

	return (
		<BottomSheetModalProvider>
			<Container>
				<DisplayImages />

				<PhotoUploadDropdown
					handleCameraPress={handleCameraPress}
					handleGalleryPress={handleGalleryPress}
					cameraDevice={Boolean(device)}
				/>
			</Container>
		</BottomSheetModalProvider>
	);
}
