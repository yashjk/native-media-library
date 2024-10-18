import { View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IContainerProps {
	children: ReactNode;
	styles?: ViewStyle;
}

export default function Container(props: IContainerProps) {
	const { top } = useSafeAreaInsets();

	return (
		<View style={[{ flex: 1, marginTop: top }, props.styles]}>
			{props.children}
		</View>
	);
}
