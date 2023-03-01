import { parse } from 'date-fns';

export function getDateFnsFromDate(jsDate){
    return new Date(jsDate);
};

export function getDateFnsFromString(dateString){
    let localDate = new Date(dateString);
    return parse(localDate);
};

export function formatEventDates(event){
    let localEvent = {...event,
        ['startDate']: getDateFnsFromString(event.startDate),
        ['endDate']: getDateFnsFromString(event.endDate),
        ['alarm']: getDateFnsFromString(event.alarm),
    };

    return localEvent;
};

export function formatEventDateArray(events){
    let newArray = [];

    for (let e of events) {
        let localItem = formatEventDates(e);
        newArray.push(localItem);
    }

    return newArray;
}