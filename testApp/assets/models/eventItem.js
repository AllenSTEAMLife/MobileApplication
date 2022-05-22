import * as React from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
} from 'react-native'
import Colors from '../colors/Colors';

const [showPopup, setShowPopup] = React.useState(false);

const togglePopup = () => {
    const currentState = showPopup;
    setShowPopup(!currentState);
}
const Popup=(props) => {
    const { message, time, title, show } = props;
    if (!show) {
        return (
            <View style={{ display: 'none' }}></View>
        );
    }
    return (
        <View></View>
    );
}

const EventItem=(props) => {
    const start = new Date(props.date * 1000);
    var hours = start.getHours();
    var minutes = start.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var timeString = `${start.toDateString()} @ ${strTime}`;
    
    return (
        <Pressable onPress={togglePopup}>
        <Popup title={props.title} time={timeString} message={props.message} show={showPopup}/>
        <View style={{flexDirection:'row', marginTop: 10, marginLeft: 5, justifyContent: 'center'}}>
            <View style={styles.viewStyle}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleStyle}>{props.title}</Text>
                <Text style={styles.dateStyle}>{timeString}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.messageStyle}>{props.message}</Text>
            </View>
        </View>
        </Pressable>
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