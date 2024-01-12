// import moment from "moment";
import moment from 'moment-business-days'
import { utils, writeFileXLSX } from 'xlsx';

export const updateAll = (obj, reqObj) => {
    try {
        Object.keys(reqObj).map((key) => {
            obj[key] = reqObj[key]
        })
        return obj
    } catch (error) {
        throw error
    }
}

export const getDaysBetweenDates = function (startDate, endDate) {
    let dates = [];

    let currDate = moment(startDate).startOf('day').add(-1, 'days');
    let lastDate = moment(endDate).startOf('day').add(1, 'days');

    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        //console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }
    return dates;
}

export const getCurrentLocation = () => {
    let response = {
        lat: '',
        long: '',
        error: ''
    }
    try {
        navigator.geolocation.getCurrentPosition((position) => {
            response.lat = position.coords.latitude.toFixed(2)
            response.long = position.coords.longitude.toFixed(2)
        })
        // console.log(response)
        return response
    }
    catch (error) {
        response.error = error
        return response
    }
}


export const handleDownloadExcel = (dataSource, sheetName, fileName) => {
    const ws = utils.json_to_sheet(dataSource);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, sheetName);
    writeFileXLSX(wb, `${fileName}.xlsx`);
};

export const toTitleCase = (str) => {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

export const getWorkTenure = (doj) => {
    let today = moment()
    let joining_date = moment(doj)

    let dayDiff = today.diff(joining_date, 'days');
    let monthDiff = today.diff(joining_date, 'months');
    let yearDiff = today.diff(joining_date, 'years');

    let work_tenure = (yearDiff + monthDiff / 12 + dayDiff / 365).toFixed(1)
    return work_tenure
}

export const remainingProbationPeriod = (doj, probationMonths) => {
    let joiningDate = moment(doj)
    let probationEndDate = moment(doj).add(probationMonths, 'months')
    let today = moment()

    if (today.isSameOrAfter(probationEndDate))
        return "0 Days"
    else {
        // console.log(today.startOf('month').format('YYYY-MM-DD'))
        let monthStart = moment(today.startOf('month'))
        let dayDiff = today.diff(monthStart, 'days')

        let monthDiff = today.diff(joiningDate, 'months')

        console.log(dayDiff, monthDiff)
        return `${monthDiff} Months, ${dayDiff} Days`
    }
}


export const isWeekday = (date) => {
    const day = moment(date).day();
    return day !== 0 && day !== 6;
};

export const isWorkingDayForUser = (date, staff_type) => {
    // Need to setup holidays here
    moment.updateLocale('us', {
        holidays: [],
        holidayFormat: 'YYYY-MM-DD'
    });

    if (staff_type === 'office') {
        moment.updateLocale('us', {
            workingWeekdays: [1, 2, 3, 4, 5]
        });
    } else {
        moment.updateLocale('us', {
            workingWeekdays: [1, 2, 3, 4, 5, 6]
        });
    }

    date = moment(date)
    return date.isBusinessDay()
}