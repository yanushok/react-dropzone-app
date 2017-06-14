import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import './Preview.css';

class Preview extends Component {
    state = {
        showModal: false,
        areaError: false,
        pageX: 0,
        pageY: 0
    };

    handleImageClick = event => {
        const { pageX, pageY } = event;
        this.setState({ pageX, pageY });

        this.handleShowModal();
    };

    handleClickOk = () => {
        const value = this.textArea.value.trim();

        if (!value) {
            this.setState({ areaError: true });
            return;
        }

        // получаем координаты картинки относительно viewport браузера
        const box = this.img.getBoundingClientRect();

        const tag = {
            id: new Date().getTime(),
            x: this.state.pageX - box.left,
            y: this.state.pageY - box.top,
            text: value,
            isHighlight: true
        };

        this.context.onTagAdd(tag);

        this.handleCloseModal();
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    handleShowModal = () => {
        this.setState({ showModal: true, areaError: false });
    }

    handleTagClick = id => {
        this.context.onTagHighlight(id);
    }

    render() {
        const tags = this.context.tags.map(tag => (
            <span className={classNames('preview__tag', { 'highlight': tag.isHighlight })} key={tag.id} style={{ top: tag.y, left: tag.x }} onClick={this.handleTagClick.bind(this, tag.id)}></span>
        ));

        return (
            <div className="preview">
                <img src={this.context.file.preview} ref={(img) => { this.img = img; }} alt="" onMouseDown={this.handleImageClick} />
                <div className="preview__tags-container">{ tags }</div>
                <ReactModal
                    isOpen={this.state.showModal}
                    className="preview__modal"
                    overlayClassName="preview__modal-overlay"
                    contentLabel="Please enter the note."
                >
                    <textarea className={classNames('preview__textarea', { 'error': this.state.areaError })} placeholder="Text of note" ref={(area) => { this.textArea = area; }}></textarea>
                    <button onClick={this.handleClickOk}>Ok</button>
                    <button onClick={this.handleCloseModal}>Cancel</button>
                </ReactModal>
            </div>
        );
    }
}

Preview.contextTypes = {
    file: PropTypes.object.isRequired,
    tags: PropTypes.array.isRequired,
    onTagAdd: PropTypes.func.isRequired,
    onTagHighlight: PropTypes.func.isRequired
};

export default Preview;