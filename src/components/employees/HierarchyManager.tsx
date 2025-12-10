import { useState } from 'react';
import { useEmployee, useAssignManager, useAssignSubordinates, useAllEmployees, Employee } from '@/hooks/useEmployees';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { OrgChart } from './OrgChart';
import { Users, UserPlus, Network } from 'lucide-react';

interface HierarchyManagerProps {
  employeeId: string;
}

export function HierarchyManager({ employeeId }: HierarchyManagerProps) {
  const { data: employee } = useEmployee(employeeId);
  const { data: allEmployees } = useAllEmployees();
  const { mutate: assignManager, isPending: isAssigningManager } = useAssignManager(employeeId);
  const { mutate: assignSubordinates, isPending: isAssigningSubordinates } = useAssignSubordinates(employeeId);
  
  const [showOrgChart, setShowOrgChart] = useState(false);
  const [isEditManager, setIsEditManager] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<string>('');

  // Derived state
  const otherEmployees = allEmployees?.filter(e => e.id !== employeeId) || [];
  
  // Handlers
  const handleAssignManager = () => {
    assignManager({ managerId: selectedManagerId || null });
    setIsEditManager(false);
  };

  if (!employee) return null;

  return (
    <div className="space-y-6">
       
       <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
         <div>
           <h3 className="text-lg font-medium text-gray-900">Organization Hierarchy</h3>
           <p className="text-sm text-gray-500">Manage reporting lines and view structure</p>
         </div>
         <Button 
            variant="secondary" 
            onClick={() => setShowOrgChart(!showOrgChart)}
         >
           <Network className="w-4 h-4 mr-2" />
           {showOrgChart ? 'Hide Org Chart' : 'View Inheritance'}
         </Button>
       </div>

       {showOrgChart && (
         <Card>
            <CardHeader><CardTitle>Organization Chart</CardTitle></CardHeader>
            <CardContent>
               <OrgChart employeeId={employeeId} />
            </CardContent>
         </Card>
       )}

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Manager Section */}
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2">
               <Users className="w-4 h-4 text-purple-600" />
               Reports To (Manager)
             </CardTitle>
           </CardHeader>
           <CardContent>
             {isEditManager ? (
               <div className="space-y-3">
                 <select 
                   className="w-full p-2 border rounded-md text-sm"
                   value={selectedManagerId}
                   onChange={(e) => setSelectedManagerId(e.target.value)}
                 >
                   <option value="">-- No Manager --</option>
                   {otherEmployees.map(e => (
                     <option key={e.id} value={e.id}>
                       {e.firstName} {e.lastName} ({e.position})
                     </option>
                   ))}
                 </select>
                 <div className="flex gap-2">
                   <Button onClick={handleAssignManager} isLoading={isAssigningManager}>Save</Button>
                   <Button variant="ghost" onClick={() => setIsEditManager(false)}>Cancel</Button>
                 </div>
               </div>
             ) : (
               <div className="flex justify-between items-center">
                 <div>
                   {employee.managerId ? (
                      // We need to find manager name from allEmployees
                      (() => {
                        const mgr = allEmployees?.find(e => String(e.id) === String(employee.managerId));
                        return mgr ? (
                          <>
                            <p className="font-medium text-gray-900">{mgr.firstName} {mgr.lastName}</p>
                            <p className="text-xs text-gray-500">{mgr.position}</p>
                          </>
                        ) : <p className="text-gray-500 italic">Unknown Manager (ID: {employee.managerId})</p>
                      })()
                   ) : (
                     <p className="text-gray-500 italic">No manager assigned</p>
                   )}
                 </div>
                 <Button variant="secondary" onClick={() => {
                   setSelectedManagerId(String(employee.managerId || ''));
                   setIsEditManager(true);
                 }}>
                   Change
                 </Button>
               </div>
             )}
           </CardContent>
         </Card>

         {/* Subordinates Section */}
         <Card>
           <CardHeader className="pb-2">
             <CardTitle className="text-base flex items-center gap-2">
               <UserPlus className="w-4 h-4 text-green-600" />
               Direct Reports (Subordinates)
             </CardTitle>
           </CardHeader>
           <CardContent>
              <SubordinateManager 
                 employeeId={employeeId} 
                 currentSubordinates={allEmployees?.filter(e => String(e.managerId) === String(employeeId)) || []}
                 allEmployees={otherEmployees} // exclude self
                 onSave={(ids: number[]) => assignSubordinates({ subordinateIds: ids })}
                 isSaving={isAssigningSubordinates}
              />
           </CardContent>
         </Card>
       </div>
    </div>
  );
}

interface SubordinateManagerProps {
  employeeId: string;
  currentSubordinates: Employee[];
  allEmployees: Employee[];
  onSave: (ids: number[]) => void;
  isSaving: boolean;
}

function SubordinateManager({ currentSubordinates, allEmployees, onSave, isSaving }: SubordinateManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleStartEdit = () => {
    setSelectedIds(currentSubordinates.map((e) => Number(e.id)));
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(selectedIds);
    setIsEditing(false);
  };

  const toggleId = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="max-h-[200px] overflow-y-auto border rounded-md p-2 space-y-1">
          {allEmployees.map((e) => (
             <label key={e.id} className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(Number(e.id))}
                  onChange={() => toggleId(Number(e.id))}
                  className="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
                />
                <span className="text-sm">{e.firstName} {e.lastName}</span>
                <span className="text-xs text-gray-400">({e.position})</span>
             </label>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button onClick={handleSave} isLoading={isSaving}>Save Assignment</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 max-h-[150px] overflow-y-auto space-y-2">
        {currentSubordinates.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No direct reports.</p>
        ) : (
          currentSubordinates.map((sub) => (
            <div key={sub.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-100">
               <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold">
                 {sub.firstName[0]}{sub.lastName[0]}
               </div>
               <div>
                  <p className="text-sm font-medium">{sub.firstName} {sub.lastName}</p>
                  <p className="text-xs text-gray-500">{sub.position}</p>
               </div>
            </div>
          ))
        )}
      </div>
      <Button variant="secondary" className="w-full" onClick={handleStartEdit}>
        Manage Subordinates
      </Button>
    </div>
  );
}
