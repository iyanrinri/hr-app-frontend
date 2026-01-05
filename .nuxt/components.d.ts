
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const AttendanceHistory: typeof import("../components/attendance/AttendanceHistory.vue").default
export const AttendanceDigitalClock: typeof import("../components/attendance/DigitalClock.vue").default
export const AttendanceEmployeeSelector: typeof import("../components/attendance/EmployeeSelector.vue").default
export const EmployeesEmployeeSalaryAdjustmentHistory: typeof import("../components/employees/EmployeeSalaryAdjustmentHistory.vue").default
export const EmployeesHierarchyManager: typeof import("../components/employees/HierarchyManager.vue").default
export const EmployeesNodeCard: typeof import("../components/employees/NodeCard.vue").default
export const EmployeesOrgChart: typeof import("../components/employees/OrgChart.vue").default
export const EmployeesSubordinateManager: typeof import("../components/employees/SubordinateManager.vue").default
export const LayoutSidebar: typeof import("../components/layout/Sidebar.vue").default
export const LayoutTopBar: typeof import("../components/layout/TopBar.vue").default
export const LeavesAssignBalanceModal: typeof import("../components/leaves/AssignBalanceModal.vue").default
export const LeavesLeaveRequestForm: typeof import("../components/leaves/LeaveRequestForm.vue").default
export const LeavesLeaveTypeModal: typeof import("../components/leaves/LeaveTypeModal.vue").default
export const NotificationsNotificationPermissionButton: typeof import("../components/notifications/NotificationPermissionButton.vue").default
export const OvertimeRequestForm: typeof import("../components/overtime/OvertimeRequestForm.vue").default
export const OvertimeStatusBadge: typeof import("../components/overtime/OvertimeStatusBadge.vue").default
export const PayrollBulkGenerateModal: typeof import("../components/payroll/BulkGenerateModal.vue").default
export const PayrollBulkGenerateResultModal: typeof import("../components/payroll/BulkGenerateResultModal.vue").default
export const PayrollCreatePayrollForm: typeof import("../components/payroll/CreatePayrollForm.vue").default
export const PayrollStats: typeof import("../components/payroll/PayrollStats.vue").default
export const PayrollStatusBadge: typeof import("../components/payroll/PayrollStatusBadge.vue").default
export const PayrollTable: typeof import("../components/payroll/PayrollTable.vue").default
export const PayslipsPayslipDetail: typeof import("../components/payslips/PayslipDetail.vue").default
export const PayslipsPayslipHistoryTable: typeof import("../components/payslips/PayslipHistoryTable.vue").default
export const ProfileInfoItem: typeof import("../components/profile/InfoItem.vue").default
export const ProfileForm: typeof import("../components/profile/ProfileForm.vue").default
export const ProfilePictureUpload: typeof import("../components/profile/ProfilePictureUpload.vue").default
export const ProfileView: typeof import("../components/profile/ProfileView.vue").default
export const SettingsAttendanceMap: typeof import("../components/settings/AttendanceMap.vue").default
export const SettingsSettingItem: typeof import("../components/settings/SettingItem.vue").default
export const SettingsTabContent: typeof import("../components/settings/SettingsTabContent.vue").default
export const TablesEmployeeTable: typeof import("../components/tables/EmployeeTable.vue").default
export const UiAlert: typeof import("../components/ui/Alert.vue").default
export const UiAvatar: typeof import("../components/ui/Avatar.vue").default
export const UiBadge: typeof import("../components/ui/Badge.vue").default
export const UiButton: typeof import("../components/ui/Button.vue").default
export const UiCard: typeof import("../components/ui/Card.vue").default
export const UiCardContent: typeof import("../components/ui/CardContent.vue").default
export const UiCardHeader: typeof import("../components/ui/CardHeader.vue").default
export const UiCardTitle: typeof import("../components/ui/CardTitle.vue").default
export const UiDialog: typeof import("../components/ui/Dialog.vue").default
export const UiDropdown: typeof import("../components/ui/Dropdown.vue").default
export const UiInput: typeof import("../components/ui/Input.vue").default
export const UiSelect: typeof import("../components/ui/Select.vue").default
export const UiTextarea: typeof import("../components/ui/Textarea.vue").default
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only").default
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only").default
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page").default
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components").Link
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components").Base
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components").Title
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components").Style
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components").Head
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components").Html
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components").Body
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default
export const LazyAttendanceHistory: LazyComponent<typeof import("../components/attendance/AttendanceHistory.vue").default>
export const LazyAttendanceDigitalClock: LazyComponent<typeof import("../components/attendance/DigitalClock.vue").default>
export const LazyAttendanceEmployeeSelector: LazyComponent<typeof import("../components/attendance/EmployeeSelector.vue").default>
export const LazyEmployeesEmployeeSalaryAdjustmentHistory: LazyComponent<typeof import("../components/employees/EmployeeSalaryAdjustmentHistory.vue").default>
export const LazyEmployeesHierarchyManager: LazyComponent<typeof import("../components/employees/HierarchyManager.vue").default>
export const LazyEmployeesNodeCard: LazyComponent<typeof import("../components/employees/NodeCard.vue").default>
export const LazyEmployeesOrgChart: LazyComponent<typeof import("../components/employees/OrgChart.vue").default>
export const LazyEmployeesSubordinateManager: LazyComponent<typeof import("../components/employees/SubordinateManager.vue").default>
export const LazyLayoutSidebar: LazyComponent<typeof import("../components/layout/Sidebar.vue").default>
export const LazyLayoutTopBar: LazyComponent<typeof import("../components/layout/TopBar.vue").default>
export const LazyLeavesAssignBalanceModal: LazyComponent<typeof import("../components/leaves/AssignBalanceModal.vue").default>
export const LazyLeavesLeaveRequestForm: LazyComponent<typeof import("../components/leaves/LeaveRequestForm.vue").default>
export const LazyLeavesLeaveTypeModal: LazyComponent<typeof import("../components/leaves/LeaveTypeModal.vue").default>
export const LazyNotificationsNotificationPermissionButton: LazyComponent<typeof import("../components/notifications/NotificationPermissionButton.vue").default>
export const LazyOvertimeRequestForm: LazyComponent<typeof import("../components/overtime/OvertimeRequestForm.vue").default>
export const LazyOvertimeStatusBadge: LazyComponent<typeof import("../components/overtime/OvertimeStatusBadge.vue").default>
export const LazyPayrollBulkGenerateModal: LazyComponent<typeof import("../components/payroll/BulkGenerateModal.vue").default>
export const LazyPayrollBulkGenerateResultModal: LazyComponent<typeof import("../components/payroll/BulkGenerateResultModal.vue").default>
export const LazyPayrollCreatePayrollForm: LazyComponent<typeof import("../components/payroll/CreatePayrollForm.vue").default>
export const LazyPayrollStats: LazyComponent<typeof import("../components/payroll/PayrollStats.vue").default>
export const LazyPayrollStatusBadge: LazyComponent<typeof import("../components/payroll/PayrollStatusBadge.vue").default>
export const LazyPayrollTable: LazyComponent<typeof import("../components/payroll/PayrollTable.vue").default>
export const LazyPayslipsPayslipDetail: LazyComponent<typeof import("../components/payslips/PayslipDetail.vue").default>
export const LazyPayslipsPayslipHistoryTable: LazyComponent<typeof import("../components/payslips/PayslipHistoryTable.vue").default>
export const LazyProfileInfoItem: LazyComponent<typeof import("../components/profile/InfoItem.vue").default>
export const LazyProfileForm: LazyComponent<typeof import("../components/profile/ProfileForm.vue").default>
export const LazyProfilePictureUpload: LazyComponent<typeof import("../components/profile/ProfilePictureUpload.vue").default>
export const LazyProfileView: LazyComponent<typeof import("../components/profile/ProfileView.vue").default>
export const LazySettingsAttendanceMap: LazyComponent<typeof import("../components/settings/AttendanceMap.vue").default>
export const LazySettingsSettingItem: LazyComponent<typeof import("../components/settings/SettingItem.vue").default>
export const LazySettingsTabContent: LazyComponent<typeof import("../components/settings/SettingsTabContent.vue").default>
export const LazyTablesEmployeeTable: LazyComponent<typeof import("../components/tables/EmployeeTable.vue").default>
export const LazyUiAlert: LazyComponent<typeof import("../components/ui/Alert.vue").default>
export const LazyUiAvatar: LazyComponent<typeof import("../components/ui/Avatar.vue").default>
export const LazyUiBadge: LazyComponent<typeof import("../components/ui/Badge.vue").default>
export const LazyUiButton: LazyComponent<typeof import("../components/ui/Button.vue").default>
export const LazyUiCard: LazyComponent<typeof import("../components/ui/Card.vue").default>
export const LazyUiCardContent: LazyComponent<typeof import("../components/ui/CardContent.vue").default>
export const LazyUiCardHeader: LazyComponent<typeof import("../components/ui/CardHeader.vue").default>
export const LazyUiCardTitle: LazyComponent<typeof import("../components/ui/CardTitle.vue").default>
export const LazyUiDialog: LazyComponent<typeof import("../components/ui/Dialog.vue").default>
export const LazyUiDropdown: LazyComponent<typeof import("../components/ui/Dropdown.vue").default>
export const LazyUiInput: LazyComponent<typeof import("../components/ui/Input.vue").default>
export const LazyUiSelect: LazyComponent<typeof import("../components/ui/Select.vue").default>
export const LazyUiTextarea: LazyComponent<typeof import("../components/ui/Textarea.vue").default>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue").default>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout").default>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only").default>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only").default>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder").default>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link").default>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page").default>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").NoScript>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Link>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Base>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Title>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Meta>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Style>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Head>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Html>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components").Body>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island").default>

export const componentNames: string[]
