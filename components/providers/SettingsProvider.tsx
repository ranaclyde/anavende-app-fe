'use client'
import { useEffect } from 'react'
import useSettingsStore from '@/store/settings'
import type { Setting } from '@/interfaces/settings'

interface SettingsProviderProps {
  children: React.ReactNode
  settings?: Setting
}

export default function SettingsProvider({
  children,
  settings,
}: SettingsProviderProps) {
  const { setSettings } = useSettingsStore()

  useEffect(() => {
    if (settings) {
      setSettings(settings)
    }
  }, [settings, setSettings])

  return <>{children}</>
}
