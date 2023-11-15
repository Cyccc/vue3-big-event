// element-plus内置dayjs 无需另外装包
import { dayjs } from 'element-plus'
// 日期格式转换
export const formatTime = (time) => dayjs(time).format('YYYY年MM月DD日')
