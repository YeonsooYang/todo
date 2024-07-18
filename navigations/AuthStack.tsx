
import {  WHITE } from "@/src/colors";
import SignInScreen from "@/src/screens/SignInScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
    return(
    <Stack.Navigator 
    screenOptions={{
      contentStyle:{backgroundColor:WHITE},
      headerShown:false,
    }}
    >

        <Stack.Screen name="SignIn" component={SignInScreen}/>
      </Stack.Navigator>
    );
};

export default AuthStack;
