import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { TokenContext } from '../../components/Contexts';
import { Button } from 'react-native-elements';

export default function Snaps({navigation}) {

    const [token, setToken] = useContext(TokenContext);
    const [snaps, setSnaps] = useState([]);

    const fetchData = () => {
        axios.get("http://snapi.epitech.eu:8000/snaps", {
            headers: {
                'token' : token
            }
        })
            .then((response) => setSnaps(response.data))
            .catch((error) => '')
    };

    useEffect(() => {
        if(token !== undefined){
            fetchData();
        }
    }, [token]);

    function selectSnap (id, duration) {
        navigation.replace('OpenSnap', {snap_id: id, duration: duration})
    }

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.contact} onPress={() => selectSnap(item.snap_id, item.duration)}>
                <Text style={styles.contactText}>{item.from}</Text>
            </TouchableOpacity>
        </View>
    );

    if(snaps.length === 0){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.fullView}>
                    <Text>Loading</Text>
                </View>
            </SafeAreaView>
        )
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Button
                        titleStyle={{fontSize: 20}}
                        title="New snap"
                        onPress={() =>
                            navigation.replace('Camera')
                        }/>
                </View>
                <View style={styles.fullView}>
                    <FlatList
                        data={snaps.data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => {
                            return index;
                        }}
                    >
                    </FlatList>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    contact: {
        borderWidth: 0.5,
        borderColor: "#cbcbcb",
        padding: 20,
        alignItems: "center",
    },
    contactText: {
        fontSize: 20
    }
});