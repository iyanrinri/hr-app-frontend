<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List as ListIcon, 
  Mail, 
  Briefcase,
  Edit,
  Trash2,
  User
} from 'lucide-vue-next'
import type { Employee } from '@/types/employee'

const route = useRoute()
const tenantSlug = route.params.tenant_slug as string

definePageMeta({
  layout: 'dashboard'
})

// View Mode State
const viewMode = ref<'grid' | 'list'>('grid')

// Filter inputs
const searchInput = ref('')
const statusInput = ref('')

// Applied filters
const searchQuery = ref('')
const statusQuery = ref('')

const { data: response, loading, error, refresh } = useEmployees(1, 50, searchQuery, statusQuery)
const { mutate: deleteEmployee } = useDeleteEmployee()
const { mutate: restoreEmployee } = useRestoreEmployee()

const handleApplyFilters = () => {
  searchQuery.value = searchInput.value
  statusQuery.value = statusInput.value
}

const handleResetFilters = () => {
  searchInput.value = ''
  statusInput.value = ''
  searchQuery.value = ''
  statusQuery.value = ''
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this employee?')) {
    await deleteEmployee(id)
    refresh()
  }
}

const handleRestore = async (id: string) => {
  await restoreEmployee(id)
  refresh()
}

// Helper to determine active status
const isEmployeeActive = (emp: Employee) => !emp.user?.deletedAt

const employees = computed(() => response.value?.data || [])
</script>

