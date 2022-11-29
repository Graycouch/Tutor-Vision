import { useState, useEffect } from 'react';
import { bundleDirectory } from 'expo-file-system';
import { View, Text, Button, Image, ImageBackground, TextInput, Pressable, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useGlobalState, setGlobalState } from '../../index.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rating, AirbnbRating } from 'react-native-ratings';




const windowWidth = 800;
const windowHeight = 1600;




function renderSwitch(cardType, currentUser) {
    switch (cardType) {
        case "UpcomingLesson":
            return upcomingLesson(currentUser);
        case "MyTeachers":
            return myTeachers(currentUser);
        case "SuggestedTeachers":
            return suggestedTeachers(currentUser);
        case "TutorSchedule":
            return TutorSchedule(currentUser);
        default:
            return <Text>card factory error...</Text>;
    }
}




const styles = StyleSheet.create({

    //CardContainer
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        borderWidth: 1,
        borderColor: '#9E9E9E',
        borderRadius: 20,
        marginBottom: 30,
        backgroundColor: '#ffffff'
    },

    // ProfilePicture
    profilePicture: {
        height: 80,
        width: 80,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 2
    },

    // ProfileInfoContainer
    profileInfoContainer: {
        textAlign: 'left',
        fontWeight: '400',
    },


    /// Text 
    blue: {
        color: '#2970FE'
    },

    grey: {
        color: 'grey'
    },

    bold: {
        fontWeight: '500'
    },

    right: {
        textAlign: 'right',
        marginRight: 20,
        marginleft: 0
    },

    top: {
        fontSize: 15,

        marginTop: 0,
        marginLeft: 20,
        marginBottom: 2,


    },

    bottom: {
        fontSize: 12,

        marginTop: 0,
        marginLeft: 20,
        marginBottom: 2,

    },


    rating: {
        marginTop: 0,
        marginLeft: 18,
        marginBottom: 20,
        alignSelf: 'flex-start'
    }
});



//Container
//Flex Row
//ProfilePicture
//Flex Row
//FlexColumn
//Info
//FlexColum
//Info



export function CardFactory(props) {

    const [user] = useGlobalState("user");
    const [allUsers] = useGlobalState("allUsers");
    const [searchValue] = useGlobalState("searchValue");
    const [localhost] = useGlobalState("localhost");
    const publicFolder = `http://${localhost}:8800/images/`;


    const [boxClicked, setboxClicked] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [major, setMajor] = useState("");
    const [courses, setCourses] = useState([""]);
    const [about, setAbout] = useState("");
    const [city, setCity] = useState("");
    const [university, setUniversity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [totalLessons, setTotalLessons] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [rating, setRating] = useState(0);
    const [profilePicture, setProfilePicture] = useState("");
    const [coverPicture, setCoverPicture] = useState("");
    const [searchPageBar, setSearchPageBar] = useState(searchValue);



    function handleUserBoxClick(currentUser) {
        setboxClicked(true);

        setUsername(currentUser.username);
        setEmail(currentUser.email);
        setRole(currentUser.role);
        setMajor(currentUser.major);
        setCourses(currentUser.courses);
        setAbout(currentUser.about);
        setCity(currentUser.city);
        setUniversity(currentUser.university);
        setZipCode(currentUser.zipCode);
        setHourlyRate(currentUser.hourlyRate);
        setTotalLessons(currentUser.totalLessons);
        setTotalHours(currentUser.totalHours);
        setRating(currentUser.rating);
        setProfilePicture(currentUser.profilePicture);
        setCoverPicture(currentUser.coverPicture);
    }


    const handleBackClick = (e) => {
        e.preventDefault();
        setboxClicked(false);
    }

    const handleEmailClick = (e) => {
        e.preventDefault();
        Linking.openURL(`mailto:${email}`);
    }

    const handleMessageClick = (e) => {
        e.preventDefault();
    }

    const handleBookClick = (e) => {
        e.preventDefault();
    }








    const [staticContentURL] = useGlobalState("staticContentURL");
    const imageURL = staticContentURL + '/images/';
    return (
        props.users.map((currentUser, index) => (

            <Pressable key={index} onPress={() => handleUserBoxClick(currentUser)}>
                {/* Card Container */}
                {/* backgroundImage: currentUser.coverPicture.length === 0 ? "url("+imageURL+"defaultBackground.jpg)" : "url("+imageURL+'lsuBannerTemp2.jpeg)' */}
                <View style={[styles.cardContainer, {}]}>
                    {/* BackgroundImage */}
                    <ImageBackground source={{ uri: currentUser.coverPicture === "" ? publicFolder + "defaultBackground.jpg" : currentUser.coverPicture }} resizeMode="cover"
                        imageStyle={{ borderTopLeftRadius: 18, borderTopRightRadius: 18, height: windowHeight * 0.04 }}>

                        {/* ProfilePictureContainer */}
                        <View style={{ flexDirection: 'row' }}>
                            {/* ProfilePicture */}
                            <Image source={{ uri: currentUser.profilePicture.length === 0 ? imageURL + "abdel.jpg" : currentUser.profilePicture }}
                                style={styles.profilePicture} />
                        </View>


                        {/* Text part of card that changes based on type */}
                        {renderSwitch(props.CardType, currentUser)}


                    </ImageBackground>
                </View>
            </Pressable>
        ))
    );
}


function upcomingLesson(currentUser) {
    return (
        <View style={[styles.profileInfoContainer, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "rgba(255,255,255,0)" }]}>
            {/* Info (Left Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* Username */}
                <Text style={[styles.top, styles.bold]}>{currentUser.username}</Text>
                {/* Major */}
                <Text style={styles.bottom}>{currentUser.major} {currentUser.role}</Text>
                {/* Rating */}
                <AirbnbRating count={5} defaultRating={currentUser.rating} size={12} isDisabled={true} showRating={false} selectedColor={'#5F59F7'} starContainerStyle={styles.rating} />
            </View>
            {/* Info (Right Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* hourlyRate */}
                <Text style={[styles.blue, styles.top, styles.right]}> ${currentUser.hourlyRate}/hr</Text>
                {/* LocationInfo */}
                <Text style={[styles.locationInfo, styles.bottom, styles.right, styles.grey]}>{currentUser.date.split('.').join('/')} at {currentUser.time}</Text>
            </View>
        </View>
    );
}


