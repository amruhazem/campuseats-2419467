import { useEffect, useState } from 'react'

// Like useState, but the value is saved in localStorage (survives a refresh).
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch (err) {
      console.error(`Error reading localStorage key "${key}":`, err)
      return initialValue             // broken saved data: start fresh
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(`Error setting localStorage key "${key}":`, err)
    }
  }, [key, value])

  return [value, setValue]
}