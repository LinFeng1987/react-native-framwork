import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Home extends Component {

    static navigationOptions = {
        headerTitle:"商品详情",
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {navigate,goBack} = this.props.navigation;
        console.log(this.props)
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"#f5f5f5"}}>
                <Text>home</Text>
                <Text style={styles.Btn} onPress={()=>goBack(null)}>跳转到详情</Text>
            </View>
        )
    }

    test() {
        console.log(this.props)

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