import React, {useContext, useState} from 'react';
import { View, StyleSheet, Text, Image, Picker } from 'react-native';
import { Button,  Slider } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { PicContext } from '../../components/Contexts';
import { TokenContext } from '../../components/Contexts';
import * as FileSystem from 'expo-file-system';

export default function SendPicture({navigation, route}) {

    const [picture, setPicture] = useContext(PicContext);
    const [token, setToken] = useContext(TokenContext);
    const { contact } = route.params;
    const [duration, setDuration] = useState(5);

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('to', contact);
        formData.append('duration', duration);
        formData.append('image', picture)
        fetch('http://snapi.epitech.eu:8000/snap', {
            method: 'POST',
            headers: {
                'Content-Type': 'Multipart/form-data',
                token: token
            },
            body: formData
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            if(json.data){
                Toast.show({
                    type: 'success',
                    text1: 'Snap Sent!',
                })
                navigation.replace('Camera');
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
            <View style={styles.picView}>
                <Text>Send this picture to {contact}?</Text>
                <Image source={{ uri: picture.uri }} style={{width:"50%",height:"70%", marginTop: 10}} />
            </View>
            <View style={styles.picView}>
            <Text>Duration: {duration}</Text>
            <Slider
                value={duration}
                style={{ height: 50, width: 200 }}
                onValueChange={(value) => setDuration(value)}
                maximumValue={60}
                minimumValue={5}
                step={5}
                thumbStyle={{height: 25, width: 25, backgroundColor: 'black'}}
                />
            <Text style={{ paddingBottom: 30 }}></Text>
            <Button 
                    buttonStyle={{borderRadius: 30, backgroundColor:"#cbcbcb", paddingHorizontal: 50, paddingVertical: 10}}
                    title='Send!' 
                    onPress={() => onSubmit()}
                />
            </View>
        </View>
        <View></View>
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    picView: {
        width:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
});
