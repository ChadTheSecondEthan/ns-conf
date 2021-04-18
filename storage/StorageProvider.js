import React, { createContext, useEffect, useState } from "react";
import { apply, compose, tap } from "../utils/pipe";
import getSpeakersFromSchedule from "./get-speakers-from-schedule";
import hashEvents from "./hash-events";
import mapSelectionsOntoSchedule from "./map-selections-onto-schedule";
import { getSelections, selectOrUnselectBreakout } from "./service";

import homeLinks from "./json-files/homeLinks.json";
import feedback from "./json-files/feedback.json";
import scheduleWithoutSelections from "./json-files/schedule.json";

export const StorageContext = createContext();

export const StorageConsumer = StorageContext.Consumer;

export default function StorageProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    getSelections().then(setSelections).then(apply(false, setLoading));
  }, []);

  const selectOrUnselectBreakoutSession = (select) => (breakout) =>
    selectOrUnselectBreakout(select, breakout).then(setSelections);

  const selectBreakout = selectOrUnselectBreakoutSession(true);
  const unselectBreakout = selectOrUnselectBreakoutSession(false);

  const schedule = mapSelectionsOntoSchedule(
    selections,
    scheduleWithoutSelections
  );
  const hashedEvents = hashEvents(schedule);

  const speakers = getSpeakersFromSchedule(schedule);

  console.log(speakers);

  return loading ? null : (
    <StorageContext.Provider
      value={{
        schedule,
        speakers,
        feedback,
        homeLinks,
        hashedEvents,
        selectBreakout,
        unselectBreakout,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
