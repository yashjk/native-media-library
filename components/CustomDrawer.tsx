import { DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";

export const CustomDrawerComponent = () => {
	return (
		<>
			<DrawerItem label="Todo" onPress={() => router.push("/(todo)")} />
			<DrawerItem
				label="My Gallery"
				onPress={() => router.push("/(photoGallery)")}
			/>
		</>
	);
};
