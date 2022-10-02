import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

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
        fontSize: 32,
        fontFamily: "Montserrat-SemiBold"
    }
});