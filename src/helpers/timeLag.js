export const timeLag = timestamp => {
  const now = new Date().getTime()
  const date = timestamp.toDate().getTime()

  const df = Math.abs(now - date)

  const dm = df / 1000 / 60
  const dh = df / 1000 / 60 / 60
  const dD = df / 1000 / 60 / 60 / 24

  if (dm < 1) {
    return `now`
  }

  if (dh < 1) {
    return `${Math.round(dm)}m`
  }

  if (dD < 1) {
    return `${Math.round(dh)}h`
  }

  const h = date.getHours()
  const D = date.getDate()
  const M = date.getMonth() + 1
  const Y = date.getFullYear()

  return `${h}h ${D}/${M}/${Y}`
}
