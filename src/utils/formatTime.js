export const timeStart = (time, tag) => {
  if (tag) {
    if (!time) {
      time = new Date(new Date().setDate(new Date().getDate() - new Date().getDate() + 1)).toISOString()
    }
  } else {
    if (!time) {
      time = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toISOString()
    }
  }
  // if (!time) {
  //   time = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toISOString()
  // }

  return new Date(time)
  .toLocaleDateString()
  .replace(/\//g, '-')
}

export const timeEnd = (time, tag) => {
  if (tag) {
    if (!time) {
      const temp = new Date(new Date().setDate(new Date().getDate() - new Date().getDate() + 1))
      temp.setMilliseconds(0)
      temp.setSeconds(0)
      temp.setMinutes(0)
      temp.setHours(0)
      time = temp.toISOString()
    }
    return new Date(
        new Date(time).setMonth(new Date(time).getMonth() + 1) - 1
      )
      .toLocaleDateString()
      .replace(/\//g, '-')
  } else {
    if (!time) {
      time = new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 1)).toISOString()
    }
    return new Date(
        new Date(time).getTime() + 6048e5 - 1
    )
    .toLocaleDateString()
    .replace(/\//g, '-')
  }
}
