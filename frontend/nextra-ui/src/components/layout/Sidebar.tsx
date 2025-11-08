import { Button } from '../common/Button';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 h-full bg-surface border-r border-border p-4 flex flex-col gap-4">
      <div className="text-xl font-semibold text-primary">Nextra</div>
      <nav className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start">Dashboard</Button>
        <Button variant="ghost" className="justify-start">Properties</Button>
        <Button variant="ghost" className="justify-start">Clients</Button>
        <Button variant="ghost" className="justify-start">Settings</Button>
      </nav>
      <div className="mt-auto text-sm text-textSecondary">v0.1 · MVP</div>
    </aside>
  );
};
