import moment from "moment"

export const displayTimeDiff = (time: string) => {
    if (moment().diff(moment(time), 'hours') < 24) {
        return moment().diff(moment(time), 'hours') + ' 시간전'
    } else if (moment().diff(moment(time), 'hours') < 48) {
        return '1일전'

    } else {
        return moment(time).format('YYYY.MM.DD')
    }
}