import { pipe } from "../utils/pipe";

const getSpeakersFromEvent = ({
  speakers = [],
  facilitator,
  moderator,
  panelists = [],
} = {}) => [
  ...(speakers || []),
  ...(facilitator ? [facilitator] : []),
  ...(moderator ? [moderator] : []),
  ...(panelists || []),
];

const mapEventOntoSpeakers = (event) => (speaker) => ({
  ...speaker,
  events: [event],
});

const getSpeakerList = ({ days = [] } = {}) =>
  days.reduce(
    (speakers, { events = [] }) => [
      ...speakers,
      ...events.reduce(
        (speakers, event) => [
          ...speakers,
          ...((event.type || "").match(/breakout/i)
            ? (event.sessions || []).reduce(
                (speakers, session) => [
                  ...speakers,
                  ...getSpeakersFromEvent(session).map(
                    mapEventOntoSpeakers(session)
                  ),
                ],
                []
              )
            : getSpeakersFromEvent(event).map(mapEventOntoSpeakers(event))),
        ],
        []
      ),
    ],
    []
  );

const reduceSpeakers = (speakers) =>
  speakers.reduce(
    (speakers, { events = [], name, ...speaker }) => ({
      ...speakers,
      [name]: {
        ...speaker,
        name,
        events: [...((speakers[name] || {}).events || []), ...events],
      },
    }),
    {}
  );

export default (schedule) => pipe(schedule, getSpeakerList, reduceSpeakers);
