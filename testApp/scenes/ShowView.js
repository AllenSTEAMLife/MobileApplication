import * as React from 'react';
import PropTypes, { nominalTypeHack } from 'prop-types';
import {
    View,
} from 'react-native';

const ShowView = (props) => {
    const { children, show, style } = props;
    if (!show) {
        //return null;
        return (
          <View style={{display:'none'}}>
              { children }
          </View>
      );
    }
    return (
        <View>
            { children }
        </View>
    );
};

export default ShowView;