import { RefObject, useCallback } from "react";
import { StyleSheet } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Backdrop } from "./BackDrop";

export default function CustomBottomSheetModal({
	children,
	bottomSheetModalRef,
	handleModalClose,
}: {
	children: React.ReactNode;
	bottomSheetModalRef: RefObject<BottomSheetModal>;
	handleModalClose: () => void;
}) {
	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<Backdrop props={props} handleModalClose={handleModalClose} />
		),
		[]
	);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			enableDynamicSizing
			onDismiss={() => handleModalClose()}
			backdropComponent={renderBackdrop}
		>
			<BottomSheetView style={styles.contentContainer}>
				{children}
			</BottomSheetView>
		</BottomSheetModal>
	);
}

const styles = StyleSheet.create({
	contentContainer: {
		position: "static",
		alignItems: "center",
		justifyContent: "center",
	},
});
