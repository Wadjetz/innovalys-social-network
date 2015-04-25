const React        = require('react/addons');
const Grid         = require('react-bootstrap/lib/Grid');
const Row          = require('react-bootstrap/lib/Row');
const Col          = require('react-bootstrap/lib/Col');
const Input        = require('react-bootstrap/lib/Input');
const Button       = require('react-bootstrap/lib/Button');
const Alert        = require('react-bootstrap/lib/Alert');
const moment       = require('moment');
const utils        = require('../../commun/utils');
const If           = require('../utils/If');
const UsersActions = require('./UsersActions');
const UsersStore   = require('./UsersStore');

function getMe() {
    return {
        me: UsersStore.getMe()
    }
}

const User = React.createClass({
    render: function() {
        console.debug("User.render", this.state);
        let me = this.state.me;
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{me.first_name} {me.last_name}</h1>
                        <h2>{me.email}</h2>
                        <p>{me.description}</p>
                    </Col>                        
                </Row>
            </Grid>
        );
    },
    getInitialState: function () {
        return getMe();
    },
    onChange: function () {
        this.setState(getMe());
    },
    componentDidMount: function () {
        UsersStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        UsersStore.removeChangeListener(this.onChange);
    }
});

module.exports = User;