function myTeachers(currentUser) {
    return (
        <View style={[styles.profileInfoContainer, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "rgba(255,255,255,0)" }]}>
            {/* Info (Left Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* Username */}
                <Text style={[styles.top, styles.bold]}>{currentUser.username}</Text>
                {/* Major */}
                <Text style={styles.bottom}>{currentUser.major} {currentUser.role}</Text>
                {/* Rating */}
                <AirbnbRating count={5} defaultRating={currentUser.rating} size={12} isDisabled={true} showRating={false} selectedColor={'#5F59F7'} starContainerStyle={styles.rating} />
            </View>
            {/* Info (Right Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* hourlyRate */}
                <Text style={[styles.blue, styles.top, styles.right]}> ${currentUser.hourlyRate}/hr</Text>
                {/* LocationInfo */}
                <Text style={[styles.locationInfo, styles.bottom, styles.right, styles.grey]}>
                    <MaterialCommunityIcons name={"calendar-clock-outline"} color={"#9E9E9E"} size={12} style={{}} />
                    &nbsp;Schedule
                </Text>

            </View>
        </View>
    );
}

function suggestedTeachers(currentUser) {
    return (
        <View style={[styles.profileInfoContainer, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "rgba(255,255,255,0)" }]}>
            {/* Info (Left Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* Username */}
                <Text style={[styles.top, styles.bold]}>{currentUser.username}</Text>
                {/* Major */}
                <Text style={styles.bottom}>{currentUser.major}</Text>
                {/* Rating */}
                <AirbnbRating count={5} defaultRating={currentUser.rating} size={12} isDisabled={true} showRating={false} selectedColor={'#5F59F7'} starContainerStyle={styles.rating} />
            </View>
            {/* Info (Right Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* hourlyRate */}
                <Text style={[styles.blue, styles.top, styles.right]}> ${currentUser.hourlyRate}/hr</Text>
                {/* LocationInfo */}
                <Text style={[styles.locationInfo, styles.bottom, styles.right, styles.grey]}>
                    <MaterialCommunityIcons name={"card-account-details-outline"} color={"#9E9E9E"} size={12} style={{}} />
                    &nbsp;Check Profile
                </Text>
            </View>
        </View>
    );
}

function TutorSchedule(currentUser) {
    return (
        <View style={[styles.profileInfoContainer, { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: "rgba(255,255,255,0)" }]}>
            {/* Info (Left Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* Username */}
                <Text style={[styles.top, styles.bold]}>{currentUser.username}</Text>
                {/* Major */}
                <Text style={styles.bottom}>{currentUser.major} {"Student"}</Text>
                {/* Rating */}
                <AirbnbRating count={5} defaultRating={currentUser.rating} size={12} isDisabled={true} showRating={false} selectedColor={'#5F59F7'} starContainerStyle={styles.rating} />
            </View>
            {/* Info (Right Column) */}
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                {/* LocationInfo */}
                <Text style={[styles.locationInfo, styles.bottom, styles.right, styles.blue]}>Friday 2:00PM</Text>
            </View>
        </View>
    );
}