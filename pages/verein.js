import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";

import { getEvents } from "../lib/events";

import moment from "moment";
import deLocale from "moment/locale/de";

import Header from "./components/header";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { async } from "@firebase/util";
// import deLocale from "@fullcalendar/core/locales/de";

import EventTable from "./components/eventTable";
import EventForm from "./components/eventForm";

function Verein() {
  const [events, setEvents] = useState([]);

  const calendarRef = useRef(null);

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
            {/* <div className="DatePicker border-l-2 px-6 py-3 border-slate-200 w-full">
              <h3>Neuen Termin eintragen</h3>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="email"
                  className="border rounded-sm border-slate-300 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="beschreibung" className="block mb-2">
                  Beschreibung
                </label>
                <textarea
                  id="beschreibung"
                  className="border rounded-sm border-slate-300 w-full h-24"
                  value={beschreibung}
                  onChange={(e) => setBeschreibung(e.target.value)}
                />
              </div>
              <div className="flex space-x-8">
                <div className="mb-6 w-1/3">
                  <label htmlFor="personenzahl" className="block mb-2">
                    Personenzahl
                  </label>
                  <input
                    type="number"
                    min={1}
                    id="personenzahl"
                    className="border rounded-sm border-slate-300 w-full"
                    value={personenzahl}
                    onChange={(e) => setPersonenzahl(e.target.value)}
                  />
                </div>

                <div className="w-2/3 mb-6">
                  <label htmlFor="datum" className="block mb-2">
                    Datum
                  </label>
                  <DateRangePicker
                    minimumNights={0}
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={startDate}
                    endDate={endDate}
                    openDirection="up"
                    onDatesChange={({ startDate, endDate }) => {
                      setStartDate(startDate);
                      setEndDate(endDate);
                      console.log(startDate, endDate);
                    }}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => {
                      setFocusedInput(focusedInput);
                    }}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit}>Senden</Button>
            </div> */}
            {/* <div className="w-full">
              <FullCalendar
                ref={calendarRef}
                // innerRef={calendarRef}
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                initialView="dayGridMonth"
                locale="deLocale"
                firstDay={1}
                height={"auto"}
                buttonText={{ today: "Heute" }}
                events={events.map((event) => {
                  return {
                    title: event.beschreibung,
                    start: event.startDate,
                    end: event.endDate,
                    color: "var(--chakra-colors-gray-600)",
                  };
                })}
              />
            </div> */}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default Verein;
