import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const NotificationHeader = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.titleText}>
                    <Text style={styles.titleText}>
                        NOTFICATIONS
                    </Text>
                </Text>
            </View>
        </View>
    );
}

export default NotificationHeader

const styles = StyleSheet.create({
    titleText: {
        marginTop: 50,
        fontSize: 35,
        fontFamily: "Montserrat-SemiBold"
    }
});