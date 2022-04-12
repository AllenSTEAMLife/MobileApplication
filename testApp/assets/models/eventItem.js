import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    
} from 'react-native'

import Colors from '../colors/Colors';
const EventItem=(props) => {
    const start = new Date(props.date * 1000);
    var hours = start.getHours();
    var minutes = start.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    
    return(
        <View style={{flexDirection:'row', marginTop: 10, marginLeft: 5, justifyContent: 'center'}}>
            
            <View style={styles.viewStyle} >
                <Text style={styles.titleStyle}>{props.title}</Text>
                <Text style={styles.dateStyle}>{start.toDateString()} @ {strTime}</Text>
                <Text numberOfLines={2} style={styles.messageStyle}>{props.message}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    viewStyle: {
        width: '95%',
        height: 111,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        padding: 10,
        marginRight: 7,
        marginBottom: 7,
        
    },
    
    titleStyle: {
        fontSize: 22,
        paddingBottom: 5
    },
    messageStyle: {
        fontSize: 14,
    },
    dateStyle: {
        color: '#ff0000'
    }
    
});
export default EventItem;