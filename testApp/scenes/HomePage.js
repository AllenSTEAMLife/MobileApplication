import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomePageHeader from './headers/HomePageHeader';
import ShowDay from './ShowDay.js';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

const websiteURL = "https://life.allencs.org";
const officialSTEAMURL = "https://www.allenisd.org/steamcenter";
const officialDistrictURL = "https://www.allenisd.org/";

const HomePage = () => {
    const [data, setData] = React.useState([]);
    const [day, setDay] = React.useState("");
    const [dayColor, setDayColor] = React.useState("white");
    const [dayTextColor, setDayTextColor] = React.useState("");

    const OpenURLButton = ({ url, children, buttonStyle, textStyle }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.log(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return (
            <TouchableOpacity style={buttonStyle} onPress={handlePress}>
                <Text style={textStyle}>{children}</Text>
            </TouchableOpacity>
        );
    };
    const getEvents = async () => {
        try {
            const response = await fetch('https://roboticsdev1584.github.io/RetroCycle/Assets/day.json');
            const json = await response.json();
            const dayData = json["dayList"];
            setData(dayData);
        } catch (error) {
            console.error(error);
        }
    }

    const updateDayBox = (newData) => {
        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = (today.getMonth()) + 1;
        const currentYear = today.getFullYear() - (Math.floor(today.getFullYear() / 100)) * 100;
        for (var index = 0; index < newData.length; index++) {
            var tempDate2 = Object.keys(newData[index])[0];
            var tempDate = tempDate2.split("/");
            //if the current date has been found
            if ((parseInt(tempDate[0]) == currentMonth) && (parseInt(tempDate[1]) == currentDay) && (parseInt(tempDate[2]) == currentYear)) {
                const thisDay = newData[index][tempDate2];
                setDay(thisDay);
                switch (thisDay) {
                    case "A": //set to red on a days
                        setDayColor("#E22739");
                        setDayTextColor("white");
                        break;
                    case "B": //set to blue on b days
                        setDayColor("#1982c4");
                        setDayTextColor("white");
                        break;
                    default: //set to white if unsure
                        setDayColor("white");
                        setDayTextColor("black");
                        break;
                }
            }
        }
    }
    React.useEffect(() => {
        getEvents();
        if (data.length > 0) {
            updateDayBox(data);
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.linearGradient}>
                <HomePageHeader />
                <View style={{ marginTop:20 }}></View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <ShowDay text={day} color={dayColor} textColor={dayTextColor} />
                </View>
                <View style={{ paddingVertical: 15 }} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.homepageLeftSquare}>
                        <Image source={require("../assets/images/steamLifeIcon.png")} style={styles.homeLogoImg} />
                    </View>
                    <View style={{ flex: 2 }} />
                    <View style={styles.homepageRightSquare}>
                        <Image source={require("../assets/images/steamCenterMain.png")} style={styles.homeCenterImg} />
                    </View>
                </View>
                <View style={{ paddingVertical: 15 }} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.homepageBottomRectangle} >
                        <OpenURLButton url={websiteURL} buttonStyle={styles.openUrlBtn} textStyle={styles.openUrlText}>
                            Visit Website
                        </OpenURLButton>
                    </View>
                </View>
                <View style={{ marginVertical: 15 }} />
            </LinearGradient>
        </View>
    );
}


const styles = StyleSheet.create({
    homepageTopRectangle: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: "#80adf9",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageLeftSquare: {
        marginLeft: 30,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#bfd6fb",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageRightSquare: {
        marginRight: 30,
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10,
        backgroundColor: "#bfd6fb",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    homepageBottomRectangle: {
        marginLeft: 30,
        marginRight: 30,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: "#d4e4fc",
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    linearGradient: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,
        width: '100%'
    },
    openUrlBtn: {
        backgroundColor: '#2585f6',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
    },
    openUrlText: {
        fontFamily: 'Montserrat-Medium',
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    homeLogoImg: {
        height: '120%',
        width: '120%',
        resizeMode: 'cover',
        marginLeft: '-10%',
        borderRadius: 10,
    },
    homeCenterImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10
    },
})

export default HomePage