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
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { getUserData } from '../assets/models/userSignInfo';

const CalendarScreen = () => {
    const [data, setData] = React.useState([]);
    const [markedDayList, setMarkedDayList] = React.useState({});
    const [showEvents, setShowEvents] = React.useState(false);
    const [showEventsList, setShowEventsList] = React.useState(false);
    const [showUpcoming, setShowUpcoming] = React.useState(true);
    //set the initially selected day to today
    var todaysDate = new Date();
    var todaysDay = todaysDate.getDate();
    var tDayZeroString = "";
    if (todaysDay < 10) {
        tDayZeroString = "0";
    }
    var todaysMonth = todaysDate.getMonth()+1;
    var tMonthZeroString = "";
    if (todaysMonth < 10) {
        tMonthZeroString = "0";
    }
    var todaysYear = todaysDate.getFullYear();
    var todaysTimestamp = Date.UTC(todaysYear, todaysMonth, todaysDay);
    var todaysDateString = `${todaysYear}-${tMonthZeroString}${todaysMonth}-${tDayZeroString}${todaysDay}`;
    const [selectedDay, setSelectedDay] = React.useState(
        {
            day: todaysDay,
            month: todaysMonth,
            year: todaysYear,
            timestamp: todaysTimestamp,
            dateString: todaysDateString
          }
    );
    const [events, setEvents] = React.useState([]);
    const [todayEvents, setTodayEvents] = React.useState([]);
    const [allEvents, setAllEvents] = React.useState([]);
    const [selectedDayText, setSelectedDayText] = React.useState("");
    const [reloadCount, setReloadCount] = React.useState(0);
    const [tabIndex, setTabIndex] = React.useState(0);
    const [showCalendar, setShowCalendar] = React.useState(true);
    const [usersEmail, setUsersEmail] = React.useState("");
    const [usersName, setUsersName] = React.useState("");
    const [usersClubs, setUsersClubs] = React.useState([]);

    var monthArray = ["September", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const handleTabChange = (index) => {
        setTabIndex(index);
        dataFromStorage();
    };
    function sortItems(thisDataArr) {
        var latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
        for (var index = 0; index < thisDataArr.length; index++) {
            latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
            for (var index2 = index; index2 < thisDataArr.length; index2++) {
                var thisStartDateArr = thisDataArr[index2]["Start-Date"].split("/");
                var thisStartTimeArr = thisDataArr[index2]["Start-Time"].split(":");
                var thisDate = new Date(thisStartDateArr[2], thisStartDateArr[0], thisStartDateArr[1], thisStartTimeArr[0], thisStartTimeArr[1], 0, 0);
                if (thisDate > latestDate) {
                    latestDate = thisDate;
                    var tempItem = thisDataArr[index];
                    thisDataArr[index] = thisDataArr[index2];
                    thisDataArr[index2] = tempItem;
                }
            }
        }
        return thisDataArr;
    }

    const dataFromStorage = async () => {
        try {
            /*const asyncData = await AsyncStorage.getItem('calendarEvents');
            setData(asyncData);*/
            const eventData = await AsyncStorage.getItem('eventState');
            var eventState = false;
            var userEmail = "";
            var userName = "";
            getUserData().then((data) => {
                try {
                    setUsersEmail(data[0]);
                    userEmail = data[0];
                    setUsersName(data[1]);
                    userName = data[1];
                } catch (error) { console.log("error: "+error); }
            });
            setShowEvents(eventState);
            const response2 = await fetch('https://life.allencs.org/user/json?userAuthorized=true');
            const clubJson = await response2.json();
            const usersArr = clubJson["Items"];
            var userClub = [];
            for (var index = 0; index < usersArr.length; index++) {
                if (usersArr[index]["User-Email"] == userEmail) {
                    userClub = usersArr[index]["Clubs-Joined"];
                }
            }
            setUsersClubs(userClub);
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
            const response = await fetch('https://life.allencs.org/events/json');
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
    function clubInArray(clubArr, clubId) {
        for (var index=0; index < clubArr.length; index++) {
            if ((clubArr[index] == clubId) || (clubArr[index] == "All")) {
                return true;
            }
        }
        if (clubId == 0) { return true; }
        return false;
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
                    let eventClubId = event["Club"];
                    var startDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = event["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0])-1, parseInt(endDateArr[1]), 23, 59, 59, 0);
                        endDateFound = true;
                    } catch(error) { console.log("had error: "+error); }
                    if (!endDateFound) {
                        //locale strings
                        var todayLocale = today.toLocaleString();
                        var sDateLocale = startDate.toLocaleString();
                        var yesterdayLocale = yesterday.toLocaleString();
                        //if user is signed in only show their club's events
                        if (usersEmail != "" && usersEmail != null) {
                            if (clubInArray(usersClubs, eventClubId)) {
                                if (startDate >= today) {
                                    eventsArr.push(event);
                                }
                                if (startDate <= today && startDate > yesterday) {
                                    eventsTodayArr.push(event);
                                }
                            }                            
                        } else {
                            if (startDate >= today) {
                                eventsArr.push(event);
                            }
                            if (startDate <= today && startDate > yesterday) {
                                eventsTodayArr.push(event);
                            }
                        }
                        if (selectedDay != undefined) {
                            var selectedDayObj = new Date(selectedDay.year, selectedDay.month-1, selectedDay.day, 0, 0, 0, 0);
                            if (selectedDayObj == startDate) {
                                allEventsArr.push(event);
                                AsyncStorage.setItem('eventState', `${true}`);
                            }
                        }
                    } else {
                        //locale strings
                        var todayLocale = today.toLocaleString();
                        var sDateLocale = startDate.toLocaleString();
                        var eDateLocale = endDate.toLocaleString();
                        var yesterdayLocale = yesterday.toLocaleString();
                        //if user is signed in only show their club's events
                        if (usersEmail != "" && usersEmail != null) {
                            //console.log("club in array: "+clubInArray(usersClubs, eventClubId));
                            if (clubInArray(usersClubs, eventClubId)) {
                                if (endDate >= today) {
                                    eventsArr.push(event);
                                }
                                if (startDate <= today && endDate >= today) {
                                    eventsTodayArr.push(event);
                                }
                            }                            
                        } else {
                            if (endDate >= today) {
                                eventsArr.push(event);
                            }
                            if (startDate <= today && endDate >= today) {
                                eventsTodayArr.push(event);
                            }
                        }
                        if (selectedDay != undefined) {
                            var selectedDayObj = new Date(selectedDay.year, selectedDay.month-1, selectedDay.day, 0, 0, 0, 0);
                            if (selectedDayObj >= startDate && selectedDayObj <= endDate) {
                                allEventsArr.push(event);
                                AsyncStorage.setItem('eventState', `${true}`);
                            }
                        }
                    }
                });
            }
            if (allEventsArr.length > 0) { setShowEvents(true);
                setShowEventsList(true); }
            else { setShowEvents(false);
                setShowEventsList(false); }
            setEvents(sortItems(eventsArr));
            setTodayEvents(sortItems(eventsTodayArr));
            setAllEvents(sortItems(allEventsArr));
        }
        catch (error) {
            console.log("Error found: " + error);
        }
        //mark the days with events on the calendar
        try {
            if (dataArr && dataArr.length > 0) {
                var markedDaysJson = {};
                dataArr.forEach(event => {
                    let dayArr = event["Start-Date"].split("/");
                    let day = dayArr[1];
                    let month = dayArr[0];
                    let year = dayArr[2];
                    var startDate = new Date(parseInt(year), parseInt(month)-1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    var monthZeroString = "";
                    var dayZeroString = "";
                    try {
                        let endDateArr = event["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0])-1, parseInt(endDateArr[1]), 23, 59, 59, 0);
                        endDateFound = true;
                    } catch(error) { console.log("had error: "+error); }
                    if (!endDateFound) {
                        if (month < 10) { monthZeroString = "0"; }
                        if (day < 10) { dayZeroString = "0"; }
                        markedDaysJson[`${year}-${monthZeroString}${month}-${dayZeroString}${day}`] = {marked: true};
                    } else {
                        //increment through dates that the event spans
                        for (var indexDate = startDate; indexDate <= endDate; indexDate.setDate(indexDate.getDate()+1)) {
                            var thisYear = indexDate.getFullYear();
                            var thisMonth = indexDate.getMonth()+1;
                            var thisDay = indexDate.getDate();
                            if (thisMonth < 10) { monthZeroString = "0"; }
                            if (thisDay < 10) { dayZeroString = "0"; }
                            markedDaysJson[`${thisYear}-${monthZeroString}${thisMonth}-${dayZeroString}${thisDay}`] = {marked: true};
                        }
                    }
                });
                markedDaysJson[selectedDay] = { selected: true, disableTouchEvent: true };
                setMarkedDayList(markedDaysJson);
            }
            if (allEventsArr.length > 0) { setShowEvents(true);
                setShowEventsList(true); }
            else { setShowEvents(false);
                setShowEventsList(false); }
            setEvents(sortItems(eventsArr));
            setTodayEvents(sortItems(eventsTodayArr));
            setAllEvents(sortItems(allEventsArr));
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
    const getMonthName = (monthNumber) => {
        return monthArray[monthNumber-1];
    }

    React.useEffect(() => {
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
                                
                                initialDate = {selectedDay["dateString"]}

                                markedDates={markedDayList}

                                hideExtraDays={true}

                                enableSwipeMonths={true}

                                disableMonthChange={false}

                                renderHeader={(day) => { 
                                    var day = day.toString();
                                    var splitDay = day.split(" ");
                                    //fix the header text if it using the werid date format
                                    if (day.indexOf(",") == -1) {
                                        return <Text>{splitDay[1] + " " + splitDay[3]}</Text>
                                    } else {
                                        return <Text>{splitDay[2] + " " + splitDay[3]}</Text>
                                    }
                                }}

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
                            data={allEvents}
                            renderItem={({ item }) => <EventItem title={item["Event-Name"]} date={`${item["Start-Date"]},${item["Start-Time"]},${item["End-Date"]},${item["End-Time"]}`} message={item["Description"]} />}
                            keyExtractor={(key, index) => index.toString()}
                        />
                    </ShowView>
                    <ShowView indexNum={1} styling={{ flex: 1, minHeight: '100%' }}>
                        <FlatList
                            scrollEnabled={true}
                            style={styles.eventListing}
                            data={events}
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