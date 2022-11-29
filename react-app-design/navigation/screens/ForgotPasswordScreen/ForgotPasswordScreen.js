import { useState } from 'react';
import { useGlobalState, setGlobalState } from '../../../index';
import { View, Text, Button, Image, TextInput, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { CheckBox } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ForgotPasswordScreen({ navigation }) {
    const handleLoginClick = (e) => {
        e.preventDefault();
        navigation.navigate('Login')
    }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{uri: imageURL + 'logo2.png'}} style={{ top: windowHeight * 0.11, height: windowHeight * 0.153, width: windowWidth * 0.57 }} />

            <Text style={{ fontSize: 30, fontWeight: 'bold', top: windowHeight * 0.19 }}>
                Forgot Password
            </Text>

            <View style={{ top: windowHeight * 0.22, flexDirection: 'row' }}>
                <TextInput placeholder="Email" onChangeText={newText => setEmail(newText)} textContentType={'emailAddress'}
                    style={{
                        backgroundColor: '#F1F1F1', height: windowHeight * 0.064, width: windowWidth * 0.833,
                        borderRadius: windowHeight * 0.019, paddingLeft: windowWidth * 0.104, fontSize: 15
                    }} />
                <MaterialCommunityIcons name={"email"} color={"#9E9E9E"} size={24} style={{ top: windowHeight * 0.015, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
            </View>

            <Pressable backgroundColor={'#5F59F7'} style={{
                top: windowHeight * 0.25, height: windowHeight * 0.0768,
                width: windowWidth * 0.833, borderRadius: windowHeight * 0.0512, alignItems: 'center', justifyContent: 'center'
            }} onPress={handleLoginClick}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Reset Password
                </Text>
            </Pressable>

            <Pressable style={{ top: windowHeight * 0.28 }} onPress={handleLoginClick}>
                <Text style={{ color: '#2970FE', fontSize: 12 }}>
                    Back To Login
                </Text>
            </Pressable>
        </View>
    )
}