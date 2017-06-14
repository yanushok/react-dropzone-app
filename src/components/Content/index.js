import React, { Component } from 'react';

import Preview from '../Preview';
import SidebarRight from '../SidebarRight';
import './Content.css';

class Content extends Component {
    render() {
        return (
            <div className="content">
                <Preview />
                <SidebarRight />
            </div>
        );
    }
}

export default Content;