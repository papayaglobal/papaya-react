import React, { useState } from "react";
import { map } from "lodash";
import MenuContentItem from "../../Common/MenuContentItem";

export default function MenuContent({ lists, onClickItem }) {
  const initialListsState = map(lists, (list, index) => ({
    ...list,
    isSubLinkActive: false,
    listIndex: index
  }));

  const [listsState, setListsState] = useState(initialListsState);

  const itemClicked = index => {
    onClickItem();
    if (index) {
      setListsState(
        map(listsState, list => ({
          ...list,
          isSubLinkActive: list.listIndex === index
        }))
      );
    } else {
      setListsState(
        map(listsState, list => ({
          ...list,
          isSubLinkActive: false
        }))
      );
    }
  };

  return (
    <div>
      {map(listsState, (item, index) => (
        <MenuContentItem list={item} key={index} onClickItem={itemClicked} />
      ))}
    </div>
  );
}
