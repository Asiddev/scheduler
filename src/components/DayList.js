import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  let allItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{allItems}</ul>;
}

export default DayList;
