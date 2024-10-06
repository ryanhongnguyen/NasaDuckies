import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UserTab from "./UserTab";
import SurveyScreen from "../screens/SurveyScreen";

const Stack = createStackNavigator();

export default function () {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        <Stack.Screen name="UserTab" component={UserTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}