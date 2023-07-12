import { BusyDataType, updateBusyData } from '../../data/events'
const moment = require('moment')


const convertToFLoat = (numberString: number): number => Math.round(Number(numberString) * 100) / 100

const isEventInBusyData = (event, busyData) => {
  return busyData.some(
    (busyEvent) => busyEvent.start === event.start && busyEvent.end === event.end
  );
};

const isDuplicateObject = (eventsByDate, busyData) =>{
  console.log("duplicate thing")  
} 

export const busyAlgorithm = (eventsByDate, busyData: BusyDataType, todayDate: string) : void => {
  const updatedBusyData = [...busyData]
  for (let event of eventsByDate) {
    // console.log("Event is", event)
    const startDate = moment(event.start)
    const endDate = moment(event.end)

    //Before Event Calculation
    const endBreakTimeBeforeEvent = convertToFLoat(startDate.format('HH.mm'))
    const startBreakTimeBeforeEvent = convertToFLoat(
      endBreakTimeBeforeEvent - 0.15,
    )

    //After Event Calculation
    const startBreakTimeAfterEvent = convertToFLoat(endDate.format('HH.mm'))
    const endBreakTimeAfterEvent = convertToFLoat(startBreakTimeAfterEvent + 0.15)

    //Object Assignment
    const beforeEvent = {
      end: endBreakTimeBeforeEvent,
      start: startBreakTimeBeforeEvent,
    }
    const afterEvent = {
      end: endBreakTimeAfterEvent,
      start: startBreakTimeAfterEvent,
    }
    // console.log(beforeEvent, afterEvent)
    if (!isEventInBusyData(beforeEvent, updatedBusyData)) {
      updatedBusyData.push(beforeEvent);
    }
    if (!isEventInBusyData(afterEvent, updatedBusyData)) {
      updatedBusyData.push(afterEvent);
    }
 }

  // return updatedBusyData
  updateBusyData(updatedBusyData, todayDate)

}

