import { PageHeader } from '../components/common';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Overview and quick actions" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 bg-surface p-4 rounded-lg">Summary card (1)</div>
        <div className="col-span-1 bg-surface p-4 rounded-lg">Summary card (2)</div>
        <div className="col-span-1 bg-surface p-4 rounded-lg">Summary card (3)</div>
      </div>
    </div>
  );
}
