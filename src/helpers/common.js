import moment from "moment";

const utcDateTimeToLocalDate = (datetime, time = false) => {
    const dateTimeLocal = moment.utc(datetime).local();
    let format = 'DD.MM.YYYY';

    if (time) format += ' HH:mm';

    return dateTimeLocal.format(format);
}

const isNullOrEmpty = value => value == "" || value == null;

export { utcDateTimeToLocalDate, isNullOrEmpty }