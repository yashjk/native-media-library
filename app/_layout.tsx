import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer initialRouteName="(todo)">
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
