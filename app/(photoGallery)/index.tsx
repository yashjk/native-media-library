import Back from "@/components/Back";
import Gallery from "@/containers/Gallery";
import { MediaLibraryContextProvider } from "@/hooks/useMediaLibrary";

export default function Page() {
	return (
		<MediaLibraryContextProvider>
			<Gallery />
		</MediaLibraryContextProvider>
	);
}
