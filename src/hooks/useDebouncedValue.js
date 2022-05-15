import { useEffect, useState } from 'react'

const useDebouncedValue = (value, timeout) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, timeout)

    return () => clearTimeout(timer)
  }, [value])

  return debouncedValue
}

export default useDebouncedValue
