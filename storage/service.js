import AsyncStorage from "@react-native-community/async-storage";
import { apply, asyncPipe } from "../utils/pipe";

// CONSTANTS
const keys = {
  timestamp: "timestamp",
  schedule: "schedule",
  feedback: "feedback",
  selections: "selections",
  home: "home",
};

Object.entries(keys).forEach(([key, value]) => {
  if (key !== value) throw new Error(`Key ${key} !== value ${value}`);
});

const validateKey = (key) => {
  if (key in keys) return key;
  throw new Error(`Invalid key: ${key}`);
};

// UTILS

const getItemFromStorage = (key) =>
  asyncPipe(
    validateKey(key),
    AsyncStorage.getItem,
    JSON.parse,
    (value) => value || undefined
  );

const setItemInStorage = (key, value) =>
  asyncPipe(
    value,
    JSON.stringify,
    apply(key, AsyncStorage.setItem),
    () => value || undefined
  );

// const fetchItem = (key) => {
//   console.log("The Server is still being used... oops");
//   asyncPipe(
//     axios.get(`http://ns-conf.lowrysoftware.com/api/2/${key}`),
//     ({ data }) => data,
//     apply(key, setItemInStorage)
//   );
// };

// const shouldRefetch = (key) =>
//   asyncPipe(
//     Promise.all([
//       // check timestamp in storage
//       getItemFromStorage(key),
//       // check timestamp of latest update
//       fetchItem(keys.timestamp),
//     ]),
//     // compare timestamps -- ignore anything that was before api version 2
//     ([{ timestamp: storageTimestamp = 0 } = {}, { timestamp = 1 } = {}]) =>
//       storageTimestamp < Math.max(1582844213530, timestamp)
//   );

// const getItem = (key) =>
//   asyncPipe(
//     shouldRefetch(key),
//     (should) => (should ? fetchItem(key) : getItemFromStorage(key)),
//     apply(key, setItemInStorage),
//     ({ data }) => data
//   );

// ACTIONS
// export const getHomeLinks = () => getItem(keys.home);
// export const getFeedback = () => getItem(keys.feedback);
// export const getSchedule = () => getItem(keys.schedule);
export const getSelections = () => getItemFromStorage(keys.selections);
export const hashBreakout = ({ day, time } = {}) => `<${day}><${time}>`;

export const selectOrUnselectBreakout = (select, { day, time, room }) =>
  asyncPipe(
    getItemFromStorage(keys.selections),
    (selections) => ({
      ...selections,
      [hashBreakout({ day, time })]: select ? room : undefined,
    }),
    apply(keys.selections, setItemInStorage)
  );
