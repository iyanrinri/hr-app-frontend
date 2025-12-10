export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-brand-navy">Settings</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
}
