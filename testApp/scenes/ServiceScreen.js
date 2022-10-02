import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import SegmentedControl from 'rn-segmented-control';
import ServiceItem from '../assets/models/serviceItem';
import ServiceListItem from '../assets/models/serviceListItem';
import Header from './headers/ServicePageHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { getUserData } from '../assets/models/userSignInfo';

const ServiceScreen = () => {
    const [tabIndex, setTabIndex] = React.useState(2);
    const [data, setData] = React.useState([]);
    const [serviceItems, setServiceItems] = React.useState([]);
    const [usersEmail, setUsersEmail] = React.useState("");
    const [usersName, setUsersName] = React.useState("");
    const [usersService, setUsersService] = React.useState([]);

    var updateService = true;

    const handleTabChange = (index) => {
        setTabIndex(index);
    };
    function sortItems(thisDataArr) {
        var latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
        for (var index = 0; index < thisDataArr.length; index++) {
            latestDate = new Date(0, 0, 0, 0, 0, 0, 0);
            for (var index2 = index; index2 < thisDataArr.length; index2++) {
                var thisStartDateArr = thisDataArr[index2].date.split(",")[0].split("/");
                var thisStartTimeArr = thisDataArr[index2].date.split(",")[1].split(":");
                var thisDate = new Date(thisStartDateArr[2], thisStartDateArr[0], thisStartDateArr[1], thisStartTimeArr[0], thisStartTimeArr[1], 0, 0);
                if (thisDate > latestDate) {
                    latestDate = thisDate;
                    var tempItem = thisDataArr[index];
                    thisDataArr[index] = thisDataArr[index2];
                    thisDataArr[index2] = tempItem;
                }
            }
        }
        return thisDataArr;
    }

    const getServices = async () => {
        try {
            const response = await fetch('https://life.allencs.org/service/json');
            const json = await response.json();
            const serviceData = json["Items"];
            setData(serviceData);
            var userEmail = "";
            var userName = "";
            getUserData().then((data) => {
                try {
                    setUsersEmail(data[0]);
                    userEmail = data[0];
                    setUsersName(data[1]);
                    userName = data[1];
                } catch (error) { console.log("error: "+error); }
            });
            const response2 = await fetch('https://life.allencs.org/user/json?userAuthorized=true');
            const clubJson = await response2.json();
            const usersArr = clubJson["Items"];
            var userService = [];
            for (var index = 0; index < usersArr.length; index++) {
                if (usersArr[index]["User-Email"] == userEmail) {
                    userService = usersArr[index]["Service"];
                }
            }
            setUsersService(userService);
        } catch (error) {
            console.error(error);
        }
        if (data.length > 0 && updateService) {
            updateServices(data);
            updateService = false;
        }
    }

    const steamType = (typeStr) => {
        if (typeStr == "s" || typeStr == "t" || typeStr == "e" || typeStr == "a" || typeStr == "m" || typeStr == "steam") {
            return true
        }
        return false;
    }

    function clubInArray(clubArr, clubId) {
        for (var index=0; index < clubArr.length; index++) {
            if ((clubArr[index] == clubId) || (clubArr[index] == "All")) {
                return true;
            }
        }
        return false;
    }
    const updateServices = (dataArr) => {
        var services = [];
        var today = new Date();
        var yesterday = new Date(today.setDate(today.getDate() - 1));
        today.setDate(today.getDate() + 1);
        try {
            if (dataArr.length > 0) {
                dataArr.forEach(service => {
                    let dayArr = service["Start-Date"].split("/");
                    let day = dayArr[1];
                    let month = dayArr[0];
                    let year = dayArr[2];
                    let serviceId = service["ID"];
                    var startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);
                    var endDateFound = false;
                    var endDate = new Date();
                    try {
                        let endDateArr = service["End-Date"].split("/");
                        endDate = new Date(parseInt(endDateArr[2]), parseInt(endDateArr[0]) - 1, parseInt(endDateArr[1], 23, 59, 59, 0));
                        endDateFound = true;
                    } catch (error) { console.log("had error: " + error); }
                    if (!endDateFound) {
                        if (startDate > yesterday) {
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            var dateString = "";
                            try {
                                dateString += service["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newServiceItem = new ServiceItem(thisType, service["Service-Name"], service["Hours"], dateString, service["Description"]);
                            thisType = service["Type"].toLowerCase();
                            if (tabIndex == 0) {
                                if (steamType(thisType)) {
                                    if (usersEmail != "" && usersEmail != null) {
                                        if (clubInArray(usersService, serviceId)) {
                                            services.push(newServiceItem);
                                        }
                                    } else {
                                        services.push(newServiceItem);
                                    }
                                }
                            } else if (tabIndex == 1) {
                                if (!steamType(thisType)) {
                                    if (usersEmail != "" && usersEmail != null) {
                                        if (clubInArray(usersService, serviceId)) {
                                            services.push(newServiceItem);
                                        }
                                    } else {
                                        services.push(newServiceItem);
                                    }
                                }
                            } else if (tabIndex == 2) {
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersService, serviceId)) {
                                        services.push(newServiceItem);
                                    }
                                } else {
                                    services.push(newServiceItem);
                                }
                            }
                        }
                    } else {
                        if (endDate > yesterday) {
                            var thisType = service["Type"].toUpperCase();
                            if (thisType == "") {
                                thisType = "O";
                            }
                            var dateString = "";
                            try {
                                dateString += service["Start-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["Start-Time"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Date"];
                            } catch (error) { dateString += " "; }
                            try {
                                dateString += ",";
                                dateString += service["End-Time"];
                            } catch (error) { dateString += " "; }
                            var newServiceItem = new ServiceItem(thisType, service["Service-Name"], service["Hours"], dateString, service["Description"]);
                            thisType = service["Type"].toLowerCase();
                            if (tabIndex == 0) {
                                if (steamType(thisType)) {
                                    if (usersEmail != "" && usersEmail != null) {
                                        if (clubInArray(usersService, serviceId)) {
                                            services.push(newServiceItem);
                                        }
                                    } else {
                                        services.push(newServiceItem);
                                    }
                                }
                            } else if (tabIndex == 1) {
                                if (!steamType(thisType)) {
                                    if (usersEmail != "" && usersEmail != null) {
                                        if (clubInArray(usersService, serviceId)) {
                                            services.push(newServiceItem);
                                        }
                                    } else {
                                        services.push(newServiceItem);
                                    }
                                }
                            } else if (tabIndex == 2) {
                                if (usersEmail != "" && usersEmail != null) {
                                    if (clubInArray(usersService, serviceId)) {
                                        services.push(newServiceItem);
                                    }
                                } else {
                                    services.push(newServiceItem);
                                }
                            }
                        }
                    }
                });
            }
        } catch (error) { console.log("new error: " + error); }
        setServiceItems(sortItems(services));
    }

    React.useEffect(() => {
        getServices();
    }, [tabIndex]);

    return (
        <LinearGradient colors={['#ffffff', '#ffffff', '#ffffff', '#a6c4ff', '#2585f6']} style={styles.gradientStyle}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Header />
                <SegmentedControl
                    tabs={["STEAM", "Other", "All"]}
                    textStyle={{ fontSize: 15 }}
                    //onChange={(index) => {handleTabChange(index)}}
                    paddingVertical={6}
                    containerStyle={{
                        marginVertical: 20,
                    }}
                    currentIndex={tabIndex}
                    onChange={handleTabChange}
                />
                <FlatList
                    style={{ flex: 5 }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={serviceItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <ServiceListItem title={item.title} date={item.date} hours={item.hours} message={item.message} type={item.type} />}
                />
            </View>
        </LinearGradient>
    );
}

export default ServiceScreen

const styles = StyleSheet.create({
    gradientStyle: {
        flex: 1,
        zIndex: 0,
        paddingBottom: 50,

        width: '100%'
    }
})
