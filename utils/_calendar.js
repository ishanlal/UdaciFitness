// utils/_calendar.js

//import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from './helpers'

//export const CALENDAR_STORAGE_KEY = 'UdaciFitness:calendar'
export const CALENDAR_STORAGE_KEY = '@UdaciFitness'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

function setDummyData () {
  const { run, bike, swim, sleep, eat } = getMetricMetaInfo()

  let dummyData = {}
  const timestamp = Date.now()

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000
    const strTime = timeToString(time)
    dummyData[strTime] = getRandomNumber(3) % 2 === 0
      //? {
      ? [{
          run: getRandomNumber(run.max),
          bike: getRandomNumber(bike.max),
          swim: getRandomNumber(swim.max),
          sleep: getRandomNumber(sleep.max),
          eat: getRandomNumber(eat.max),
        //}
      }]
      //: null
      : new Array()
  }

  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

  return dummyData
}

function setMissingDates (dates) {
  const length = Object.keys(dates).length
  const timestamp = Date.now()

  for (let i = -183; i < 0; i++) {
    const time = timestamp + i * 24 * 60 * 60 * 1000
    const strTime = timeToString(time)
    if (typeof dates[strTime] === 'undefined') {
      //dates[strTime] = null
      dates[strTime] = new Array()
    }
  }
  return dates
}

export function formatCalendarResults (results) {
  return results === null
    ? setDummyData()
    : setMissingDates(JSON.parse(results))
}
