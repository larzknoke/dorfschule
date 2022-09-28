import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { getEvents } from "../lib/events";

import moment from "moment";
import deLocale from "moment/locale/de";

import Header from "./components/header";

// import deLocale from "@fullcalendar/core/locales/de";

import EventTable from "./components/eventTable";
import EventForm from "./components/eventForm";

function Verein() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    moment.locale("de", deLocale);
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const events = await getEvents();
    setEvents(events);
  }

  return (
    <div>
      <Head>
        <title>Verein - Termine und Kalendar</title>
        <meta
          name="description"
          content="Dorfschule Rahnsdorf - Termine und Kalender"
        />
      </Head>

      <Header darkNav="true" />

      <main>
        <div className="md:p-20 p-12 text-slate-700 ">
          <h1>Termine und Kalender</h1>
          <div className="flex space-x-8 2xl:space-x-44 flex-col md:flex-row space-y-12 md:space-y-0">
            <div className="flex flex-col space-y-6">
              <EventForm fetchEvents={fetchEvents} />
              <EventTable events={events} />
            </div>
            <div className="w-full">Bild</div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Verein;
