export default function useRandomGenerator() {
  const generateRandomCustomerNumber = () => {
    const randomValue = Math.floor(Math.random() * 4)
    const allowedValues = [2, 3, 5, 7]
    return allowedValues[randomValue]
  }

  const generateRandomPhoneNumber = () => {
    const randomValue = Math.floor(Math.random() * 4)
    const allowedValues = [2, 5, 7, 9]
    return allowedValues[randomValue]
  }

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10)
  }

  return { generateRandomCustomerNumber, generateRandomPhoneNumber, generateRandomNumber }
}
