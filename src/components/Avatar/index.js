import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorHash from 'color-hash'

class Avatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    render() {
        const {firstName, lastName, profilePicture} = this.props.user;
        if (this.state.error) {
            const userInitials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
            const colorHash = new ColorHash();
            return(
                <div style={{backgroundColor: colorHash.hex(userInitials)}}>{userInitials}</div>
            );
        }
        else {
            return (
              <img src={profilePicture} onError={(e) => {
                  this.setState({
                      error: `Cannot load picture with src=${profilePicture}`,
                  })
              }}/>
            );
        }
    }
}

/*
Avatar.propTypes = {
    src: PropTypes.string.isRequered,
    className: PropTypes.string,
    firstName: PropTypes.string.isRequered,
    lastName: PropTypes.string.isRequered,
};
*/

Avatar.defaultProps = {
    alt: 'avatar',
    className: '',
};

export default Avatar;