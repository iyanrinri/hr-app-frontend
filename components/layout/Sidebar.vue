<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import { useAuth } from '@/composables/useAuth'
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Settings, 
  LogOut, 
  Bell, 
  Calendar, 
  CalendarClock, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckSquare, 
  Timer, 
  Hourglass, 
  BarChart3, 
  Banknote, 
  Wallet 
} from 'lucide-vue-next'

const route = useRoute()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const { logout } = useAuth()
const isCollapsed = ref(false)

const user = computed(() => authStore.user)
const unreadCount = computed(() => notificationStore.unreadCount)
const tenantSlug = route.params.tenant_slug as string

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SUPER', 'ADMIN', 'HR', 'EMPLOYEE'] },
  { name: 'My Attendance', href: '/dashboard/attendance', icon: Clock, roles: ['SUPER', 'ADMIN', 'HR', 'EMPLOYEE'] },
  { name: "Today's Attendance", href: '/dashboard/attendance/today', icon: Bell, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Employees', href: '/dashboard/employees', icon: Users, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Attendance Periods', href: '/dashboard/attendance-periods', icon: Calendar, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, roles: ['SUPER', 'ADMIN'] },
  { name: 'Leave Config', href: '/dashboard/leaves/periods', icon: CalendarClock, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'My Leaves', href: '/dashboard/leaves/my', icon: FileText }, // All roles
  { name: 'Approvals', href: '/dashboard/leaves/approvals', icon: CheckSquare, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  { name: 'Leave Admin', href: '/dashboard/leaves/admin', icon: BarChart3, roles: ['SUPER', 'ADMIN', 'HR'] },
  // Overtime
  { name: 'My Overtime', href: '/dashboard/overtime/my', icon: Timer }, // All roles
  { name: 'Pending Overtime', href: '/dashboard/overtime/pending', icon: Hourglass, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  { name: 'Approval History', href: '/dashboard/overtime/approvals', icon: CheckSquare, roles: ['SUPER', 'ADMIN', 'HR', 'MANAGER'] },
  { name: 'Overtime Admin', href: '/dashboard/overtime/admin', icon: BarChart3, roles: ['SUPER', 'ADMIN', 'HR'] },
  // Payroll
  { name: 'Payroll', href: '/dashboard/payroll', icon: Banknote, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'Payslips', href: '/dashboard/payslips', icon: FileText, roles: ['SUPER', 'ADMIN', 'HR'] },
  { name: 'My Salary', href: '/dashboard/payroll/my', icon: Wallet }, // All roles
  { name: 'My Payslips', href: '/dashboard/payslips/my', icon: FileText }, // All roles
]

const filteredNavigation = computed(() => {
  return navigation.filter((item) => {
    if (item.name === 'Approvals' && user.value?.hasSubordinates) {
      return true
    }
    return !item.roles || (user.value?.role && item.roles.includes(user.value.role))
  }).map(item => ({
    ...item,
    href: tenantSlug ? `/${tenantSlug}${item.href}` : item.href
  }))
})

const handleLogout = () => {
  logout()
}
</script>

<template>
  <div 
    class="flex flex-col bg-white border-r border-gray-200 min-h-screen transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <div class="flex items-center justify-between h-16 border-b border-gray-200 px-4">
      <span v-if="!isCollapsed" class="text-xl font-bold text-brand-navy">HR Portal</span>
      <button
        @click="isCollapsed = !isCollapsed"
        class="p-2 rounded-md hover:bg-gray-100 transition-colors ml-auto"
        :title="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'"
      >
        <ChevronRight v-if="isCollapsed" class="w-5 h-5 text-gray-600" />
        <ChevronLeft v-else class="w-5 h-5 text-gray-600" />
      </button>
    </div>
    
    <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="item in filteredNavigation"
        :key="item.name"
        :to="item.href"
        class="flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors relative"
        :class="[
          route.path === item.href
            ? 'bg-brand-light text-brand-navy'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          isCollapsed && 'justify-center'
        ]"
        :title="isCollapsed ? item.name : ''"
      >
        <component :is="item.icon" class="w-5 h-5" :class="!isCollapsed && 'mr-3'" />
        <span v-if="!isCollapsed">{{ item.name }}</span>
        
        <span 
            v-if="item.name === 'Today\'s Attendance' && unreadCount > 0" 
            class="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
        >
            {{ unreadCount > 9 ? '9+' : unreadCount }}
        </span>
      </NuxtLink>
    </nav>
    
    <div class="p-4 border-t border-gray-200 space-y-2">
      <NuxtLink 
        v-if="!isCollapsed && user" 
        :to="tenantSlug ? `/${tenantSlug}/dashboard/profile` : '/dashboard/profile'" 
        class="flex items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-2"
      >
        <div class="h-8 w-8 rounded-full bg-brand-navy flex items-center justify-center text-white shrink-0">
          <span class="text-xs font-bold">{{ (user.name || 'U').charAt(0).toUpperCase() }}</span>
        </div>
        <div class="ml-3 overflow-hidden">
          <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ user.role }}</p>
        </div>
      </NuxtLink>
      
      <button
        @click="handleLogout"
        class="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
        :class="isCollapsed && 'justify-center'"
        :title="isCollapsed ? 'Logout' : ''"
      >
        <LogOut class="w-5 h-5" :class="!isCollapsed && 'mr-3'" />
        <span v-if="!isCollapsed">Logout</span>
      </button>
    </div>
  </div>
</template>
