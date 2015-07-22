import React from 'react/addons';
import Bootstrap, { Row, Col, Input, Label, Button } from 'react-bootstrap';
import Router, { Link, Navigation } from 'react-router';
import i18n from '../../commun/local';
import ChatActions from '../chat/ChatActions';

/**
 * User components
 */
export default class User extends React.Component {
  /**
   * Call ArticlesService for find All news
   * @param  {object} props Props
   */
  constructor(props) {
    super(props);
    this.chatRoom = this.chatRoom.bind(this);
    this.state = {
      articles: []
    };
  }
  /**
   * Render components
   * @return {ReactDOM} View
   */
  render() {
    let user = this.props.user;
    let connect = (user.status_connection == 'online')
                  ? <Label bsStyle='success'>online</Label>
                  : <Label>offline</Label>
    return (
      <div className="thumbnail" style={{ marginBottom: 15 }}>
        <h4>
          <Link to="profil" params={{id: user.id}}>{user.first_name} {user.last_name}</Link>
        </h4>
        <p>
           {connect} <Label bsStyle='info'>{user.function}</Label> <Label bsStyle='info'>{user.role}</Label>
        </p>
        <Button bsStyle='primary' bsSize='xsmall' onClick={this.chatRoom}>{i18n.__n('message')}</Button>
      </div>
    );
  }

  chatRoom () {
    ChatActions.joinUserRoom(this.props.user);
  }
}
