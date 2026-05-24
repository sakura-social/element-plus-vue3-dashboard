import { ref } from 'vue'

export type SidebarMode = 'sidebar' | 'sidebar-level3'

const sidebarMode = ref<SidebarMode>('sidebar')

export function useSidebarMode() {
  return {
    sidebarMode
  }
}
