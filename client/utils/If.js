const React = require('react');

const If = React.createClass({
    render: function() {
        if (this.props.condition) {
            return this.props.children;
        } else {
            return false;
        }
    }
});

module.exports = If;
