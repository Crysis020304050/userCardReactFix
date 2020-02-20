import React, { Component, Fragment } from 'react';
import styles from './styles.module.css';
import Avatar from '../Avatar';

class UserCard extends Component {

  render () {
    const { firstName, lastName, src } = this.props.user;
    return (<Fragment>
      <div className={styles.container}>
        <div className={styles.avatar}>
          <Avatar src={src}/>
        </div>
          <div className={styles.text}>
              <div>{firstName}</div>
              <div>{lastName}</div>
          </div>
      </div>
    </Fragment>);
  }
}

export default UserCard;