import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import axios from 'axios';
import { TokenContext } from '../../components/Contexts';
import { Button } from 'react-native-elements';
import { Buffer } from 'buffer';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


export default function OpenSnap({navigation, route}) {

    const duration = route.params.duration;
    const [token, setToken] = useContext(TokenContext);
    const [snap, setSnap] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true)

    const fetchData = () => {
        axios.get("http://snapi.epitech.eu:8000/snap/"+route.params.snap_id, {
            headers: {
                'token' : token
            },
            responseType: 'arraybuffer'
        })
            .then((response) => {
                let base64 = Buffer.from(response.data).toString('base64');
                setSnap("data:image/jpg;base64,"+base64)
            }
            )
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        if (token !== undefined) {
            fetchData();
        }
    }, [token]);

    const deleteSnap = () => {
        fetch('http://snapi.epitech.eu:8000/seen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({
                id: route.params.snap_id,
            })
        })
        .then((response) => response)
        .catch((error) => {
            console.error(error);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fullView}>
            {snap ? 
            <>
            <Image source={{ uri: snap }} style={{width: "90%", height: "85%", marginTop: 10}}/>
            <CountdownCircleTimer 
            isPlaying={isPlaying} 
            duration={duration}
            size={70}
            colors={['#004777']}
            onComplete={() => {
                [false];
                deleteSnap(); 
                navigation.replace("Snaps")
            }}
            >
                {({ remainingTime }) => <Text>{remainingTime}</Text> }
            </CountdownCircleTimer>
            </>
            : <Text>Loading...</Text>}
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullView:
        {
            textAlignVertical: 'center',
            alignItems: "center"
        }
});

