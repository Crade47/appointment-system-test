import { TimelineEventProps, CalendarUtils } from 'react-native-calendars'

export type BusyDataType = Array<{ start: number; end: number }>
const DEFAULT_BUSY: BusyDataType = [
  { start: 22, end: 24 },
  { start: 0, end: 6 },
]
const EVENT_COLOR = '#e6add8'
const today = new Date()
export const getDate = (offset = 0) =>
  CalendarUtils.getCalendarDateString(
    new Date().setDate(today.getDate() + offset),
  )

export const busyData = [ 
  {
    '2023-06-30': [
      { start: 0, end: 9 },
      { start: 12, end: 15 },
      { start: 22.15, end: 24 },
    ],
  },
]

export const timelineEvents: TimelineEventProps[] = [
  {
    start: `${getDate(-2)} 09:30:00`,
    end: `${getDate(-2)} 10:30:00`,
    title: 'John Doe',
  },
  {
    start: `${getDate(-1)} 14:45:00`,
    end: `${getDate(-1)} 15:45:00`,
    title: 'Alice Smith',
  },
  {
    start: `${getDate(0)} 11:15:00`,
    end: `${getDate(0)} 12:15:00`,
    title: 'Robert Johnson',
  },
  {
    start: `${getDate(1)} 17:20:00`,
    end: `${getDate(1)} 18:20:00`,
    title: 'Emily Davis',
  },
  {
    start: `${getDate(2)} 16:00:00`,
    end: `${getDate(2)} 17:00:00`,
    title: 'Michael Brown',
  },
  {
    start: `${getDate(-2)} 10:45:00`,
    end: `${getDate(-2)} 11:45:00`,
    title: 'Olivia Johnson',
  },
  {
    start: `${getDate(-1)} 13:10:00`,
    end: `${getDate(-1)} 14:10:00`,
    title: 'David Wilson',
  },
  {
    start: `${getDate(0)} 08:30:00`,
    end: `${getDate(0)} 09:30:00`,
    title: 'Sophia Thomas',
  },
  {
    start: `${getDate(1)} 15:40:00`,
    end: `${getDate(1)} 16:40:00`,
    title: 'Emma Jackson',
  },
  {
    start: `${getDate(2)} 12:00:00`,
    end: `${getDate(2)} 13:00:00`,
    title: 'Daniel Anderson',
  },
  {
    start: `${getDate(-2)} 10:20:00`,
    end: `${getDate(-2)} 11:20:00`,
    title: 'Isabella Martinez',
  },
  {
    start: `${getDate(-1)} 15:50:00`,
    end: `${getDate(-1)} 16:50:00`,
    title: 'Noah Taylor',
  },
  {
    start: `${getDate(0)} 13:30:00`,
    end: `${getDate(0)} 14:30:00`,
    title: 'Mia Garcia',
  },
  {
    start: `${getDate(1)} 09:10:00`,
    end: `${getDate(1)} 10:10:00`,
    title: 'Ethan Wilson',
  },
  {
    start: `${getDate(2)} 11:45:00`,
    end: `${getDate(2)} 12:45:00`,
    title: 'Sophia Adams',
  },
  {
    start: `${getDate(-2)} 14:20:00`,
    end: `${getDate(-2)} 15:20:00`,
    title: 'Alexander Davis',
  },
  {
    start: `${getDate(-1)} 10:00:00`,
    end: `${getDate(-1)} 11:00:00`,
    title: 'Ava Wilson',
  },
  {
    start: `${getDate(0)} 16:30:00`,
    end: `${getDate(0)} 17:30:00`,
    title: 'Oliver Johnson',
  },
  {
    start: `${getDate(1)} 12:50:00`,
    end: `${getDate(1)} 13:50:00`,
    title: 'Charlotte Brown',
  },
  {
    start: `${getDate(2)} 09:25:00`,
    end: `${getDate(2)} 10:25:00`,
    title: 'Liam Thomas',
  },
]

export const patientNotes = {
  "2023-07-02 13:30:00":{
    "Mia Garcia": "<div><b>Hello</b></div><div>How are you doing</div><div>This section contains details about the session </div>;"
  }
} 



export const marked = {
  [`${getDate(-2)}`]: { marked: true },
  [`${getDate(-1)}`]: { marked: true },
  [`${getDate()}`]: { marked: true },
  [`${getDate(1)}`]: { marked: true },
  [`${getDate(2)}`]: { marked: true },
}

export const checkAvailability = (dateString: string): BusyDataType => {
  const busySlots = busyData.find((busy) => busy.hasOwnProperty(dateString))
  return busySlots === undefined ? DEFAULT_BUSY : busySlots[dateString]
}

export const updateBusyData = (data, dateString: string) =>{
  // Check if the array is empty
  if (data.length === 0) {
    data.push({ [dateString]: [] });
  }

  // Access the first object in the array
  const busyData = data[0];

  // Check if the specified date already exists as a key
  if (busyData.hasOwnProperty(dateString)) {
    // Push the data into the existing array
    busyData[dateString].push(data);
  } else {
    // Create a new key with the specified date and initialize it with an array containing the data
    busyData[dateString] = [data];
  }

  console.log(busyData)

}