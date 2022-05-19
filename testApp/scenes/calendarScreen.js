import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarHeader from './headers/CalendarHeader';
import ShowView from './ShowView.js';
import event from '../assets/models/event';
import EventItem from '../assets/models/eventItem';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarScreen = () => {
    
    var eventState = false;
    const [data, setData] = React.useState([]);
    const [showEvents, setShowEvents] = React.useState(eventState);
    const [selectedDay, setSelectedDay] = React.useState();
    
    const dataFromStorage = async () =>{

     try { 
        const asyncData = await AsyncStorage.getItem('calendarEvents');
        setData(asyncData);
        const eventData = await AsyncStorage.getItem('eventState');
        if (eventData == null) {
            await AsyncStorage.setItem('eventState', `${false}`);
        }
        else {
            eventState = (eventData == 'true');
        }
        setShowEvents(eventState);

    } catch(error) {
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
            } catch(e) {
                console.error(e);
            }
        } catch (error) {
            console.error(error);
        } finally {
            
        }
    }
    React.useEffect(() => {
        dataFromStorage();
        getEvents();
      }, []);

    var events = [];
    var allEvents = [];
    if (selectedDay != undefined) {
        let tempData = data;
        tempData.forEach(event => {
            let time = new Date(event.startTime * 1000);
            let day = time.getUTCDate();
            //note that this starts from 0 but selectedDay.month starts from 1
            let month = time.getUTCMonth();
            allEvents.push(event);
            if ((selectedDay != undefined) && (day == selectedDay.day)) {
                events.push(event);
                eventState = true;
                AsyncStorage.setItem('eventState', `${eventState}`);
            }
        });
    }
    else {
        //need a try-catch here because it takes a bit of time before it gets data
        try {
            let tempData = data;
            console.log(tempData);
            if (tempData) {
            tempData.forEach(event => {
            let time = new Date(event.startTime * 1000);
            let day = time.getUTCDate();
            //note that this starts from 0 but selectedDay.month starts from 1
            let month = time.getUTCMonth();
            allEvents.push(event);
            });
            }
        } catch (error) { console.log(error); }
    }
    try {
    console.log("Selected day: ");
    console.log(selectedDay);
    } catch (error) {
        console.log(error);
    }
    if (eventState != showEvents) {
        console.log("Do something");
        setShowEvents(eventState);
    }
    console.log("Events: ");
    console.log(events);

    return(
        <View style={{backgroundColor: Colors.WHITE}}>
        <CalendarHeader />
        <View style={{minHeight: '100%'}}>
            <LinearGradient colors={['#ffffff','#ffffff','#ffffff','#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style = {{flex: 1, minHeight: '100%'}}>
                
                <View style={{alignItems: 'center', marginTop: 15}}>
                    <Text style={styles.upcomingEventsStyle}>Overview</Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Calendar
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={(day) => {setSelectedDay(day)}}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={(day) => {console.log('selected day', day)}}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        // Hide month navigation arrows. Default = false
                        hideArrows={true}
                        
                        hideExtraDays={true}
                        
                        disableMonthChange={false}
                        
                        renderHeader={() => {}}
                        
                        theme={styles.calendarStyle}
                        />
                </View>
                
                <View style={{height: 1, backgroundColor: Colors.GRAY, marginTop: 10, marginLeft: 15, marginRight: 15}} />
                <ShowView show={showEvents}>
                    <View style={{alignItems: 'center'}}>
                    <Text style={styles.eventsStyle}>Events On This Day</Text>
                    <FlatList 
                    scrollEnabled={true}
                    style = {{flex: 5}}
                    data = {events}
                    renderItem={({item}) => <EventItem title={item.name} date = {item.startTime} message = {item.description}/>} 
                    keyExtractor = {(key, index) => index.toString()}
                    />
                    </View>
                </ShowView>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.upcomingEventsStyle}>Upcoming Events</Text>
                    <FlatList 
                    scrollEnabled={true}
                    style = {{flex: 5}}
                    data = {allEvents}
                    renderItem={({item}) => <EventItem title={item.name} date = {item.startTime} message = {item.description}/>} 
                    keyExtractor = {(key, index) => index.toString()}
                    />
                </View>
            </View>
            </LinearGradient>
        </View>
        </View>
    );

}
/*

*/

const styles = StyleSheet.create({
    calendarStyle: {
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-ExtraBold'
    },
    eventsStyle: {
        fontFamily: 'Asap-Regular',
        fontSize: 34,
        color: '#393874'
    },
    upcomingEventsStyle: {
        fontFamily: 'Asap-Regular',
        fontSize: 34,
        color: '#393874'
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