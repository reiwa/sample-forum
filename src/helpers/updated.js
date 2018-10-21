export const updated = timestamp => {
  const now = new Date().getTime()
  const date = timestamp.toDate().getTime()

  const df = Math.abs(now - date)

  const dm = df / 1000 / 60
  const dh = df / 1000 / 60 / 60
  const dD = df / 1000 / 60 / 60 / 24

  if (dm < 1) {
    return `Updated now`
  }

  if (dh < 1) {
    return `Updated ${Math.round(dm)}m ago`
  }

  if (dD < 1) {
    return `Updated ${Math.round(dh)}h ago`
  }

  const h = date.getHours()
  const D = date.getDate()
  const M = date.getMonth() + 1
  const Y = date.getFullYear()

  return `Updated ${h}h ${D}/${M}/${Y} ago`
}
