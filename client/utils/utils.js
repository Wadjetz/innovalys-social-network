var m = require('mithril');

module.exports.col = function (xs, sm, md, lg, body) {
    return (
        m('.row', [
            m('.col-xs-'+xs + '.col-sm-'+sm + '.col-md-'+md + '.col-lg-'+lg, body)
        ])
    );
};

