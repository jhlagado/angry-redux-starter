import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular'

class HelloComponent extends Component {
    render() {
        return (
            <span>Hello {this.props.name}</span>
        );
    }
}

HelloComponent.propTypes = {
    name: PropTypes.string,
};

export const helloComponent = react2angular(HelloComponent);
