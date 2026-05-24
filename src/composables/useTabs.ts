import { ref, computed } from 'vue'

export interface TabItem {
  path: string
  title: string
  icon?: string
  closable: boolean
  url?: string
}

const MAX_TABS = 15

const tabs = ref<TabItem[]>([
  { path: '/dashboard', title: 'Dashboard', icon: 'Odometer', closable: false }
])

const activeTab = ref('/dashboard')

export function useTabs() {
  const canAddTab = computed(() => tabs.value.length < MAX_TABS)

  const addTab = (path: string, title: string, icon?: string, url?: string) => {
    const exists = tabs.value.find(t => t.path === path)
    if (exists) {
      activeTab.value = path
      return
    }

    if (!canAddTab.value) {
      return
    }

    const closable = path !== '/dashboard'
    tabs.value.push({ path, title, icon, closable, url })
    activeTab.value = path
  }

  const removeTab = (path: string) => {
    const tab = tabs.value.find(t => t.path === path)
    if (tab && !tab.closable) return

    const index = tabs.value.findIndex(t => t.path === path)
    if (index > -1) {
      tabs.value.splice(index, 1)
      if (activeTab.value === path) {
        const newActive = tabs.value[tabs.value.length - 1]
        activeTab.value = newActive?.path || '/dashboard'
      }
    }
  }

  const closeAllTabs = () => {
    tabs.value = tabs.value.filter(t => !t.closable)
    if (activeTab.value !== '/dashboard') {
      activeTab.value = '/dashboard'
    }
  }

  const setActiveTab = (path: string) => {
    activeTab.value = path
  }

  return {
    tabs,
    activeTab,
    canAddTab,
    addTab,
    removeTab,
    closeAllTabs,
    setActiveTab
  }
}