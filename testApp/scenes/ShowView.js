import * as React from 'react';
import {
    FlatList,StyleSheet,Text,View,
} from 'react-native';
import event from '../assets/models/event';
import EventItem from '../assets/models/eventItem.js';

const ShowView = (props) => {
    const { eventList, show, text } = props;
    if (!show) {
        return (
            <View style={{display:'none'}}></View>
        );
    }
        return (
                    <FlatList 
                    scrollEnabled={true}
                    style = {{flex: 5}}
                    data = {eventList}
                    renderItem={({item}) => <EventItem title={item.name} date = {item.startTime} message = {item.description}/>} 
                    keyExtractor = {(key, index) => index.toString()}
                    />
      );
};


const styles = StyleSheet.create({
    eventsStyle: {
        fontFamily: 'Asap-Regular',
        fontSize: 34,
        color: '#393874'
    }
});

export default ShowView;