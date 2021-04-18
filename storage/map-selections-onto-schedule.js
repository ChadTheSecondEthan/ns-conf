import { hashBreakout } from "./service";

const addSelectionToSession = (hashResult = "", event) => {
  const sessions = (event.sessions || []).map((session) => ({
    ...session,
    isSelected: (session.room || "").toLowerCase() === hashResult.toLowerCase(),
  }));

  const selectedSession = sessions.find(({ isSelected }) => isSelected);

  return {
    ...event,
    sessions,
    selectedSession,
  };
};

export default (selections, schedule) => ({
  ...schedule,
  days: (schedule?.days || []).map((day) => ({
    ...day,
    events: (day.events || []).map((event) => ({
      ...event,
      ...((event.type || "").match(/breakout.*group/i) &&
        addSelectionToSession(
          (selections || {})[hashBreakout(event || {})],
          event
        )),
    })),
  })),
});
