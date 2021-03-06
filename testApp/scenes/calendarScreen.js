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
import SegmentedControl from 'rn-segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarScreen = () => {
    const [data, setData] = React.useState([]);
    const [showEvents, setShowEvents] = React.useState(false);
    const [showEventsList, setShowEventsList] = React.useState(false);
    const [showUpcoming, setShowUpcoming] = React.useState(true);
    const [selectedDay, setSelectedDay] = React.useState();
    const [events, setEvents] = React.useState([]);
    const [todayEvents, setTodayEvents] = React.useState([]);
    const [allEvents, setAllEvents] = React.useState([]);
    const [selectedDayText, setSelectedDayText] = React.useState("");
    const [reloadCount, setReloadCount] = React.useState(0);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [showCalendar, setShowCalendar] = React.useState(true);

    const handleTabChange = (index) => {
        setTabIndex(index);
        
    };

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
        //initialize the day to be today's date on first run
        const today = new Date();
        var dayObject = { day:today.getDate(), month:(today.getMonth()+1), year:today.getFullYear() }
        setSelectedDay(dayObject);
        setSelectedDayText(`Events On ${dayObject.month}/${dayObject.day}`);
    }
    const getEvents = async () => {
        try {
            const response = await fetch('https://roboticsdev1584.github.io/RetroCycle/Assets/events.json');
            const json = await response.json();
            const eventItems = json["Items"];
            setData(eventItems);
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
        var eventsTodayArr = [];
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate()-1));
        today.setDate(today.getDate()+1);
        try {
            if (dataArr && dataArr.length > 0) {
                dataArr.forEach(event => {
                    let dayArr = event["Start-Date"].split("/");
                    let day = dayArr[1];
                    let month = dayArr[0];
                    let year = dayArr[2];
                    var startDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = event["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0])-1, parseInt(endDateArr[1], 23, 59, 59, 0));
                        endDateFound = true;
                    } catch(error) { console.log("had error: "+error); }
                    if (!endDateFound) {
                        //locale strings
                        var todayLocale = today.toLocaleString();
                        var sDateLocale = startDate.toLocaleString();
                        var yesterdayLocale = yesterday.toLocaleString();

                        if (startDate >= today) {
                            allEventsArr.push(event);
                        }
                        if (startDate <= today && startDate > yesterday) {
                            eventsTodayArr.push(event);
                        }
                        if (selectedDay != undefined) {
                            var selectedDayObj = new Date(selectedDay.year, selectedDay.month, selectedDay.day, 0, 0, 0, 0);
                            if (selectedDayObj == startDate) {
                                eventsArr.push(event);
                                AsyncStorage.setItem('eventState', `${true}`);
                            }
                        }
                    } else {
                        //locale strings
                        var todayLocale = today.toLocaleString();
                        var sDateLocale = startDate.toLocaleString();
                        var eDateLocale = endDate.toLocaleString();
                        var yesterdayLocale = yesterday.toLocaleString();

                        if (endDate >= today) {
                            allEventsArr.push(event);
                        }
                        if ((startDate <= today && startDate > yesterday) && (endDate >= today)) {
                            eventsTodayArr.push(event);
                        }
                        if (selectedDay != undefined) {
                            var selectedDayObj = new Date(selectedDay.year, selectedDay.month, selectedDay.day, 0, 0, 0, 0);
                            if (selectedDayObj >= startDate && selectedDayObj <= endDate) {
                                eventsArr.push(event);
                                AsyncStorage.setItem('eventState', `${true}`);
                            }
                        }
                    }
                });
            }
            if (eventsArr.length > 0) { setShowEvents(true);
                setShowEventsList(true); }
            else { setShowEvents(false);
                setShowEventsList(false); }
            setEvents(eventsArr);
            setTodayEvents(eventsTodayArr);
            setAllEvents(allEventsArr);
        }
        catch (error) {
            console.log("Error found: " + error);
        }
    }
    const toggleUpcoming = () => {
        const currentUpcoming = showUpcoming;
        setShowUpcoming(!currentUpcoming);
    }
    const toggleCalendarView = () => {
        const currentCalView = showCalendar;
        setShowCalendar(!currentCalView);
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
        //only run once
        if (reloadCount == 0) {
            dataFromStorage();
            setReloadCount(1);
        }
        getEvents();
        if (data.length > 0) {
            updateEvents(data);
        }
    }, [selectedDay, tabIndex]);

    const ShowList = (props) => {
        const { eventList, show } = props;
        if (!show) {
            return (
                <FlatList
                scrollEnabled={true}
                style={[{display: 'none'},styles.eventListing]}
                data={eventList}
                renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                keyExtractor={(key, index) => index.toString()}
                />
            );
        }
        return (
            <FlatList
                scrollEnabled={true}
                style={styles.eventListing}
                data={eventList}
                renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                keyExtractor={(key, index) => index.toString()}
            />
        );
    };
    const ShowView = (props) => {
        const { indexNum, styling, children } = props;
        if (tabIndex == indexNum) {
            return (
            <View style={{ styling }}>
                { children }
            </View>
            );
        }
        return (
            <View style={{ display:'none' }}></View>
        );
    }
    const ShowViewLimited = (props) => {
        const { show, styling, children } = props;
        if (!show) {
            return (
                <View style={{ display:'none' }}></View>
            );
        }
        return (
            <View style={{ styling }}>
                { children }
            </View>
        );
    }

    const ShowText = (props) => {
        const { show, text, toggle } = props;
        if (!show) {
            return (
            <View style={{ alignItems: 'center', display: 'none' }}>
                <Pressable style={styles.eventsButton} onPress={toggle}>
                    <Text style={styles.eventsTitle}>{text}</Text>
                </Pressable>
            </View>
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
                <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                <SegmentedControl
                        tabs={["Overview", "Upcoming", "Today"]}
                        paddingVertical={6}
                        containerStyle={{
                            marginVertical: 20,
                        }}
                        currentIndex={tabIndex}
                        onChange={handleTabChange}
                        textStyle={{fontSize: 15}}
                    />
                    </View>
                    <ShowView indexNum={0}>
                    <ShowViewLimited show={showCalendar} styling={{ flex: 1, minHeight: '100%' }}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Calendar
                                // Handler which gets executed on day press. Default = undefined
                                onDayPress={(day) => { setSelectedDay(day);updateEvents(data);setSelectedDayText(`Events On ${day.month}/${day.day}`); }}
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
                        
                    </ShowViewLimited>
                    <View style={{ alignItems: 'center', flexDirection:'row', justifyContent:'center' }}>
                            <Pressable style={styles.eventsButton} onPress={toggleCalendarView}>
                                <Text style={styles.eventsTitle}>{selectedDayText}</Text>
                            </Pressable>
                        </View>
                        <FlatList
                            scrollEnabled={true}
                            style={styles.eventListing}
                            data={events}
                            renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                            keyExtractor={(key, index) => index.toString()}
                        />
                    </ShowView>
                    <ShowView indexNum={1} styling={{ flex: 1, minHeight: '100%' }}>
                        <FlatList
                            scrollEnabled={true}
                            style={styles.eventListing}
                            data={allEvents}
                            renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                            keyExtractor={(key, index) => index.toString()}
                        />
                    </ShowView>
                    <ShowView indexNum={2} styling={{ flex: 1, minHeight: '100%' }}>
                        <FlatList
                            scrollEnabled={true}
                            style={styles.eventListing}
                            data={todayEvents}
                            renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                            keyExtractor={(key, index) => index.toString()}
                        />
                    </ShowView>
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
        paddingBottom:'80%'
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