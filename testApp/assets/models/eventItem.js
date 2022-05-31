import * as React from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    Modal,
    Dimensions
} from 'react-native'
import Colors from '../colors/Colors';

const EventItem = (props) => {
    const [showPopup, setShowPopup] = React.useState(false);

    const togglePopup = () => {
        const currentState = showPopup;
        setShowPopup(!currentState);
    }
    const Popup = (props) => {
        const { message, time, title, show } = props;
        return (
            <Modal animationType="fade" transparent={true} visible={show} onRequestClose={()=> {togglePopup();}}>
                <View style={styles.popupContainer}>
                <View style={styles.popupStyle}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.popupTitle}>{title}</Text>
                    <Text style={styles.popupTime}>{time}</Text>
                    <View style={styles.messageContainer}>
                        <Text numberOfLines={8} ellipsizeMode='tail' style={styles.popupMessage}>{message}</Text>
                    </View>
                    <Pressable
              style={({pressed}) => [ {
                backgroundColor: pressed
                ? '#114b7a' : '#2196F3'
              },
              styles.closeButton]}
              onPress={() => {togglePopup();}}
            >
              <Text style={styles.popupCloseText}>Close Event Details</Text>
            </Pressable>
                </View>
                </View>
            </Modal>
        );
    }
    const dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const start = new Date(props.date * 1000);
    var hours = start.getHours();
    var minutes = start.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var dayText = dayArray[start.getDay()];
    var monthText = monthArray[start.getMonth()];

    var dateString = `${dayText}, ${monthText} ${start.getDate()}, ${start.getFullYear()}`;
    var timeString = `${dateString} @ ${strTime}`;

    return (
        <View style={{alignItems:'center'}}>
        <Popup title={props.title} time={timeString} message={props.message} show={showPopup}/>
        <Pressable onPress={() => {togglePopup();}}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 5, justifyContent: 'center' }}>
                <View style={styles.viewStyle}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleStyle}>{props.title}</Text>
                    <Text style={styles.dateStyle}>{timeString}</Text>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.messageStyle}>{props.message}</Text>
                </View>
            </View>
            </Pressable>
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
    messageContainer: {
        padding: 26,
        paddingTop: 0,
        width: '100%',
        flexDirection: 'row'
    },
    dateStyle: {
        color: '#ff0000'
    },
    popupContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: '100%'
    },
    popupStyle: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    popupTitle: {
        margin: 20,
        marginBottom: 10,
        fontSize: 40,
        fontWeight: 'bold'
    },
    popupTime: {
        margin: 20, 
        marginTop: 0,
        marginBottom: 12,
        fontSize: 18,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: 'black'
    },
    popupMessage: {
        fontSize: 17
    },
    popupCloseText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    closeButton: {
        borderRadius: 16,
        marginTop: 10,
        padding: 10,
        elevation: 2
      }
});
export default EventItem;