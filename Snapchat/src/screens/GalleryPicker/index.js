import React, {useContext, useEffect, useState,} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext, PicContext} from '../../components/Contexts';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign, FontAwesome} from '@expo/vector-icons';

export default function GalleryPicker({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [picture, setPicture] = useContext(PicContext);
    const [loggedIn, setLoggedIn] = useContext(AuthContext);
    const [status, requestPermission] = MediaLibrary.usePermissions();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.image,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        let {status} = await MediaLibrary.requestPermissionsAsync()
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: ['photo'],
        })

        if (!result.cancelled) {
            setPicture({uri: result.uri, type: 'image/jpeg', name: 'photo.jpg'})
        }
    };

    useEffect(() => {
        if (picture === '') {
            pickImage();
        }
    }, [picture]);

    deletePicture = async () => {
        setPicture('')
    }

    return (
        <View style={styles.container}>
            {!picture ? (
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            <Text>Loading</Text>
                        </View>
                    </View>) :
                (
                    <View>
                        <Image source={{uri: picture.uri}} style={{width: "100%", height: "100%"}}/>
                        <View style={styles.buttons_picture}>
                            <TouchableOpacity
                                style={styles.button_picture}
                                onPress={() => deletePicture()}>
                                <AntDesign
                                    name="delete"
                                    style={{color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button_picture}
                                onPress={() => navigation.navigate('Contacts')}
                            >
                                <FontAwesome
                                    name="send"
                                    style={{color: "#fff", fontSize: 40}}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
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
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    buttons_picture: {
        position: "absolute",
        bottom: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    button_picture: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginHorizontal: 65,
        marginVertical: 20
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

