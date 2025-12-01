import { Stack } from "expo-router";
import "../app/global.css";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: "Home" }} />
    <Stack.Screen name="details" options={{ title: "Details", headerBackButtonDisplayMode: "minimal", presentation: "modal" }} />
  </Stack>;
}
