import Button, { ButtonTypes } from "@/components/Button";
import { useUserContext } from "@/contexts/UserContext";
import { StyleSheet, Text, View } from "react-native"

const SettingsScreen = () => {
    const {setUser} = useUserContext();
    return (
        <View style={styles.container}>
            <Button
            title="로그아웃" 
            onPress={() => setUser(null)}
            buttonType={ButtonTypes.DANGER}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',

        paddingHorizontal:20,
    },
});

export default SettingsScreen;