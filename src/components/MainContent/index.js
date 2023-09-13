import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';
import Content from '../Content';
import './MainContent.css';

class MainContent extends Component {
    state = {
        file: {},
        tags: []
    };

    getChildContext = () => ({
        ...this.state,
        onTagAdd: this.handleTagAdd,
        onTagEdit: this.handleTagEdit,
        onTagHighlight: this.handleTagHighlight
    });

    handleFileDroped = file => {
        this.setState({ file, tags: [] });
    };

    handleTagEdit = (id, text) => {
        const index = this.state.tags.findIndex(tag => tag.id === id);
        const tag = this.state.tags[index];

        if (tag) {
            tag.text = text;
            this.setState({
                tags: [...this.state.tags.slice(0, index), tag, ...this.state.tags.slice(index + 1)]
            });
        }
    };

    handleTagAdd = tag => {
        const tags = this.state.tags;
        tags.forEach(tag => {
            tag.isHighlight = false;
        });
        tags.push(tag);
        this.setState({ tags });
    };

    handleTagHighlight = id => {
        let tags = this.state.tags;
        tags.forEach(tag => {
            if (id === tag.id) {
                tag.isHighlight = true;
            } else {
                tag.isHighlight = false;
            }
        });
        this.setState({ tags });
    }

    render() {
        return (
            <div className="main-content">
                <Header onFileDroped={this.handleFileDroped} />
                <Content />
            </div>
        );
    }
}

MainContent.childContextTypes = {
  tags: PropTypes.array,
  onTagAdd: PropTypes.func,
  onTagEdit: PropTypes.func,
  onTagHighlight: PropTypes.func,
  file: PropTypes.object
};

export default MainContent;
