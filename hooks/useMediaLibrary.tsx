import { storage } from "@/store/mediaStore";
import { createContext, useContext, useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";

const MediaLibraryContext = createContext<{
	handleImageAddition: (selectedFile: string) => Promise<void>;
	handleImageDelete: (item: MediaProps) => Promise<void>;
	mediaList: Record<string, MediaProps>;
}>({
	handleImageAddition: async () => {},
	handleImageDelete: async () => {},
	mediaList: {},
});

function useMediaLibrary() {
	const [mediaList, setMediaList] = useState<Record<string, MediaProps>>({});

	useEffect(() => {
		const loadImages = async () => {
			try {
				const hasImages = await storage.contains("images");

				if (hasImages) {
					const jsonFiles = await storage.getString("images");
					if (jsonFiles) {
						const files = await JSON.parse(jsonFiles!);
						setMediaList(files);
					}
				}
			} catch (error) {
				console.log(error);
			}
		};

		loadImages();
	}, []);

	const handleImageAddition = async (selectedFile: string) => {
		try {
			const { id, filename, uri } = await MediaLibrary.createAssetAsync(
				selectedFile
			);

			const updatedMediaList = {
				...mediaList,
				[filename]: { id, uri, name: filename },
			};

			setMediaList(updatedMediaList);

			storage.delete("images");
			storage.set("images", JSON.stringify(updatedMediaList));
		} catch (error) {
			console.log(error);
		}
	};

	const handleImageDelete = async (item: MediaProps) => {
		try {
			await MediaLibrary.deleteAssetsAsync([item.id]);
			setMediaList((prev) => {
				const { [item.name]: _, ...remainingMediaList } = prev;

				storage.delete("images");
				storage.set("images", JSON.stringify(remainingMediaList));

				return { ...remainingMediaList };
			});
		} catch (error) {
			console.log(error);
		}
	};

	return { mediaList, handleImageDelete, handleImageAddition };
}

export const MediaLibraryContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const mediaLibraryHelpers = useMediaLibrary();

	return (
		<MediaLibraryContext.Provider value={mediaLibraryHelpers}>
			{children}
		</MediaLibraryContext.Provider>
	);
};

export const useMediaLibraryContext = () => {
	return useContext(MediaLibraryContext);
};
