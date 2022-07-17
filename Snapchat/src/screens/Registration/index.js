import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import {useForm, Controller} from 'react-hook-form'
import { Button } from 'react-native-elements';
import Toast, { SuccessToast } from 'react-native-toast-message';

export default function Registration({navigation}) {
    const {
        control, 
        handleSubmit, 
        setError,
        formState: {errors, isValid},
        getValues
    } = useForm({mode: 'onBlur'})

    const onSubmit = data => {
        fetch('http://snapi.epitech.eu:8000/inscription', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.data.email.includes('has already been taken')){
                setError('email', {message: 'This mail is already taken'})
            }
            else {
                Toast.show({
                    type: 'success',
                    text1: 'You successfully registered!',
                    text2: 'Please login.'
                })
                navigation.replace('Login');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    
    return (
    <View style={styles.container}>
        <View></View>
        <View>
            <View style={styles.inputView}>
                <Controller 
                    control={control}
                    name="email"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your email here"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'Field is required!'
                        },
                        pattern:{
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "It's not a valid email"
                        },
                    }}
                />
                {errors.email == undefined ? <></> : <Text style={{color: "red"}}>{errors.email.message}</Text>}
            </View>
            
            <View style={styles.inputView}>
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.inputField}
                            placeholder="Enter your password here"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            secureTextEntry={true}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'Field is required!'
                        },
                    }}
                />
                {errors.password == undefined ? <></> : <Text style={{color: "red"}}>{errors.password.message}</Text>}
            </View>
            <View style={styles.loginView}>
                <Button 
                    buttonStyle={{borderRadius: 30, backgroundColor:"#cbcbcb", paddingHorizontal: 50, paddingVertical: 10}}
                    title='Submit' 
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
        <View></View>
        <View></View>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    inputView: {
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    inputField: {
        borderBottomWidth: 1,
        borderColor: "#cbcbcb",
        width: "60%",
        paddingLeft: 10,
        height: 45,
        alignItems: "center",
    },
    loginView: {
        width:"100%",
        marginTop:40,
        alignItems:"center",
        justifyContent:"center"
    },
});
