import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './Header.css';

class Header extends Component {
    state = {
        searchText: ''
    };

    handleSearchText = event => {
        this.setState({ searchText: event.target.value });
    };

    handleDrop = files => {
        this.props.onFileDroped(files[0]);
    }

    render() {
        return (
            <header className="header">
                <Dropzone onDropAccepted={this.handleDrop} accept="image/jpeg, image/png" multiple={false} className="header__dropzone" activeClassName="header__dropzone--active" rejectClassName="header__dropzone--reject">
                    <span className="fa fa-cloud-upload"></span> Drop or <span className="header__marked-text">browse...</span>
                </Dropzone>
                <div className="header__search">
                    <input type="text" value={this.state.searchText} onChange={this.handleSearchText} placeholder="Search" />
                </div>
                <div className="header__login">
                    <span className="header__login-icon"></span>
                    <span className="header__login-text">Log in</span>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    onFileDroped: PropTypes.func.isRequired
}

export default Header;