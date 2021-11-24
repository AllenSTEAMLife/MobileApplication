import * as React from 'react';
import react from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Colors from '../assets/colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import CalendarHeader from './headers/CalendarHeader';

export default class CalendarScreen extends react.Component {
    dateCurrent = new Date();
    render() {
        return(
            <View style={{backgroundColor: Colors.WHITE}}>
            <CalendarHeader/>
            <ScrollView style={{minHeight: '100%'}}>
                <LinearGradient colors={['#ffffff','#ffffff','#ffffff','#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
                <View style = {{flex: 1, minHeight: '100%'}}>
                    
                    <View style={{alignItems: 'center', marginTop: 15}}>
                        <Text style={styles.upcomingEventsStyle}>Overview</Text>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Calendar
                            // Handler which gets executed on day press. Default = undefined
                            onDayPress={(day) => {console.log('selected day', day)}}
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
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.upcomingEventsStyle}>Upcoming Events</Text>
                    </View>
                    
                </View>
                </LinearGradient>
            </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    calendarStyle: {
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-ExtraBold'
        
    },
    upcomingEventsStyle: {
        fontFamily: 'Asap-Regular',
        fontSize: 36,
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
