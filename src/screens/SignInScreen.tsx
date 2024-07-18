import Button from "@/components/Button";
import Input, { IconNames, KeyboardTypes, ReturnKeyTypes } from "@/components/Input";
import SafeInputView from "@/components/SafeInputView";
import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Image, Keyboard, StyleSheet, Text, View } from "react-native"
import { signIn } from "../api/auth";
import PropTypes from 'prop-types';
import UserContext, { useUserContext } from "@/contexts/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SignInScreen = () => {
    const insets = useSafeAreaInsets();

    const {setUser} = useUserContext();

    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const passwordRef= useRef(null);
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setDisabled(!email || !password);
    },[email,password]);

    const onSubmit = async () => {
        if(!isLoading && !disabled){
        try{
            setIsLoading(true);
            Keyboard.dismiss();
            const data = await signIn(email,password);
            console.log(data);
            setIsLoading(false);
            setUser(data);
        }catch(error){
            Alert.alert('로그인 실패',error,[
                {text:'확인',onPress:() => setIsLoading(false)},
            ]);
            //console.log(error);
        }
        }
    };

    return(

                <SafeInputView>
                    <View style={styles.container}>
                        <Image source={require('../../assets/images/main.png')}
                        style={styles.image}/>
                        
                        <Input title={'이메일'} 
                        placeholder="your@email.com" 
                        keyboardType={KeyboardTypes.EMAIL}
                        returnKeyType={ReturnKeyTypes.NEXT}
                        value={email}
                        onChangeText={(email)=>setEmail(email.trim())}
                        iconName={IconNames.EMAIL}
                        onSubmitEditing={()=> passwordRef.current.focus()}
                        
                        />

                        <Input 
                            ref={passwordRef}
                            title={'비밀번호'} 
                            placeholder="password" 
                            returnKeyType={ReturnKeyTypes.DONE} 
                            secureTextEntry
                            value={password}
                            onChangeText={(password)=>setPassword(password.trim())}
                            iconName={IconNames.PASSWORD}
                            onSubmitEditing={onSubmit}
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                            title="로그인" 
                            onPress={onSubmit} 
                            disabled={disabled}
                            isLoading={isLoading}
                            />
                        </View>
                    </View>
                </SafeInputView>

    );
};

SignInScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image: {
        //width:'10%',
        height:'10%',
        maxWidth:200,
        maxHeight:200,
        resizeMode:'contain',
    },
    buttonContainer:{
        width:'100%',
        marginTop:30,
        paddingHorizontal:20,
    },
});

export default SignInScreen;