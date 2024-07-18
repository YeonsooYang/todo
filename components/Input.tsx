import { StyleSheet, Text, TextInput, View } from "react-native"
import PropTypes from "prop-types";
import { BLACK, GRAY, PRIMARY } from "@/src/colors";
import { forwardRef, useState } from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';

type Props = {
    title:string;
    placeholder:string;
    keyboardType:any;
    returnKeyType:any;
    secureTextEntry:any;
    value:any;
    onChangeText:any;
    iconName:any;
    
}



export const KeyboardTypes = {
    DEFAULT:'dafault',
    EMAIL:'email-address',
}
export const ReturnKeyTypes = {
    DONE: 'done',
    NEXT : 'next',
};

export const IconNames = {
    EMAIL:'email',
    PASSWORD:'lock',
}

const Input = forwardRef(
    ({title,placeholder,keyboardType,returnKeyType,secureTextEntry,value,onChangeText,iconName,...props}:Props,ref) => {

    const [isFocused, setIsFocused] =useState(false);

    return (
        <View style={styles.container}>
            <Text style={[
                styles.title, 
                value && styles.hasValuedTitle ,
                isFocused && styles.focusedTitle
                ]}>{title}</Text>
            <View>
            <TextInput 
            {...props}
            ref={ref}
            value={value}
            style={[styles.input, value && styles.hasValuedInput,isFocused && styles.focusedInput]}
                placeholder={placeholder ?? title}
                placeholderTextColor={GRAY.DEFAULT}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                textContentType="none"
                secureTextEntry={secureTextEntry}
               // value={value}
                onChangeText={onChangeText}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
            />
                <View style={styles.icon}>
                    <MaterialCommunityIcons
                        name={iconName}
                        size={20}
                        color={(()=>{
                            switch(true){
                                case isFocused:
                                    return PRIMARY.DEFAULT;
                                case !!value:
                                    return BLACK;
                                default:
                                    return GRAY.DEFAULT;
                            }
                        })()}
                    />
                </View>
            </View>    
        </View>
    );
  }   
);

Input.displayName='Input';

Input.defaultProps = {
    keyboardType:KeyboardTypes.DEFAULT,
    returnKeyType:ReturnKeyTypes.DONE,
}

Input.propTypes = {
    title:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    keyboardType: PropTypes.oneOf(Object.values(KeyboardTypes)),
    returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
    secureTextEntry:PropTypes.bool,
    value:PropTypes.string,
    iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        paddingHorizontal:20,
        marginVertical:10,
    },
    title:{
        marginBottom:4,
        color:GRAY.DEFAULT,
    },
    input:{
        borderWidth:1,
        borderRadius:8,
        paddingHorizontal:10,
        height:42,
        borderColor:GRAY.DEFAULT,
        paddingLeft:30,
    },
    focusedTitle:{
        fontWeight:'600',
        color:PRIMARY.DEFAULT,
    },
    focusedInput:{
        borderWidth:2,
        borderColor:PRIMARY.DEFAULT,
        color:PRIMARY.DEFAULT,
    },
    hasValuedTitle:{
        color:BLACK,
    },
    hasValuedInput:{
        borderColor:BLACK,
        color:BLACK,
    },
    icon:{
        position:'absolute',
        left:8,
        height:'100%',
        justifyContent:'center',
    },
});

export default Input;