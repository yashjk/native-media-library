import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerComponent } from "./CustomDrawer";

export default function HamburgerDropdown() {
	return (
		<GestureHandlerRootView style={styles.drawer}>
			<Drawer drawerContent={() => <CustomDrawerComponent />}>
				<Drawer.Screen
					name="(todo)"
					options={{
						drawerLabel: "Todo",
						title: "Todo",
					}}
				/>

				<Drawer.Screen
					name="(photoGallery)"
					options={{
						drawerLabel: "My Gallery",
						title: "My Gallery",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	drawer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "black",
		width: 240,
	},
});
