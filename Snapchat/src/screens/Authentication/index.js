import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function Authentication({navigation}) {

    return (
    <View style={styles.container}>
        <View></View>
        <View style={styles.align}>
            <Image source={require('../../../assets/logo.png')}
            style={{width: 220, height: 220}} />
        </View>
        <View>
            <Button 
            titleStyle={{fontSize: 34}}
            buttonStyle={{backgroundColor: "#ff5c5c"}}
            title="Login"
            onPress={() =>
                navigation.navigate('Login')
            }/>
            <Button
            titleStyle={{fontSize: 34}}
            title="Sign Up"
            onPress={() =>
                navigation.navigate('Registration')
            }/>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffc00',
        justifyContent: 'space-between',
    },
    align: {
        alignItems: 'center',
        marginTop: 50
    },
});