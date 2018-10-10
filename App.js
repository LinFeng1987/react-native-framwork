import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Main from "./pages/Main";
import Home from "./pages/Home";

type Props = {};
const RootNavigator = StackNavigator({
        Main: {screen: Main,},
        Home: {screen: Home},

    }, {
        initialRouteName: "Main",
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#2d78f4",
                elevation: 0,

            },
            headerTintColor: "#fff",
            headerMode: 'screen',
            mode: "card",
            headerTitleStyle: {
                alignSelf: 'center',
                fontSize: 17,
                flex: 1,
                textAlign: 'center'
            },
            headerRight: (
                <View style={{height: 44, width: 55, justifyContent: 'center', paddingRight: 15}}/>
            ),
        },


    },
);
export default class App extends Component {
    /*constructor( props ) {
        super( props );
    }*/

    render() {
        return  <RootNavigator/>;
    }
}
// export default RootNavigator;