var React = require('react');

var Signup = React.createClass({
    render: function() {
        return (
            <div />
        );
    }
});

module.exports = Signup;

var newUser = {
    email: req.body.email,
    role: req.body.role,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthday_date: req.body.birthday_date,
    adress: req.body.adress,
    function: req.body.function,
    description: req.body.description,
    arrival_date: req.body.arrival_date
}

