"use client"

import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export function useAsyncStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const raw = await AsyncStorage.getItem(key)
        if (mounted && raw != null) setValue(JSON.parse(raw) as T)
      } catch {
        // ignore
      } finally {
        if (mounted) setLoaded(true)
      }
    })()
    return () => {
      mounted = false
    }
  }, [key])

  useEffect(() => {
    if (!loaded) return
    ;(async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
      } catch {
        // ignore
      }
    })()
  }, [key, value, loaded])

  return [value, setValue, loaded] as const
}
