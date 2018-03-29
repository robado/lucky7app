import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    View,
} from 'react-native';

const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
};

export class MarkerCalloutObject extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.bubble}>
                    <View style={styles.amount}>
                        {this.props.children}
                    </View>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
            </View>
        );
    }
}

MarkerCalloutObject.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        width: 100,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fafcff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        borderColor: '#007a87',
        borderWidth: 0.5,
    },
    amount: {
        flex: 0,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#a8b6b9',
        alignSelf: 'center',
        marginTop: -32,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 16,
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        alignSelf: 'center',
        marginTop: -0.5,
    },
});


module.exports = MarkerCalloutObject;