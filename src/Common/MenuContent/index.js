import React from "react";
import { map } from "lodash";
import MenuContentItem from "../../Common/MenuContentItem";

export default function MenuContent({ lists }) {
  return (
    <div>
      {map(lists, (item, index) => (
        <MenuContentItem list={item} key={index} />
      ))}
    </div>
  );
}
