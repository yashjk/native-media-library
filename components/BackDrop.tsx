import { StyleSheet } from "react-native";
import {
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

export const Backdrop = ({
	props,
	handleModalClose,
}: {
	props: BottomSheetBackdropProps;
	handleModalClose: () => void;
}) => (
	<BottomSheetBackdrop
		{...props}
		disappearsOnIndex={-1}
		appearsOnIndex={0}
		opacity={0.2}
		onPress={handleModalClose}
		style={[props.style, styles.backdrop]}
	/>
);

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "black",
	},
});
