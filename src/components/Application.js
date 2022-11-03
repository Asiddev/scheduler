import React from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview } from "./helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });

  //fetch data for days , render once.
  useEffect(() => {
    let getDays = axios.get("/api/days");
    let getAppointments = axios.get("/api/appointments");
    let getInterviewers = axios.get("/api/interviewers");

    const promises = [getDays, getAppointments, getInterviewers];

    Promise.all(promises).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });

    // axios.get("/api/days").then((res) => setDays(res.data));
  }, []);

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  let allAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
