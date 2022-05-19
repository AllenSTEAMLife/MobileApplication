import * as React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';

const ShowDay = (props) => {
    const { text, color } = props;

    const styles = StyleSheet.create({
        dayBox: {
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
            justifyContent: "center",
            backgroundColor:color
        },
        dayText: {
            color:"white",
            textAlign:"center",
            fontWeight:"bold",
            fontSize:40
        }
    });

    return (
        <View style={styles.dayBox}>
            <Text style={styles.dayText}>{text} Day</Text>
        </View>
    );
};

export default ShowDay;