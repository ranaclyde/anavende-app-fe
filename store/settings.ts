import { create } from 'zustand'

import type { Setting } from '@/interfaces/settings'

type State = {
  settings: Setting | null
}

type Actions = {
  setSettings: (settings: Setting) => void
}

const initState: State = {
  settings: null,
}

const useSettingsStore = create<State & Actions>((set) => ({
  ...initState,
  setSettings: (settings: Setting) => {
    set({ settings })
  },
}))

export default useSettingsStore
