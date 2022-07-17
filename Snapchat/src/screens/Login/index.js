import React, {useContext} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../components/Contexts';

export default function Login({navigation}) {

    const [loggedIn, setLoggedIn] = useContext(AuthContext);

    const {
        control,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({mode: 'onBlur'})

    const onSubmit = data => {
        fetch('http://snapi.epitech.eu:8000/connection', {
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
                if (json.data.token){
                    AsyncStorage.setItem("user-token", json.data.token);
                    setLoggedIn(true);
                }
                else {
                    setError('password', {message: 'Wrong combination'})
                }
            })
            .catch((error) => {
                AsyncStorage.removeItem("user-token");
                console.error(error);
            });
    }

    return (
        <View style={styles.fullView}>
            <View style={styles.inputView}>
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput
                            style={styles.inputField}
                            placeholder="Email"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                        />
                    )}
                    rules={{
                        required: {
                            value: true,
                            message: 'Your email is required'
                        }, pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'It\'s not a valid email'
                        },
                    }}
                />
                {errors.email == undefined ? <></> : <Text style={{color: "red"}}>{errors.email.message}</Text>}
            </View>

            <View style={styles.inputView}>
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput
                            style={styles.inputField}
                            placeholder="Password"
                            value={value}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            secureTextEntry={true}
                        />
                    )}

                    rules={{
                        required: {
                            value: true,
                            message: 'Your password is required'
                        },
                    }}
                />
                {errors.password == undefined ? <></> : <Text style={{color: "red"}}>{errors.password.message}</Text>}
            </View>

            <View style={styles.loginView}>
                <Button
                    buttonStyle={{borderRadius: 30, backgroundColor:"#cbcbcb", paddingHorizontal: 50, paddingVertical: 10}}
                    title='Login'
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    fullView:
        {
            textAlignVertical: 'center'
        },

    inputView: {
        borderRadius: 30,
        width: "100%",
        height: 45,
        marginTop: 20,
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

    loginView:
        {
            width: "100%",
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center"
        },
    loginBtn:
        {
            borderRadius: 25,
            height: 50,
            width: "60%",
            backgroundColor: "#cbcbcb",
            alignItems: "center",
            justifyContent: "center"
        }
});
