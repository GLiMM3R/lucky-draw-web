export function replaceNumber(num: Number) {
  if (typeof num !== 'number') {
    throw new Error('Input must be a number.')
  }

  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }

  return num.toString()
}
