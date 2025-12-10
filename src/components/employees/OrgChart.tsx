'use client';

import { useOrganizationTree } from '@/hooks/useEmployees';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface OrgChartProps {
  employeeId: string;
}

interface NodeCardProps {
  name: string;
  position: string;
  isCurrent?: boolean;
  isManager?: boolean;
  isSubordinate?: boolean;
}

const NodeCard = ({ name, position, isCurrent = false, isManager = false, isSubordinate = false }: NodeCardProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center p-3 rounded-lg border shadow-sm min-w-[150px] bg-white transition-all hover:shadow-md",
      isCurrent ? "border-brand-navy ring-2 ring-brand-navy/20 bg-brand-navy/5" : "border-gray-200",
      isManager ? "border-purple-200 bg-purple-50" : "",
      isSubordinate ? "border-green-200 bg-green-50" : ""
    )}>
      <div className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
        isCurrent ? "bg-brand-navy text-white" : "bg-gray-100 text-gray-500",
        isManager ? "bg-purple-100 text-purple-600" : "",
        isSubordinate ? "bg-green-100 text-green-600" : ""
      )}>
        <User className="w-5 h-5" />
      </div>
      <p className="font-semibold text-sm text-gray-900 text-center">{name}</p>
      <p className="text-xs text-gray-500 text-center">{position}</p>
    </div>
  );
};

export function OrgChart({ employeeId }: OrgChartProps) {
  const { data: tree, isLoading } = useOrganizationTree(employeeId);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading organization chart...</div>;
  if (!tree) return <div className="p-8 text-center text-red-500">Failed to load organization chart</div>;

  return (
    <div className="flex flex-col items-center space-y-8 p-6 overflow-auto bg-gray-50 rounded-xl min-h-[400px]">
      
      {/* Manager Level */}
      {tree.manager ? (
        <div className="flex flex-col items-center">
            <NodeCard 
              name={`${tree.manager.firstName} ${tree.manager.lastName}`} 
              position={tree.manager.position}
              isManager
            />
            <div className="h-8 w-px bg-gray-300"></div>
        </div>
      ) : (
        <div className="text-xs text-gray-400 mb-4 italic">No Manager (Root)</div>
      )}

      {/* Current Employee Level (and Siblings if we want to show them) */}
      <div className="flex items-start gap-8 relative">
          
          {/* Siblings Left? Or mixed? For simplicity, we center the employee and show siblings around or just center employee. 
              The request JSON has "siblings". If we want to show them effectively we need a proper tree renderer.
              For now let's focus on Manager -> Employee -> Subordinates (Vertical Chain)
              and maybe list siblings aside or in the same row.
          */}
          
          <div className="flex flex-col items-center relative z-10">
            {/* If manager exists, connector is needed */}
             <NodeCard 
                name={`${tree.employee.firstName} ${tree.employee.lastName}`} 
                position={tree.employee.position}
                isCurrent
              />
             {tree.subordinates.length > 0 && <div className="h-8 w-px bg-gray-300"></div>}
          </div>
      </div>

      {/* Subordinates Level */}
      {tree.subordinates.length > 0 && (
        <div className="flex gap-6 items-start justify-center relative">
           {/* Horizontal bar connecting children if more than 1 */}
           {tree.subordinates.length > 1 && (
             <div className="absolute -top-4 left-10 right-10 h-px bg-gray-300"></div>
           )}
           
           {tree.subordinates.map((sub) => (
             <div key={sub.id} className="flex flex-col items-center relative">
               {/* Vertical connector from horizontal bar */}
               <div className="h-4 w-px bg-gray-300 absolute -top-4"></div>
               
               <NodeCard 
                 name={`${sub.firstName} ${sub.lastName}`} 
                 position={sub.position}
                 isSubordinate
               />
             </div>
           ))}
        </div>
      )}

      {tree.subordinates.length === 0 && (
         <div className="text-xs text-gray-400 italic">No direct subordinates</div>
      )}
    </div>
  );
}
