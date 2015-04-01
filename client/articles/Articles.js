var React = require('react/addons');
var Reflux = require('reflux');
var articlesStore = require('./ArticlesStore');
var actions = require('../actions');

var Articles = React.createClass({
    mixins: [
        Reflux.ListenerMixin
    ],
    getInitialState: function() {
        actions.m1("coucou")
        return {
            m1: '',
            m2: ''
        };
    },
    onM1: function (m1) {
        console.log("Articles onM1", "m1", m1);
        this.setState({
            m1: m1
        });
        actions.m2('next')
    },
    onM2: function (m2) {
        console.log("Articles onM1", "m2", m2);
        this.setState({
            m2: m2
        });
    },
    componentDidMount: function() {
        this.unsubscribeM1 = articlesStore.listen(this.onM1);
        this.unsubscribeM2 = articlesStore.listen(this.onM2);
    },
    componentWillUnmount: function() {
        this.unsubscribeM1();
        this.unsubscribeM2();
    },
    render: function() {
        console.log("Articles", "render");
        return (
            <div>
                <h2>Articles m1={this.state.m1} m2={this.state.m2}</h2>
            </div>
        );
    }
});

module.exports = Articles;
