import UserContext, { UserProvider } from "@/contexts/UserContext";
import Navigation from "@/navigations/Navigation";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import 'react-native-get-random-values';


const Index = () => {
    const [user,setUser] = useState(null);

    return(
        <UserProvider>
            <StatusBar style="dark"/>
            <Navigation />
        </UserProvider>
    );
};


export default Index;