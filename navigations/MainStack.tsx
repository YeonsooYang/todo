import HeaderLeftButton from "@/components/HeaderLeftButton";
import HeaderRightButton from "@/components/HeaderRightButton";
import { PRIMARY, WHITE } from "@/src/colors";
import ListScreen from "@/src/screens/ListScreen";
import SettingsScreen from "@/src/screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

const MainStack = () => {
    return(
    <Stack.Navigator 
    screenOptions={{
      contentStyle:{backgroundColor:WHITE},
      headerTitleAlign:'center',
      headerTintColor:PRIMARY.DEFAULT,
      headerTitleStyle:{
        fontWeight:'700',
      },
     
      headerLeft: HeaderLeftButton,
    }}
    >
        <Stack.Screen 
        name="List" 
        component={ListScreen} 
        options={{
          title:'TODO List',
          headerRight: HeaderRightButton,
        }}
        />

    <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
};

export default MainStack;
