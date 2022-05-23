import * as React from 'react';
import {
    Pressable,
    View,
    Text,
    StyleSheet,
    Modal
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
            <Modal animationType="slide" transparent={true} visible={show} onRequestClose={()=> {togglePopup();}}>
                <View style={styles.popupStyle}>
                    <Text>{title}</Text>
                    <Text>{time}</Text>
                    <Text>{message}</Text>
                    <Pressable
              style={styles.closeButton}
              onPress={() => {togglePopup();}}
            >
              <Text>Close Event Details</Text>
            </Pressable>
                </View>
            </Modal>
        );
    }

    const start = new Date(props.date * 1000);
    var hours = start.getHours();
    var minutes = start.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var timeString = `${start.toDateString()} @ ${strTime}`;

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
    dateStyle: {
        color: '#ff0000'
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
        elevation: 5
    },
    closeButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3"
      }
});
export default EventItem;