import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './MenuItem.css';

const MenuItem = ({ item, isFocused, onMenuItemClick }) => {    
    return (
        <li className={classnames('menu-item', {'focused': isFocused})} onClick={onMenuItemClick}>
            <span className={item.title}></span>
            {item.payload ? <span className="messages-count"><span className="text">{item.payload}</span></span> : ''}
        </li>
    );
};

MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onMenuItemClick: PropTypes.func.isRequired
}

export default MenuItem;