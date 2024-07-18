import UserContext, { useUserContext } from "@/contexts/UserContext"
import { useContext } from "react"
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";

const Navigation = () => {
    const {user} = useUserContext();

    return(
        <NavigationContainer independent={true}>
            {user ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default Navigation;