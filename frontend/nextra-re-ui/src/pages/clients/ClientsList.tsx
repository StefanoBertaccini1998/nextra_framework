import { DataGrid } from 'nextra-ui/components/common/DataGrid/DataGrid';
import { PageHeader } from 'nextra-ui/components/common';

type Client = { id: number; name: string; email: string; phone?: string };

const sample: Client[] = [
  { id: 1, name: 'Mario Rossi', email: 'mario@example.com', phone: '333-12345' },
  { id: 2, name: 'Anna Bianchi', email: 'anna@example.com' },
];

export default function ClientsList() {
  const columns: any = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
  ];

  return (
    <div>
      <PageHeader title="Clients" description="Manage your clients" />
      <DataGrid data={sample} columns={columns} />
    </div>
  );
}