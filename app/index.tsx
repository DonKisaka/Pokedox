import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-500">Hello My Name Is Donald Kisaka.</Text>
      <Text className="text-blue-500">I am twenty 21 years old!.</Text>
    </View>
  );
}
