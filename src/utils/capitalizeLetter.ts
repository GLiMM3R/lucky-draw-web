export function capitalizeLetter(str?: string) {
  if (str) {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string.')
    }

    return str.replace(/\b\w/g, function (match) {
      return match.toUpperCase()
    })
  }
}
