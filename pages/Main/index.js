import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import Header from '../../component/Header';

export default class Main extends Component {
    static navigationOptions = {
        headerTitle: '首页',
        header: null
    };


    constructor(props) {
        super(props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="#2d78f4" translucent={false} hidden={false} animated={true}/>
                <Header title="首页"></Header>
                <View style={{flex: 1, justifyItems: "center", justifyContent: "center"}}>
                    <Text>首页</Text>
                    <Text style={styles.Btn} onPress={() => navigate("Home")}>跳转到详情</Text>
                </View>
            </View>
        )
    }


    jump() {
        console.log(this);
        const {navigate} = this.props.navigation;
        navigate("Home")
    }


}

const styles = StyleSheet.create({
    Main: {
        flex: 1
    },
    Btn: {
        width: 100,
        height: 30,
        backgroundColor: "#2d78f4",
        textAlign: 'center',
        lineHeight: 30,
        color: "#fff"
    }
})