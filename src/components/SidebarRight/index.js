import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './SidebarRight.css';

class SidebarRight extends Component {
    state = {
        selectedOption: 'latest'
    };

    handleOptionChange = event => {
        this.setState({ selectedOption: event.target.value });
    };

    handleTagHighlight = id => {
        this.context.onTagHighlight(id);
    };

    render() {
        const { selectedOption } = this.state;

        const tags = this.context.tags.map(tag => (
            <li className={classNames('sidebar-right__tag', { 'highlight': tag.isHighlight })} key={tag.id} onClick={this.handleTagHighlight.bind(this, tag.id)}>
                <span className="sidebar-right__tag-icon"></span>
                <span className="sidebar-right__tag-text">{tag.text}</span>
            </li>
        ));

        return (
            <div className="sidebar-right">
                <div className="sidebar-right__switch">
                    <label>
                        <input type="radio" name="type" value="latest" checked={selectedOption === 'latest'} onChange={this.handleOptionChange} />
                        <span></span>
                        <span>Latest</span>
                    </label>
                    <label>
                        <input type="radio" name="type" value="all" checked={selectedOption === 'all'} onChange={this.handleOptionChange} />
                        <span></span>
                        <span>All</span>
                    </label>
                </div>
                <ul className="sidebar-right__tags">
                    { tags }
                </ul>
            </div>
        );
    }
}

SidebarRight.contextTypes = {
    tags: PropTypes.array.isRequired,
    onTagHighlight: PropTypes.func.isRequired
};

export default SidebarRight;