import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import HomePageHeader from './headers/HomePageHeader';
import ShowDay from './ShowDay.js';

const HomePage = () => {
    const [data, setData] = React.useState([]);
    const [day, setDay] = React.useState("none");
    const [dayColor, setDayColor] = React.useState("white");

    const getEvents = async () => {
        try {
            const response = await fetch('https://life.allencs.org/static/day.json');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally { }
    }

    const updateDayBox = (newData) => {
        try { //sometimes it is weird when there is not a try catch here
            const dataArr = newData.dayList;
            const today = new Date();
            const currentDay = today.getDate();
            const currentMonth = (today.getMonth()) + 1;
            const currentYear = today.getFullYear() - (Math.floor(today.getFullYear() / 100)) * 100;
            for (var index = 0; index < dataArr.length; index++) {
                var tempDate2 = Object.keys(dataArr[index])[0];
                var tempDate = tempDate2.split("/");
                //if the current date has been found
                if ((parseInt(tempDate[0]) == currentMonth) && (parseInt(tempDate[1]) == currentDay) && (parseInt(tempDate[2]) == currentYear)) {
                    setDay(dataArr[index][tempDate2]);
                    switch (day) {
                        case "A": //set to red on a days
                            setDayColor("#E22739");
                            break;
                        case "B": //set to blue on b days
                            setDayColor("#1982c4");
                            break;
                        default: //set to white if unsure
                            setDayColor("white");
                            break;
                    }
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getEvents();
        if (data) {
            updateDayBox(data);
        }
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.linearGradient}>
                <HomePageHeader />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <ShowDay text={day} color={dayColor} />
                </View>
                <View style={{ paddingVertical: 15 }} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.homepageLeftSquare}></View>
                    <View style={{ flex: 2 }} />
                    <View style={styles.homepageRightSquare}></View>
                </View>
                <View style={{ paddingVertical: 15 }} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.homepageBottomRectangle} >
                        <Text>Hello, World</Text>
                    </View>
                </View>
                <View style={{ marginVertical: 15 }} />
            </LinearGradient>
        </View>
    )
}

/*
<View style={styles.homepageTopRectangle}>
    <Text>{day} Day</Text>
</View>
*/


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
    }
})

export default HomePage