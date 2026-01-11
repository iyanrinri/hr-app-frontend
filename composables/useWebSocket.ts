import { io, type Socket } from 'socket.io-client'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
import type { TodayAttendanceDashboard } from '@/types/attendance'
import { useToast } from '@/composables/useToast'

export const useWebSocket = () => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()
    const runtimeConfig = useRuntimeConfig()
    const toast = useToast()
    
    let socket: Socket | null = null

    // We only want to run this on client side
    const connect = () => {
        if (!import.meta.client) return

        const token = authStore.token
        const user = authStore.user

        if (!token) return

        // Only connect for allowed roles
        const allowedRoles = ['SUPER', 'ADMIN', 'HR']
        if (!user || !allowedRoles.includes(user.role)) {
            console.log('ℹ️ WebSocket disabled for role:', user?.role || 'unknown')
            return
        }

        // Get tenantSlug from route
        const route = useRoute()
        const tenantSlug = route.params.tenant_slug as string
        
        if (!tenantSlug) {
             // Try to extract from path if params missing (e.g. middleware issue?)
             // But usually useRoute is reliable in setup
             console.warn('⚠️ No tenantSlug found for WebSocket')
             // return; // Don't return, maybe we are on a page where slug is available differently? 
             // Actually if we are in dashboard/[tenant_slug], it should be there.
        }
        
        if (socket?.connected) return

        console.log('🔌 Initializing WebSocket connection to /attendance namespace...')

        // Force connection to relative path '/attendance' 
        // This ensures:
        // 1. It uses the current origin (Request URL will be domain/socket.io) -> Satisfies "socket ke origin"
        // 2. It goes through the Nuxt proxy defined in nuxt.config.ts
        // 3. It connects to the correct namespace '/attendance' (Critical for events)
        socket = io('/attendance', {
            path: '/socket.io',
            auth: {
                token: `Bearer ${token}`
            },
            transports: ['websocket', 'polling'], 
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        })

        socket.on('connect_error', (error) => {
             // Suppress annoying transport errors in console if it's just negotiating
             if (error.message !== 'xhr poll error') {
                console.warn('⚠️ [WebSocket] Connection Issue:', error.message)
             }
             notificationStore.setConnected(false)
        })

        socket.on('connect', () => {
            console.log('✅ Connected to attendance WebSocket')
            notificationStore.setConnected(true)
            
            if (tenantSlug) {
                socket?.emit('join-tenant', { tenantSlug })
                console.log('🏢 Emitting join-tenant for:', tenantSlug)
            }
        })

        socket.on('disconnect', () => {
            console.log('❌ Disconnected from attendance WebSocket')
            notificationStore.setConnected(false)
        })

        socket.on('joined', (data: any) => {
            console.log('✅ Successfully joined tenant room:', data)
        })

        socket.on('attendance.dashboard_update', (data: any) => {
             console.log('🔔 [ATTENDANCE.DASHBOARD-UPDATE]', data)
             notificationStore.incrementDashboardTrigger()

             // Directly update the dashboard data cache for instant UI feedback
             const { data: dashboardData } = useNuxtData<TodayAttendanceDashboard>('attendance-dashboard-today')
             if (dashboardData.value) {
                dashboardData.value = data
                console.log('✅ Dashboard data state updated directly')
             } else {
                 // Initialize if empty (e.g. user landed on other page but socket is active)
                 dashboardData.value = data
             }
             
             const { presentEmployees = [], lateEmployees = [] } = data
             
             if (presentEmployees.length > 0) {
                 const latestEmployee = presentEmployees[0]
                 const isLate = lateEmployees.some((emp: { id: string }) => emp.id === latestEmployee.id)
                 
                 const isClockOut = !!latestEmployee.checkOut
                 const message = isClockOut 
                    ? 'Someone clocked out'
                    : (isLate ? 'Someone clocked in (Late)' : 'Someone clocked in')
                 
                 notificationStore.addNotification({
                     type: isClockOut ? 'CLOCK_OUT' : 'CLOCK_IN',
                     employeeId: latestEmployee.id,
                     employeeName: `${latestEmployee.firstName} ${latestEmployee.lastName}`,
                     timestamp: (isClockOut ? latestEmployee.checkOut : latestEmployee.checkIn) || new Date().toISOString(),
                     message
                 })
                 
                 // Show Toast
                 if (isLate && !isClockOut) {
                    toast.warning(message, 'Late Clock In')
                 } else {
                    toast.success(message, isClockOut ? 'Clock Out' : 'Clock In')
                 }
             } else {
                // If it was just a general update (e.g. someone clocked out, or just period update)
                // We can show a generic toast or none. Original code showed "Dashboard updated"
                toast.info('Attendance Dashboard Updated', 'Real-time Update')
             }
        })

        socket.onAny((eventName, ...args) => {
            console.log('📡 [WEBSOCKET EVENT]', eventName, args)
        })

        notificationStore.setSocket(socket)
    }

    const disconnect = () => {
        if (socket) {
            socket.disconnect()
            socket = null
            notificationStore.setSocket(null)
            notificationStore.setConnected(false)
        }
    }

    return {
        connect,
        disconnect
    }
}
