import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh')

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default dayjs
