

export interface Salary {
  id: string;
  employeeId: string;
  baseSalary: string;
  allowances: string;
  grade: string | null;
  effectiveDate: string;
  endDate: string | null;
  isActive: boolean;
  notes: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  employee?: {
    id: string;
    firstName: string;
    lastName: string;
    position: string;
    department: string;
  };
}

// Helper to construct URL with tenant slug
const useTenantUrl = () => {
    const route = useRoute()
    const tenantSlug = route.params.tenant_slug as string
    
    return (path: string) => {
      const cleanPath = path.startsWith('/') ? path : `/${path}`
      return tenantSlug ? `/api/${tenantSlug}${cleanPath}` : `/api${cleanPath}`
    }
}

export const useEmployeeSalaryHistory = (employeeId: MaybeRef<string>) => {
    const getUrl = useTenantUrl()


    const { data, pending, error, refresh } = useFetch<Salary[]>(() => getUrl(`/salaries/employee/${unref(employeeId)}/history`), {
        key: `salary-history-${unref(employeeId)}`,
        immediate: !!unref(employeeId),

    })

    return {
        data,
        loading: pending,
        error,
        refresh
    }
}
