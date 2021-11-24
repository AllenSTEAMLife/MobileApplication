import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    
} from 'react-native'
import Colors from '../colors/Colors';
const NotifcationItem=(props) => {
    return(
        <View style={{flexDirection:'row', marginTop: 10, marginLeft: 5}}>
            <View style={styles.iconStyle}>
                <Text style={styles.iconTextStyle}>{props.type.charAt(0)}</Text>
            </View>
            <View style={styles.viewStyle} >
                <Text style={styles.titleStyle}>{props.title}</Text>
                <Text style={styles.messageStyle}>{props.message}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    viewStyle: {
        width: 300,
        height: 111,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        paddingLeft: 10,
        marginRight: 7,
        marginBottom: 7,
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 3
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 5,
        // elevation: 7,
    },
    iconStyle: {
        width: 41,
        height: 41,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
        
    },
    iconTextStyle: {
        fontSize: 16
    },  
    titleStyle: {
        fontSize: 22,
        paddingBottom: 5
    },
    messageStyle: {
        fontSize: 14,
    }
    
});
export default NotifcationItem;