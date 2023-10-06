"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomNotification = CustomNotification;
exports.FB_TYPE = void 0;
exports.RemoveTimer = RemoveTimer;
exports.TYPES = void 0;
exports.TimerNotification = TimerNotification;
exports.onEvent = onEvent;
var _reactNative = require("react-native");
const parseDate = rawDate => {
  let hours;
  let day;
  let month;
  if (rawDate.getHours().toString().length === 1) {
    hours = `0${rawDate.getHours()}`;
  } else {
    hours = `${rawDate.getHours()}`;
  }
  if (rawDate.getDate().toString().length === 1) {
    day = `0${rawDate.getDate()}`;
  } else {
    day = `${rawDate.getDate()}`;
  }
  if (rawDate.getMonth().toString().length === 1) {
    month = `0${rawDate.getMonth() + 1}`;
  } else {
    month = `${rawDate.getMonth() + 1}`;
  }
  return `${day}-${month}-${rawDate.getFullYear()} ${hours}:${rawDate.getMinutes()}:${rawDate.getSeconds()}`;
};
const LINKING_ERROR = `The package 'react-native-custom-timer-notification' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const CustomTimerNotification = _reactNative.NativeModules.CustomTimerNotification ? _reactNative.NativeModules.CustomTimerNotification : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const CustomNotificationModule = _reactNative.NativeModules.CustomNotificationModule ? _reactNative.NativeModules.CustomNotificationModule : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function TimerNotification(a) {
  const data = a;
  data.date = parseDate(data.date);
  if (_reactNative.Platform.OS === 'android') return CustomTimerNotification.TimerNotification(data);
  return null;
}
function RemoveTimer(a) {
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const payload = {
    id: a,
    foreground: b || false
  };
  CustomTimerNotification.RemoveTimer(payload);
}
function CustomNotification(a, cb) {
  const data = a;
  data.View = data.View.map(item => {
    if (item.type == 3) return {
      ...item,
      ZeroTime: parseDate(item.ZeroTime)
    };
    return {
      ...item
    };
  });
  if (_reactNative.Platform.OS === 'android') return CustomNotificationModule.CustomNotification(data, cb);
  return null;
}
function onEvent(listener) {
  _reactNative.DeviceEventEmitter.addListener('notificationClick', event => listener(event));
}
const TYPES = {
  Image: 1,
  Text: 2,
  Cronometer: 3
};
exports.TYPES = TYPES;
const FB_TYPE = {
  NORMAL: 0,
  BOLD: 1,
  ITALIC: 2,
  BOLD_ITALIC: 3
};
exports.FB_TYPE = FB_TYPE;
//# sourceMappingURL=index.js.map