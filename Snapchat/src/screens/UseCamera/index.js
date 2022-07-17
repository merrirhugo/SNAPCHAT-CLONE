import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import * as Permissions from "expo-permissions";
import { PicContext } from '../../components/Contexts';
import { Button } from 'react-native-elements';

export default function UseCamera({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const cameraRef = useRef(null);
    const [picture, setPicture] = useContext(PicContext);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'ios') {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            setPicture({uri : photo.uri, type: 'image/jpeg', name:'photo.jpg'})
        }
    }

    deletePicture = async () => {
        setPicture('')
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <View>
                <Button
                    titleStyle={{fontSize: 20}}
                    title="See snaps"
                    onPress={() =>
                        navigation.replace('Snaps')
                    }/>
            </View>
            {!picture ? (
                    <Camera
                        style={styles.camera}
                        type={type}
                        ratio={"16:9"}
                        ref = {cameraRef}
                    >
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={()=>navigation.navigate("GalleryPicker")}
                                >
                                    <Entypo
                                        name="folder-images"
                                        style={{ color: "#fff", fontSize: 40}}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={()=>takePicture()}
                                >
                                    <FontAwesome
                                        name="camera"
                                        style={{ color: "#fff", fontSize: 40}}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                                    }}>
                                    <MaterialCommunityIcons
                                        name="camera-flip"
                                        style={{ color: "#fff", fontSize: 40}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Camera>) :
                (
                    <View>
                        <Image source={{ uri: picture.uri }} style={{width:"100%",height:"100%"}} />
                        <View style={styles.buttons_picture}>
                            <TouchableOpacity
                                style={styles.button_picture}
                                onPress={()=>deletePicture()}>
                                <AntDesign
                                    name="delete"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button_picture}
                                onPress={()=>navigation.navigate('Contacts')}
                            >
                                <FontAwesome
                                    name="send"
                                    style={{ color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    buttons: {
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        margin:20
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttons_picture: {
        position: "absolute",
        bottom: 30,
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20
    },
    button_picture: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 65,
        marginVertical:20
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});