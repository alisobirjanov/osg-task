export const numDays = (y: number, m: number) => new Date(y, m, 0).getDate()

export const getPrevMonth = (y: number, m: number) => {
  const date = new Date(y, m)
  date.setMonth(date.getMonth() - 1)
  return date
}

export const getNextMonth = (y: number, m: number) => {
  const date = new Date(y, m)
  date.setMonth(date.getMonth() + 1)
  return date
}

export const getDay = (y: number, m: number, d = 1) => new Date(y, m, d).getDay()