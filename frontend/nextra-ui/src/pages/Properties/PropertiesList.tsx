import { DataGrid } from '../../components/common/DataGrid/DataGrid';
import { PageHeader } from '../../components/common';

type Property = { id: number; title: string; address: string; price: number; status: string };

const sample: Property[] = [
  { id: 1, title: 'Apartment A', address: 'Via Roma 1', price: 120000, status: 'active' },
  { id: 2, title: 'House B', address: 'Corso Italia 5', price: 350000, status: 'sold' },
];

export default function PropertiesList() {
  const columns: any = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Address', accessor: 'address' },
    { header: 'Price', accessor: (p: Property) => `€${p.price.toLocaleString()}` },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <PageHeader title="Properties" description="List and manage properties" />
      <DataGrid data={sample} columns={columns} searchField="title" pageSize={10} />
    </div>
  );
}
