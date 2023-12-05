import moment from 'moment'
export const formatDateTime = (value: any) => {
  if (value) {
    return moment(value).format('YYYY.MM.DD')
  }
}
