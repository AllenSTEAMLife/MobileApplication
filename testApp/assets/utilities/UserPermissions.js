import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status != "granted") {
                alert("Access to camera roll needed to upload profile picture")
            }
        }
    }
}

export default new UserPermissions();