import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

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
            <View>
                <StatusBar backgroundColor="#2d78f4" translucent={false} hidden={false} animated={true}/>
                <Text>首页</Text>
                <Text style={styles.Btn} onPress={() => navigate("Home")}>跳转到详情</Text>
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