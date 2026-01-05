
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

interface _GlobalComponents {
  'AttendanceHistory': typeof import("../../components/attendance/AttendanceHistory.vue").default
  'AttendanceDigitalClock': typeof import("../../components/attendance/DigitalClock.vue").default
  'AttendanceEmployeeSelector': typeof import("../../components/attendance/EmployeeSelector.vue").default
  'EmployeesEmployeeSalaryAdjustmentHistory': typeof import("../../components/employees/EmployeeSalaryAdjustmentHistory.vue").default
  'EmployeesHierarchyManager': typeof import("../../components/employees/HierarchyManager.vue").default
  'EmployeesNodeCard': typeof import("../../components/employees/NodeCard.vue").default
  'EmployeesOrgChart': typeof import("../../components/employees/OrgChart.vue").default
  'EmployeesSubordinateManager': typeof import("../../components/employees/SubordinateManager.vue").default
  'LayoutSidebar': typeof import("../../components/layout/Sidebar.vue").default
  'LayoutTopBar': typeof import("../../components/layout/TopBar.vue").default
  'LeavesAssignBalanceModal': typeof import("../../components/leaves/AssignBalanceModal.vue").default
  'LeavesLeaveRequestForm': typeof import("../../components/leaves/LeaveRequestForm.vue").default
  'LeavesLeaveTypeModal': typeof import("../../components/leaves/LeaveTypeModal.vue").default
  'NotificationsNotificationPermissionButton': typeof import("../../components/notifications/NotificationPermissionButton.vue").default
  'OvertimeRequestForm': typeof import("../../components/overtime/OvertimeRequestForm.vue").default
  'OvertimeStatusBadge': typeof import("../../components/overtime/OvertimeStatusBadge.vue").default
  'PayrollBulkGenerateModal': typeof import("../../components/payroll/BulkGenerateModal.vue").default
  'PayrollBulkGenerateResultModal': typeof import("../../components/payroll/BulkGenerateResultModal.vue").default
  'PayrollCreatePayrollForm': typeof import("../../components/payroll/CreatePayrollForm.vue").default
  'PayrollStats': typeof import("../../components/payroll/PayrollStats.vue").default
  'PayrollStatusBadge': typeof import("../../components/payroll/PayrollStatusBadge.vue").default
  'PayrollTable': typeof import("../../components/payroll/PayrollTable.vue").default
  'PayslipsPayslipDetail': typeof import("../../components/payslips/PayslipDetail.vue").default
  'PayslipsPayslipHistoryTable': typeof import("../../components/payslips/PayslipHistoryTable.vue").default
  'ProfileInfoItem': typeof import("../../components/profile/InfoItem.vue").default
  'ProfileForm': typeof import("../../components/profile/ProfileForm.vue").default
  'ProfilePictureUpload': typeof import("../../components/profile/ProfilePictureUpload.vue").default
  'ProfileView': typeof import("../../components/profile/ProfileView.vue").default
  'SettingsAttendanceMap': typeof import("../../components/settings/AttendanceMap.vue").default
  'SettingsSettingItem': typeof import("../../components/settings/SettingItem.vue").default
  'SettingsTabContent': typeof import("../../components/settings/SettingsTabContent.vue").default
  'TablesEmployeeTable': typeof import("../../components/tables/EmployeeTable.vue").default
  'UiAlert': typeof import("../../components/ui/Alert.vue").default
  'UiAvatar': typeof import("../../components/ui/Avatar.vue").default
  'UiBadge': typeof import("../../components/ui/Badge.vue").default
  'UiButton': typeof import("../../components/ui/Button.vue").default
  'UiCard': typeof import("../../components/ui/Card.vue").default
  'UiCardContent': typeof import("../../components/ui/CardContent.vue").default
  'UiCardHeader': typeof import("../../components/ui/CardHeader.vue").default
  'UiCardTitle': typeof import("../../components/ui/CardTitle.vue").default
  'UiDialog': typeof import("../../components/ui/Dialog.vue").default
  'UiDropdown': typeof import("../../components/ui/Dropdown.vue").default
  'UiInput': typeof import("../../components/ui/Input.vue").default
  'UiSelect': typeof import("../../components/ui/Select.vue").default
  'UiTextarea': typeof import("../../components/ui/Textarea.vue").default
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only").default
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default
  'LazyAttendanceHistory': LazyComponent<typeof import("../../components/attendance/AttendanceHistory.vue").default>
  'LazyAttendanceDigitalClock': LazyComponent<typeof import("../../components/attendance/DigitalClock.vue").default>
  'LazyAttendanceEmployeeSelector': LazyComponent<typeof import("../../components/attendance/EmployeeSelector.vue").default>
  'LazyEmployeesEmployeeSalaryAdjustmentHistory': LazyComponent<typeof import("../../components/employees/EmployeeSalaryAdjustmentHistory.vue").default>
  'LazyEmployeesHierarchyManager': LazyComponent<typeof import("../../components/employees/HierarchyManager.vue").default>
  'LazyEmployeesNodeCard': LazyComponent<typeof import("../../components/employees/NodeCard.vue").default>
  'LazyEmployeesOrgChart': LazyComponent<typeof import("../../components/employees/OrgChart.vue").default>
  'LazyEmployeesSubordinateManager': LazyComponent<typeof import("../../components/employees/SubordinateManager.vue").default>
  'LazyLayoutSidebar': LazyComponent<typeof import("../../components/layout/Sidebar.vue").default>
  'LazyLayoutTopBar': LazyComponent<typeof import("../../components/layout/TopBar.vue").default>
  'LazyLeavesAssignBalanceModal': LazyComponent<typeof import("../../components/leaves/AssignBalanceModal.vue").default>
  'LazyLeavesLeaveRequestForm': LazyComponent<typeof import("../../components/leaves/LeaveRequestForm.vue").default>
  'LazyLeavesLeaveTypeModal': LazyComponent<typeof import("../../components/leaves/LeaveTypeModal.vue").default>
  'LazyNotificationsNotificationPermissionButton': LazyComponent<typeof import("../../components/notifications/NotificationPermissionButton.vue").default>
  'LazyOvertimeRequestForm': LazyComponent<typeof import("../../components/overtime/OvertimeRequestForm.vue").default>
  'LazyOvertimeStatusBadge': LazyComponent<typeof import("../../components/overtime/OvertimeStatusBadge.vue").default>
  'LazyPayrollBulkGenerateModal': LazyComponent<typeof import("../../components/payroll/BulkGenerateModal.vue").default>
  'LazyPayrollBulkGenerateResultModal': LazyComponent<typeof import("../../components/payroll/BulkGenerateResultModal.vue").default>
  'LazyPayrollCreatePayrollForm': LazyComponent<typeof import("../../components/payroll/CreatePayrollForm.vue").default>
  'LazyPayrollStats': LazyComponent<typeof import("../../components/payroll/PayrollStats.vue").default>
  'LazyPayrollStatusBadge': LazyComponent<typeof import("../../components/payroll/PayrollStatusBadge.vue").default>
  'LazyPayrollTable': LazyComponent<typeof import("../../components/payroll/PayrollTable.vue").default>
  'LazyPayslipsPayslipDetail': LazyComponent<typeof import("../../components/payslips/PayslipDetail.vue").default>
  'LazyPayslipsPayslipHistoryTable': LazyComponent<typeof import("../../components/payslips/PayslipHistoryTable.vue").default>
  'LazyProfileInfoItem': LazyComponent<typeof import("../../components/profile/InfoItem.vue").default>
  'LazyProfileForm': LazyComponent<typeof import("../../components/profile/ProfileForm.vue").default>
  'LazyProfilePictureUpload': LazyComponent<typeof import("../../components/profile/ProfilePictureUpload.vue").default>
  'LazyProfileView': LazyComponent<typeof import("../../components/profile/ProfileView.vue").default>
  'LazySettingsAttendanceMap': LazyComponent<typeof import("../../components/settings/AttendanceMap.vue").default>
  'LazySettingsSettingItem': LazyComponent<typeof import("../../components/settings/SettingItem.vue").default>
  'LazySettingsTabContent': LazyComponent<typeof import("../../components/settings/SettingsTabContent.vue").default>
  'LazyTablesEmployeeTable': LazyComponent<typeof import("../../components/tables/EmployeeTable.vue").default>
  'LazyUiAlert': LazyComponent<typeof import("../../components/ui/Alert.vue").default>
  'LazyUiAvatar': LazyComponent<typeof import("../../components/ui/Avatar.vue").default>
  'LazyUiBadge': LazyComponent<typeof import("../../components/ui/Badge.vue").default>
  'LazyUiButton': LazyComponent<typeof import("../../components/ui/Button.vue").default>
  'LazyUiCard': LazyComponent<typeof import("../../components/ui/Card.vue").default>
  'LazyUiCardContent': LazyComponent<typeof import("../../components/ui/CardContent.vue").default>
  'LazyUiCardHeader': LazyComponent<typeof import("../../components/ui/CardHeader.vue").default>
  'LazyUiCardTitle': LazyComponent<typeof import("../../components/ui/CardTitle.vue").default>
  'LazyUiDialog': LazyComponent<typeof import("../../components/ui/Dialog.vue").default>
  'LazyUiDropdown': LazyComponent<typeof import("../../components/ui/Dropdown.vue").default>
  'LazyUiInput': LazyComponent<typeof import("../../components/ui/Input.vue").default>
  'LazyUiSelect': LazyComponent<typeof import("../../components/ui/Select.vue").default>
  'LazyUiTextarea': LazyComponent<typeof import("../../components/ui/Textarea.vue").default>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue").default>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout").default>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue").default>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only").default>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only").default>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder").default>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link").default>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator").default>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue").default>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer").default>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtImg>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs").NuxtPicture>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page").default>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").NoScript>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Link>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Base>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Title>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Meta>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Style>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Head>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Html>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components").Body>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island").default>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
