import { useState, useEffect } from 'react';
import { useGlobalState, setGlobalState } from '../../../index';
import { View, Text, Button, Image, TextInput, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { CheckBox } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
    const [localhost] = useGlobalState("localhost");
    const [checked, setchecked] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(true);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';

    useEffect(() => {
        axios.get(`http://${localhost}:8800/api/users/all`, {
        })
            .then((response) => {
                setGlobalState("allUsers", response.data);
            }, (error) => {
                console.log(error);
            });
    }, [])

    const handleLogInClick = (e) => {
        e.preventDefault();

        axios.post(`http://${localhost}:8800/api/auth/login`, {
            email: email,
            password: password
        })
            .then((response) => {
                setGlobalState("user", response.data);
                setGlobalState("isLoggedIn", true);
            }, (error) => {
                console.log(error);
            });
    }

    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigation.navigate('Register');
    }

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        navigation.navigate('ForgotPassword');
    }

    const handleViewPasswordClick = (e) => {
        e.preventDefault();
        setViewPassword(!viewPassword);
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{uri: imageURL + 'logo2.png'}} style={{ top: windowHeight * 0.11, height: windowHeight * 0.153, width: windowWidth * 0.57 }} />

            <Text style={{ fontSize: 30, fontWeight: 'bold', top: windowHeight * 0.19 }}>
                Login to Your Account
            </Text>

            <View style={{ top: windowHeight * 0.22, flexDirection: 'row' }}>
                <TextInput placeholder="Email" onChangeText={newText => setEmail(newText)} textContentType={'emailAddress'}
                    style={{
                        backgroundColor: '#F1F1F1', height: windowHeight * 0.064, width: windowWidth * 0.833,
                        borderRadius: windowHeight * 0.019, paddingLeft: windowWidth * 0.104, fontSize: 15
                    }} />
                <MaterialCommunityIcons name={"email"} color={"#9E9E9E"} size={24} style={{ top: windowHeight * 0.015, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
            </View>

            <View style={{ top: windowHeight * 0.25, flexDirection: 'row' }}>
                <TextInput placeholder="Password" onChangeText={newText => setPassword(newText)} textContentType={'password'}
                    secureTextEntry={viewPassword} style={{
                        backgroundColor: '#F1F1F1', height: windowHeight * 0.064, width: windowWidth * 0.833,
                        borderRadius: windowHeight * 0.019, paddingLeft: windowWidth * 0.104, fontSize: 15
                    }} />
                <MaterialCommunityIcons name={"lock"} color={"#9E9E9E"} size={24} style={{ top: windowHeight * 0.015, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
                <Pressable onPress={handleViewPasswordClick}>
                    <MaterialCommunityIcons name={"eye-off"} color={"#9E9E9E"} size={24} style={{ top: windowHeight * 0.015, right: windowWidth * 0.04, position: 'absolute' }} />
                </Pressable>
            </View>

            <View style={{ top: windowHeight * 0.27 }}>
                <CheckBox title={"Remember Me"} checked={checked} onPress={() => setchecked(!checked)} checkedColor='#5F59F7' uncheckedColor='#5F59F7' />
            </View>

            <Pressable backgroundColor={'#5F59F7'} style={{ top: windowHeight * 0.28, height: windowHeight * 0.0768, width: windowWidth * 0.833, borderRadius: windowHeight * 0.0512, alignItems: 'center', justifyContent: 'center' }} onPress={handleLogInClick}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                    Login
                </Text>
            </Pressable>

            <Pressable style={{ top: windowHeight * 0.31 }} onPress={handleForgotPasswordClick}>
                <Text style={{ color: '#2970FE', fontSize: 12 }}>
                    Forgot Password?
                </Text>
            </Pressable>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#A9A9A9', fontSize: 12, top: windowHeight * 0.34 }}>Don’t have an account?  </Text>

                <Pressable style={{ top: windowHeight * 0.34 }} onPress={handleRegisterClick}>
                    <Text style={{ color: '#2970FE', fontSize: 12 }}>
                        Sign up
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}