<template>
  <div class="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-3xl font-bold text-gray-900 tracking-tight">Employee Directory</h2>
        <p class="text-gray-500 mt-1">Manage your organization's workforce and profiles.</p>
      </div>
      <NuxtLink :to="`/${tenantSlug}/dashboard/employees/create`">
        <UiButton class="shadow-lg shadow-brand-navy/20 h-10 px-6">
          <Plus class="w-4 h-4 mr-2" />
          Add Employee
        </UiButton>
      </NuxtLink>
    </div>

    <!-- Filters & View Toggle -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
      
      <!-- Search & Status Pill Group -->
      <div class="flex flex-col md:flex-row gap-4 w-full lg:w-auto flex-1">
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, position..."
            v-model="searchInput"
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-brand-cyan/20 focus:bg-white transition-all text-sm"
          />
        </div>
        
        <div class="flex items-center gap-2 bg-gray-50 p-1 rounded-lg self-start">
           <button 
             @click="statusInput = ''"
             :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all', statusInput === '' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-500 hover:text-gray-900']"
           >
             All
           </button>
           <button 
             @click="statusInput = 'active'"
             :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all', statusInput === 'active' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900']"
           >
             Active
           </button>
           <button 
             @click="statusInput = 'inactive'"
             :class="['px-4 py-1.5 text-sm font-medium rounded-md transition-all', statusInput === 'inactive' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-900']"
           >
             Inactive
           </button>
        </div>

        <div class="flex gap-2">
           <UiButton @click="handleApplyFilters" variant="secondary" class="px-4 shadow-sm border border-gray-200">Apply</UiButton>
           <UiButton v-if="searchInput || statusInput" @click="handleResetFilters" variant="ghost" class="px-4 text-gray-500">Reset</UiButton>
        </div>
      </div>

      <!-- View Toggles -->
      <div class="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
        <button
          @click="viewMode = 'grid'"
          :class="['p-2 rounded-md transition-all', viewMode === 'grid' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600']"
          title="Grid View"
        >
          <LayoutGrid class="w-5 h-5" />
        </button>
        <button
          @click="viewMode = 'list'"
          :class="['p-2 rounded-md transition-all', viewMode === 'list' ? 'bg-white text-brand-navy shadow-sm' : 'text-gray-400 hover:text-gray-600']"
          title="List View"
        >
          <ListIcon class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
       <div v-for="i in 8" :key="i" class="h-64 bg-gray-100 rounded-xl animate-pulse"></div>
    </div>
    
    <div v-else-if="error" class="p-12 text-center text-red-600 bg-red-50 rounded-lg border border-red-100 mt-6 lg:mx-8">
      Error loading employees. Please try refreshing the page.
    </div>

    <div v-else-if="employees.length === 0" class="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
       <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
         <User class="w-8 h-8 text-gray-300" />
       </div>
       <h3 class="text-lg font-medium text-gray-900">No employees found</h3>
       <p class="text-gray-500 mt-1">Try adjusting your filters or add a new employee.</p>
    </div>

    <div v-else>
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="emp in employees" :key="emp.id" class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group relative">
          <!-- Status Badge - Absolute Top Right -->
          <div class="absolute top-3 right-3 z-10">
             <span :class="['inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase shadow-sm backdrop-blur-md', isEmployeeActive(emp) ? 'bg-green-100/90 text-green-700' : 'bg-red-100/90 text-red-700']">
                {{ isEmployeeActive(emp) ? 'Active' : 'Inactive' }}
             </span>
          </div>

          <div class="h-24 bg-gradient-to-r from-gray-50 to-gray-100 relative border-b border-gray-100">
             <!-- Decorative Pattern or Content -->
          </div>
          
          <div class="px-6 pb-6 pt-16 relative">
             <!-- Avatar - Lifted up to overlap banner -->
             <div class="w-20 h-20 rounded-2xl bg-white p-1 absolute -top-10 left-6 shadow-md shadow-gray-200">
                <div class="w-full h-full rounded-xl bg-brand-navy text-white flex items-center justify-center text-2xl font-bold">
                   {{ (emp.firstName?.[0] || '') + (emp.lastName?.[0] || '') }}
                </div>
             </div>
             
             <!-- Spacer for Avatar -->
             <div class="mb-4">
                <NuxtLink :to="`/${tenantSlug}/dashboard/employees/${emp.id}`" class="block hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-cyan rounded-md">
                   <h3 class="font-bold text-gray-900 text-xl leading-tight group-hover:text-brand-navy transition-colors truncate pr-2" :title="`${emp.firstName} ${emp.lastName}`">
                     {{ emp.firstName }} {{ emp.lastName }}
                   </h3>
                </NuxtLink>
                <p class="text-brand-cyan font-medium text-sm mt-1 truncate">{{ emp.position || emp.user?.role }}</p>
             </div>
             
             <div class="space-y-3 mb-6 pt-4 border-t border-gray-50">
                <div class="flex items-center text-sm text-gray-500">
                   <Mail class="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                   <span class="truncate" :title="emp.user?.email">{{ emp.user?.email }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                   <Briefcase class="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                   <span class="truncate" :title="emp.department || 'No Dept'">{{ emp.department || 'No Dept' }}</span>
                </div>
             </div>

             <div class="flex gap-2">
              <NuxtLink :to="`/${tenantSlug}/dashboard/employees/${emp.id}`" class="flex-1">
                  <UiButton variant="secondary" class="w-full h-9 text-xs">
                    <Edit class="w-3.5 h-3.5 mr-1.5" /> Edit
                  </UiButton>
                </NuxtLink>
                <UiButton 
                  variant="danger" 
                  class="flex-1 h-9 text-xs bg-red-50 text-red-600 hover:bg-red-100 border-red-100 shadow-sm"
                  @click="handleDelete(emp.id)"
                >
                  <Trash2 class="w-3.5 h-3.5 mr-1.5" /> Delete
                </UiButton>
             </div>
          </div>
        </div>
      </div>
      
      <UiCard v-else class="border border-gray-100 shadow-sm overflow-hidden">
         <div class="overflow-x-auto">
           <TablesEmployeeTable 
              :employees="employees" 
              @delete="handleDelete" 
              @restore="handleRestore"
           />
         </div>
      </UiCard>
    </div>
  </div>
</template>
