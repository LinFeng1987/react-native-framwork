import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes: {
        title: PropTypes.string
    }


    render() {
        return (
            <View style={styles.HeaderBox}>
                <Text style={styles.Text}>
                    {this.props.title}
                </Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    HeaderBox: {
        justifyContent: 'center',
        backgroundColor: "#2d78f4",
        height: 60,
        fontSize: 16,
        textAlign: "center",
    },
    Text: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        fontWeight: '600',
    }
})