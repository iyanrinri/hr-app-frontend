import { io, type Socket } from 'socket.io-client'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'
// We might want to use a toast library compatible with Nuxt
// For now we can use simple console logs or implement a rudimentary toast
// Or integrate a library later. The original used react-hot-toast.

export const useWebSocket = () => {
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()
    const runtimeConfig = useRuntimeConfig()
    
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

        console.log('🔌 Initializing WebSocket for role:', user.role)

        const socketUrl = runtimeConfig.public.socketUrl as string
        
        socket = io(`${socketUrl}/attendance`, {
            auth: {
                token: `Bearer ${token}`
            },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        })

        socket.on('connect_error', (error) => {
             console.error('❌ [WebSocket] Connection Error:', error)
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
             
             const { presentEmployees = [], lateEmployees = [] } = data
             
             if (presentEmployees.length > 0) {
                 const latestEmployee = presentEmployees[0]
                 const isLate = lateEmployees.some((emp: { id: string }) => emp.id === latestEmployee.id)
                 
                 notificationStore.addNotification({
                     type: 'CLOCK_IN',
                     employeeId: latestEmployee.id,
                     employeeName: `${latestEmployee.firstName} ${latestEmployee.lastName}`,
                     timestamp: latestEmployee.checkIn || new Date().toISOString(),
                     message: isLate 
                        ? `${latestEmployee.firstName} ${latestEmployee.lastName} clocked in (Late)` 
                        : `${latestEmployee.firstName} ${latestEmployee.lastName} clocked in`
                 })
                 
                 // TODO: Show Toast
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
