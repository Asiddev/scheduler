import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  let finalMessage = "";

  const formatSpots = function () {
    if (props.spots === 0) {
      finalMessage += "no spots remaining";
    } else if (props.spots === 1) {
      finalMessage += "1 spot remaining";
    } else {
      finalMessage += `${props.spots} spots remaining`;
    }
  };
  formatSpots(props);
  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{finalMessage}</h3>
    </li>
  );
}
