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
        pageY: 0,
        text: '',
        isEdit: false,
        tagId: null,
    };

    handleImageClick = event => {
        const { pageX, pageY } = event;
        this.setState({ pageX, pageY });

        this.handleShowModal();
    };

    handleClickOk = () => {
        if (!this.state.text) {
            this.setState({ areaError: true });
            return;
        }

        if (this.state.isEdit) {
            this.context.onTagEdit(this.state.tagId, this.state.text);
            this.handleCloseModal();
            return;
        }

        // получаем координаты картинки относительно viewport браузера
        const box = this.img.getBoundingClientRect();

        const tag = {
            id: new Date().getTime(),
            x: this.state.pageX - box.left,
            y: this.state.pageY - box.top,
            text: this.state.text,
            isHighlight: true
        };

        this.context.onTagAdd(tag);

        this.handleCloseModal();
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, text: '', isEdit: false });
    }

    handleShowModal = () => {
        this.setState({ showModal: true, areaError: false });
    }

    handleTagClick = ({ id, text }) => {
        this.context.onTagHighlight(id);
        this.setState({ showModal: true, isEdit: true, text: text, tagId: id });
    }

    render() {
        const tags = this.context.tags.map(tag => (
            <span
                className={classNames('preview__tag', { 'highlight': tag.isHighlight })}
                key={tag.id} style={{ top: tag.y, left: tag.x }}
                onClick={this.handleTagClick.bind(this, tag)}
            />
        ));

        return (
            <div className="preview">
                <img src={this.context.file.preview} ref={(img) => { this.img = img; }} alt="" onMouseDown={this.handleImageClick} />
                <div className="preview__tags-container">{ tags }</div>
                <ReactModal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="preview__modal"
                    overlayClassName="preview__modal-overlay"
                    contentLabel="Please enter the note."
                >
                    <textarea
                        className={classNames('preview__textarea', { 'error': this.state.areaError })}
                        placeholder="Text of note"
                        onChange={(e) => this.setState({ text: e.target.value.trim() })}
                        value={this.state.text}
                    />
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
    onTagEdit: PropTypes.func.isRequired,
    onTagHighlight: PropTypes.func.isRequired
};

export default Preview;
