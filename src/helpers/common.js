import moment from 'moment';

const utcDateTimeToLocalDate = datetime => {
    const dateTimeLocal = moment.utc(datetime).local();
    return dateTimeLocal.format('DD.MM.YYYY HH:mm');
}

const isNullOrEmpty = value => value === "" || value === null;

export { utcDateTimeToLocalDate, isNullOrEmpty }