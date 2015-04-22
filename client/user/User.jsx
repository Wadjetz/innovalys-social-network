var React = require('react/addons');
var Reflux = require('reflux');
var moment = require('moment');
var utils = require('../../commun/utils');
var If = require('../If');

var UsersActions = require('./UsersActions');
var UsersStore = require('./UsersStore');

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');
var Alert = require('react-bootstrap/lib/Alert');


var User = React.createClass({
    mixins: [
        Reflux.connect(UsersStore) 
    ],
    render: function() {
        console.debug("User.render", this.state);
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{this.state.me.first_name} {this.state.me.last_name}</h1>
                        <h2>{this.state.me.email}</h2>
                        <p>{this.state.me.description}</p>
                    </Col>                        
                </Row>
            </Grid>
        );
    }
});

module.exports = User;
