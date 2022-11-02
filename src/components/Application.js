import React from "react";

import appointments from "./Mock_Data/appointments";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  let allAppointments = Object.values(appointments).map(
    (appointment, index) => {
      console.log(appointment);
      return <Appointment key={appointment.id} {...appointment} />;
    }
  );

  console.log(allAppointments.length);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{allAppointments}</section>
    </main>
  );
}
