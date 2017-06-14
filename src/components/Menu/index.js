import React, { Component } from 'react';

import MenuItem from '../MenuItem';

class Menu extends Component {
    state = {
        menuItems: [
            { title: 'home' },
            { title: 'messages', payload: 2 },
            { title: 'image' }
        ],
        focused: 0
    };

    handleClick = (index) => {
        this.setState({ focused: index });
    };

    render() {
        const menu = this.state.menuItems.map((item, index) => (
            <MenuItem
                key={item.title}
                item={item}
                isFocused={index === this.state.focused}
                onMenuItemClick={this.handleClick.bind(this, index)}
            />
        ));

        return (
            <ul>
                {menu}
            </ul>
        );
    }
}

export default Menu;