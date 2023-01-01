import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

const Header = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.titleText}>
                    <Text style={styles.titleText}>
                        SERVICE
                    </Text>
                </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    titleText: {
        marginTop: 50,
        fontSize: 28,
        fontFamily: "Montserrat-SemiBold"
    }
});
export default Header;