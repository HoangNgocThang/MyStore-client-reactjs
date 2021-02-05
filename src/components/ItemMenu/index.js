import React, { PureComponent } from 'react';
import './ItemMenu.css';

class ItemMenu extends PureComponent {
    render() {
        const { item, handleClickItem } = this.props;
        return (
            <li className="menu-item" onClick={() => handleClickItem(item)}>
                <p style={{ fontWeight: 'bold', margin: 0 }}>{item.name}</p>
            </li>
        );
    }
}

export default ItemMenu;