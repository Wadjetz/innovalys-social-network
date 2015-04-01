var React = require('react');

var SingleArticle = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    render: function() {
        return (
            <div>
                <h2>SingleArticle Slug = {this.context.router.getCurrentParams().slug}</h2>
            </div>
        );
    }
});

module.exports = SingleArticle;
