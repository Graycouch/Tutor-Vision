import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, TextInput, Pressable, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Linking } from 'react-native';
import { useGlobalState, setGlobalState } from '../../../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function MessageScreen({ navigation }) {
    const [user] = useGlobalState("user");
    const [allUsers] = useGlobalState("allUsers");
    const [searchValue] = useGlobalState("searchValue");
    const [localhost] = useGlobalState("localhost");
    const [conversations] = useGlobalState("conversations");

    const [chatUser, setChatUser] = useState(null);
    const [replying, setReplying] = useState(false);
    const [conversationUsers, setConversationUsers] = useState([]);
    const currentConversation = useRef(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [textBoxPosition, setTextBoxPosition] = useState(0.68);
    const [placeholderTextPosition, setPlaceholderTextPosition] = useState(0.2);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const publicFolder = `http://${localhost}:8800/images/`;
    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';

    useEffect(() => {
        axios.get(`http://${localhost}:8800/api/conversations/${user._id}`, {
        })
            .then((response) => {
                setGlobalState("conversations", response.data);
            }, (error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        if (conversations.length !== 0) {
            setConversationUsers([]);
            conversations.map((conversation) => (
                setConversationUsers(conversationUsers => [...conversationUsers, allUsers.find(currentUser =>
                    (currentUser._id === conversation.members[1] && user._id !== conversation.members[1]) ||
                    (currentUser._id === conversation.members[0] && user._id !== conversation.members[0])
                )])
            ))
        }
    }, [conversations])

    async function handleMessageBoxClick(chatUser) {
        setChatUser(chatUser);

        currentConversation.current = conversations.find(conversation =>
            (conversation.members[1] === chatUser._id && user._id !== conversation.members[1]) ||
            (conversation.members[0] === chatUser._id && user._id !== conversation.members[0])
        );

        await axios.get(`http://${localhost}:8800/api/messages/${currentConversation.current._id}`, {
        })
            .then((response) => {
                setMessages(response.data);
            }, (error) => {
                console.log(error);
            });

        setReplying(true);
    };

    const handleBackButtonClick = (e) => {
        e.preventDefault();
        setReplying(false);
    }

    const handlePhoneButtonClick = (e) => {
        e.preventDefault();
        Linking.openURL(`tel:${5044931415}`);
    }

    async function handleSendButtonClick() {
        if (currentMessage !== "") {
            try {
                const res = await axios.post(`http://${localhost}:8800/api/messages`, {
                    conversationId: currentConversation.current._id,
                    sender: user._id,
                    text: currentMessage
                });
                setMessages([...messages, res.data]);
                setCurrentMessage("");
            } catch (err) {
                console.log(err);
            }
        }
    }

    const styles = StyleSheet.create({
        contentContainer: {
            paddingVertical: windowHeight * 0.064,
            alignItems: 'center',
            flexGrow: 1
        },

        horizontalLine1: {
            height: 1,
            width: windowWidth,
            position: 'absolute',
            backgroundColor: '#E5E5E5',
            top: 150
        },

        horizontalLine2: {
            height: 1,
            width: windowWidth,
            position: 'absolute',
            backgroundColor: '#E5E5E5',
            top: 238
        },

        horizontalLine3: {
            height: 1,
            width: windowWidth,
            position: 'absolute',
            backgroundColor: '#E5E5E5',
            top: 323
        },

        replyPageHorizontalLine1: {
            height: 1,
            width: windowWidth,
            position: 'absolute',
            backgroundColor: '#E5E5E5',
            top: 105
        }
    });

    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
            {replying ? (
                messages.length !== 0 ? (
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={{ backgroundColor: '#FFFFFF' }}>
                        <View style={{ position: 'absolute', flexDirection: 'row', top: windowWidth * 0.15 }}>

                            <View style={{
                                height: windowHeight * 0.06144, width: windowHeight * 0.06144,
                                borderRadius: windowHeight * 0.03072, top: -windowHeight * 0.01, marginRight: windowWidth * 0.02
                            }}>
                                <Image source={{ uri: chatUser.profilePicture === "" ? publicFolder + "defaultProfilePicture.png" : chatUser.profilePicture }}
                                    style={{
                                        height: windowHeight * 0.06144, width: windowHeight * 0.06144,
                                        borderRadius: windowHeight * 0.03072
                                    }} />
                            </View>

                            <Text style={{ fontSize: 25, fontWeight: '500' }}>
                                {chatUser.username}
                            </Text>
                        </View>

                        <View style={styles.replyPageHorizontalLine1} />

                        <Pressable onPress={handleBackButtonClick}>
                            <MaterialCommunityIcons name={"chevron-left"} color={"#5F59F7"} size={40} style={{ marginLeft: 'auto', marginRight: 'auto', left: -windowWidth * 0.42, top: windowHeight * 0.01 }} />
                        </Pressable>

                        <Pressable onPress={handlePhoneButtonClick}>
                            <MaterialCommunityIcons name={"phone"} color={"#5F59F7"} size={30} style={{ marginLeft: 'auto', marginRight: 'auto', top: -windowHeight * 0.04, left: windowWidth * 0.4 }} />
                        </Pressable>

                        <View style={{ top: windowHeight * textBoxPosition, zIndex: 5, backgroundColor: 'white', width: windowWidth, alignItems: 'center' }}>
                            <TextInput placeholder="Message..." style={{
                                backgroundColor: '#F1F1F1', height: windowHeight * 0.0512, width: windowWidth * 0.8,
                                borderRadius: windowHeight * 0.0256, paddingLeft: windowWidth * 0.05, fontSize: 15, left: -windowWidth * 0.07
                            }} value={currentMessage} onChangeText={newText => setCurrentMessage(newText)} onSubmitEditing={handleSendButtonClick}
                                onFocus={() => setTextBoxPosition(0.3)} onEndEditing={() => setTextBoxPosition(0.68)}
                            />

                            <Pressable onPress={handleSendButtonClick} backgroundColor={'#5F59F7'} style={{
                                top: -windowHeight * 0.05, left: windowWidth * 0.41, height: windowHeight * 0.0512, width: windowHeight * 0.0512,
                                borderRadius: windowHeight * 0.0512, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <MaterialCommunityIcons name={"send"} color={"white"} size={25} />
                            </Pressable>
                        </View>

                        <View style={{ flexDirection: 'column' }}>
                            {messages.map((message, index) => (
                                message.sender === user._id ? (
                                    <View key={index} style={{
                                        top: -windowHeight * 0.1, right: -windowWidth * 0.14, alignItems: 'flex-end',
                                        paddingBottom: windowHeight * 0.01, width: windowWidth * 0.7
                                    }}>
                                        <Text style={{ backgroundColor: '#5F59F7', borderRadius: windowHeight * 0.0256, paddingLeft: 15, paddingRight: 15, paddingVertical: 5, fontSize: 18, color: 'white' }}>
                                            {message.text}
                                        </Text>
                                    </View>
                                ) : (
                                    <View key={index} style={{
                                        top: -windowHeight * 0.1, left: -windowWidth * 0.14, alignItems: 'flex-start',
                                        paddingBottom: windowHeight * 0.01, width: windowWidth * 0.7
                                    }}>
                                        <Text style={{ backgroundColor: 'gray', borderRadius: windowHeight * 0.0256, paddingLeft: 15, paddingRight: 15, paddingVertical: 5, fontSize: 18, color: 'white' }}>
                                            {message.text}
                                        </Text>
                                    </View>
                                )
                            ))
                            }
                        </View>
                    </ScrollView>) : (
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={{ backgroundColor: '#FFFFFF' }}>
                        <View style={{ position: 'absolute', flexDirection: 'row', top: windowWidth * 0.15 }}>

                            <View style={{
                                height: windowHeight * 0.06144, width: windowHeight * 0.06144,
                                borderRadius: windowHeight * 0.03072, top: -windowHeight * 0.01, marginRight: windowWidth * 0.02
                            }}>
                                <Image source={{ uri: chatUser.profilePicture === "" ? publicFolder + "defaultProfilePicture.png" : chatUser.profilePicture }}
                                    style={{
                                        height: windowHeight * 0.06144, width: windowHeight * 0.06144,
                                        borderRadius: windowHeight * 0.03072
                                    }} />
                            </View>

                            <Text style={{ fontSize: 25, fontWeight: '500' }}>
                                {chatUser.username}
                            </Text>
                        </View>

                        <View style={styles.replyPageHorizontalLine1} />

                        <Pressable onPress={handleBackButtonClick}>
                            <MaterialCommunityIcons name={"chevron-left"} color={"#5F59F7"} size={40} style={{ marginLeft: 'auto', marginRight: 'auto', left: -windowWidth * 0.42, top: windowHeight * 0.01 }} />
                        </Pressable>

                        <Pressable onPress={handlePhoneButtonClick}>
                            <MaterialCommunityIcons name={"phone"} color={"#5F59F7"} size={30} style={{ marginLeft: 'auto', marginRight: 'auto', top: -windowHeight * 0.04, left: windowWidth * 0.4 }} />
                        </Pressable>

                        <View style={{ top: windowHeight * textBoxPosition }}>
                            <TextInput placeholder="Message..." style={{
                                backgroundColor: '#F1F1F1', height: windowHeight * 0.0512, width: windowWidth * 0.8,
                                borderRadius: windowHeight * 0.0256, paddingLeft: windowWidth * 0.05, fontSize: 15, left: -windowWidth * 0.07
                            }} value={currentMessage} onChangeText={newText => setCurrentMessage(newText)} onSubmitEditing={handleSendButtonClick}
                                onFocus={() => { setTextBoxPosition(0.3); setPlaceholderTextPosition(0.1) }}
                                onEndEditing={() => { setTextBoxPosition(0.68); setPlaceholderTextPosition(0.2) }}
                            />

                            <Pressable onPress={handleSendButtonClick} backgroundColor={'#5F59F7'} style={{
                                top: -windowHeight * 0.05, left: windowWidth * 0.76, height: windowHeight * 0.0512, width: windowHeight * 0.0512,
                                borderRadius: windowHeight * 0.0512, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <MaterialCommunityIcons name={"send"} color={"white"} size={25} />
                            </Pressable>
                        </View>

                        <Text style={{ fontSize: 15, fontWeight: '400', color: 'gray', textAlign: 'center', top: windowHeight * placeholderTextPosition, paddingRight: 15, paddingLeft: 15 }}>
                            Start up a conversation with {chatUser.username}
                        </Text>
                    </ScrollView>
                )
            ) : conversationUsers.length !== 0 ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={{ backgroundColor: '#FFFFFF' }}>

                        <View style={{ flexDirection: 'row', marginBottom: windowHeight * 0.0128, top: -windowHeight * 0.019 }}>
                            <TextInput placeholder="Search" value={searchValue} onChangeText={newText => setGlobalState("searchValue", newText)}
                                onSubmitEditing={() => navigation.navigate('Search', { screen: 'Search' })}
                                style={{ backgroundColor: '#F1F1F1', height: windowHeight * 0.0512, width: windowWidth * 0.95, borderRadius: windowHeight * 0.0256, paddingLeft: windowWidth * 0.104, fontSize: 15 }} />
                            <MaterialCommunityIcons name={"magnify"} color={"#9E9E9E"} size={20} style={{ top: windowHeight * 0.0128, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
                        </View>

                        <Text style={{ fontSize: 30, fontWeight: 'bold', top: -15 }}>
                            Messages
                        </Text>

                        <View>
                            <>
                                {conversationUsers.map((currentUser, index) => (
                                    <Pressable key={index} onPress={() => handleMessageBoxClick(currentUser)}>
                                        <View style={{
                                            height: windowHeight * 0.13, width: windowWidth, backgroundColor: '#FFFFFF', borderWidth: 0.5,
                                            borderColor: '#9E9E9E'
                                        }}>

                                            <View style={{
                                                top: windowHeight * 0.01, height: windowHeight * 0.1024, width: windowHeight * 0.1024,
                                                borderRadius: windowHeight * 0.0512, paddingLeft: windowWidth * 0.039
                                            }}>
                                                <Image source={{ uri: currentUser.profilePicture === "" ? publicFolder + "defaultProfilePicture.png" : currentUser.profilePicture }}
                                                    style={{
                                                        height: windowHeight * 0.1024, width: windowHeight * 0.1024,
                                                        borderRadius: windowHeight * 0.0512
                                                    }} />
                                            </View>
                                            <View style={{ alignItems: 'flex-start', top: -windowHeight * 0.09, paddingLeft: windowWidth * 0.286, paddingRight: windowWidth * 0.026 }}>
                                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: windowHeight * 0.0001 }}>
                                                    {currentUser.username}
                                                </Text>
                                                <Text style={{ color: 'gray', fontSize: 12, paddingTop: 5 }}>
                                                    Click to send a message to {currentUser.username} and learn more about {currentUser.major}
                                                </Text>
                                            </View>

                                        </View>
                                    </Pressable>
                                ))}
                            </>
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
                    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} style={{ backgroundColor: '#FFFFFF' }}>

                        <View style={{ flexDirection: 'row', marginBottom: windowHeight * 0.0128, top: -windowHeight * 0.019 }}>
                            <TextInput placeholder="Search" value={searchValue} onChangeText={newText => setGlobalState("searchValue", newText)}
                                onSubmitEditing={() => navigation.navigate('Search', { screen: 'Search' })}
                                style={{ backgroundColor: '#F1F1F1', height: windowHeight * 0.0512, width: windowWidth * 0.95, borderRadius: windowHeight * 0.0256, paddingLeft: windowWidth * 0.104, fontSize: 15 }} />
                            <MaterialCommunityIcons name={"magnify"} color={"#9E9E9E"} size={20} style={{ top: windowHeight * 0.0128, position: 'absolute', paddingLeft: windowWidth * 0.026 }} />
                        </View>

                        <Text style={{ fontSize: 30, fontWeight: 'bold', top: -15 }}>
                            Messages
                        </Text>

                        <Text style={{ fontSize: 20, fontWeight: '400', color: 'gray', top: -15, textAlign: 'center', top: windowHeight * 0.2, paddingRight: 5, paddingLeft: 5 }}>
                            Help is available, try messaging {user.role.toLowerCase() === "student" ? "tutors" : "students"} on the search screen...
                        </Text>
                        <Text style={{ fontSize: 30, fontWeight: '400', color: 'gray', top: -15, textAlign: 'center', top: windowHeight * 0.25, paddingRight: 20, paddingLeft: 20 }}>
                            (╯°□°)╯︵ ┻━┻
                        </Text>
                    </ScrollView>
                </View>
            )}
        </View>
    )
}