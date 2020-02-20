import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import Spinner from '../Spinner';
import UserCard from '../UserCard';
import { REST_API_BASE_URL } from '../../constants';
import { loadJson } from '../../utils/loadJson';

class UsersList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      isFetching: true,
      users: [],
      error: null,
    };
  }

  loadData = () => {
    const { users: { length } } = this.state;
    const getUsersUrl = new URL(
      `/admin/users?limit=${this.props.limit}&offset=${length}`,
      REST_API_BASE_URL);

    setTimeout(() => {
      loadJson(getUsersUrl)
        .then(data => {
          this.setState({
                          users: this.state.users.concat(data),
                          isFetching: false,
                        });
        })
        .catch(err => {
          this.setState({
                          error: err,
                          isFetching: false,
                        });
        });
    }, 2000);
  };

  componentDidMount () {
    this.loadData();
  }

  renderUsers = () => {
    const { users } = this.state;
    return users.map(user => (
      <li key={user.id}>
        <UserCard user={user}/>
      </li>
    ));
  };
  renderSpinner = () => {
    const { isFetching } = this.state;
    if (isFetching) {
      return <Spinner/>;
    }
  };

  render () {

    return (

        <ol className={styles.container}>
          {
            this.renderUsers()
          }
          {
            this.renderSpinner()
          }

          <button onClick={this.loadData}>LOAD MORE</button>
        </ol>

    );
  }

}

UsersList.propTypes = {
  limit: PropTypes.number,
};

UsersList.defaultProps = {
  limit: 20,
};

export default UsersList;