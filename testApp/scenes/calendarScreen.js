import * as React from 'react';
import {
    Pressable,
    Text,
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarHeader from './headers/CalendarHeader';
import event from '../assets/models/event';
import EventItem from '../assets/models/eventItem.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = () => {
    const [data, setData] = React.useState([]);
    const [showEvents, setShowEvents] = React.useState(false);
    const [showEventsList, setShowEventsList] = React.useState(false);
    const [showUpcoming, setShowUpcoming] = React.useState(true);
    const [selectedDay, setSelectedDay] = React.useState();
    const [events, setEvents] = React.useState([]);
    const [allEvents, setAllEvents] = React.useState([]);

    const dataFromStorage = async () => {
        try {
            const asyncData = await AsyncStorage.getItem('calendarEvents');
            setData(asyncData);
            const eventData = await AsyncStorage.getItem('eventState');
            var eventState = false;
            if (eventData == null) {
                await AsyncStorage.setItem('eventState', `${false}`);
            }
            else {
                eventState = (eventData == 'true');
            }
            setShowEvents(eventState);
        } catch (error) {
            console.error(error);
        }
    }
    const getEvents = async () => {
        try {
            const response = await fetch('https://life.allencs.org/events/json');
            const json = await response.json();
            setData(json);
            try {
                await AsyncStorage.setItem('calendarEvents', `${response}`);
            } catch (e) {
                console.error(e);
            }
        } catch (error) {
            console.error(error);
        } finally { }
    }
    const updateEvents = (dataArr) => {
        var eventsArr = [];
        var allEventsArr = [];
        console.log(`here, dataArr: ${dataArr}`);
        if (dataArr.length > 0) {
            dataArr.forEach(event => {
                let time = new Date(event.startTime * 1000);
                let day = time.getUTCDate();
                //note that this starts from 0 but selectedDay.month starts from 1
                let month = time.getUTCMonth();
                allEventsArr.push(event);
                if ((selectedDay != undefined) && (day == selectedDay.day)) {
                    eventsArr.push(event);
                    AsyncStorage.setItem('eventState', `${true}`);
                }
            });
        }
        if (eventsArr.length > 0) { setShowEvents(true); setShowEventsList(true); }
        else { setShowEvents(false); setShowEventsList(false); }
        setEvents(eventsArr);
        setAllEvents(allEventsArr);
    }
    const toggleUpcoming = () => {
        const currentUpcoming = showUpcoming;
        setShowUpcoming(!currentUpcoming);
    }
    const toggleEvents = () => {
        const currentEventsList = showEventsList;
        if (!showEvents) {
            setShowEventsList(false);
        }
        else {
            setShowEventsList(!currentEventsList);
        }
    }

    React.useEffect(() => {
        dataFromStorage();
        getEvents();
        if (data.length > 0) {
            updateEvents(data);
            toggleEvents();
        }
    }, []);

    const ShowList = (props) => {
        const { eventList, show } = props;
        if (!show) {
            return (
                <View style={{ display: 'none' }}></View>
            );
        }
        return (
            <FlatList
                scrollEnabled={true}
                style={styles.eventListing}
                data={eventList}
                renderItem={({ item }) => <EventItem title={item.name} date={item.startTime} message={item.description} />}
                keyExtractor={(key, index) => index.toString()}
            />
        );
    };
    const ShowText = (props) => {
        const { show, text, toggle } = props;
        if (!show) {
            return (
                <View style={{ display: 'none' }}></View>
            );
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Pressable style={styles.eventsButton} onPress={toggle}>
                    <Text style={styles.eventsTitle}>{text}</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: Colors.WHITE }}>
            <CalendarHeader />
            <View style={{ minHeight: '100%' }}>

                <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
                    <View style={{ flex: 1, minHeight: '100%' }}>

                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                            <Text style={styles.upcomingEventsStyle}>Overview</Text>
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                            <Calendar
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => { setSelectedDay(day); updateEvents(data); }}
                                // Handler which gets executed on day long press. Default = undefined
                                onDayLongPress={(day) => { console.log('selected day', day) }}
                                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                monthFormat={'yyyy MM'}
                                // Handler which gets executed when visible month changes in calendar. Default = undefined
                                onMonthChange={(month) => { console.log('month changed', month) }}
                                // Hide month navigation arrows. Default = false
                                hideArrows={true}

                                hideExtraDays={true}

                                disableMonthChange={false}

                                renderHeader={() => { }}

                                theme={styles.calendarStyle}
                            />
                        </View>
                        <View style={{ height: 1, backgroundColor: Colors.GRAY, marginTop: 10, marginLeft: 15, marginRight: 15 }} />
                        <ShowText show={showEvents} text={"Events On This Day"} toggle={toggleEvents} />
                        <ShowList eventList={events} show={showEventsList} />
                        <ShowText show={true} text={"Upcoming Events"} toggle={toggleUpcoming} />
                        <ShowList eventList={allEvents} show={showUpcoming} />
                    </View>
                </LinearGradient>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    calendarStyle: {
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-ExtraBold'
    },
    eventsButton: {
        backgroundColor: '#0d6efd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 10,
        width: '80%',
        marginTop: 8
    },
    eventsTitle: {
        fontFamily: 'Asap-Regular',
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold'
    },
    eventListing: {
        flex: 5,
        maxHeight: '20%'
    },
    gradientStyle: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,
        minHeight: '100%',
        width: '100%'
    }
});

export default CalendarScreen;