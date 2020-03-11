import React, { useState } from "react";
import { map, isEqual } from "lodash";
import MenuContentItem from "../../Common/MenuContentItem";

export default function MenuContent({ lists, onClickItem }) {
    const [activeItem, setActiveItem] = useState(null);

    const itemClicked = ({ item }) => {
        onClickItem();
        updateActiveItem(item);
    };

    const updateActiveItem = item => setActiveItem(item);

    return (
        <div>
            {map(lists, (item, index) => {
                return (
                    <MenuContentItem
                        list={item}
                        active={isEqual(item, activeItem)}
                        key={index}
                        onClickItem={props => itemClicked({ ...props, item })}
                        updateActiveItem={updateActiveItem}
                    />
                );
            })}
        </div>
    );
}
