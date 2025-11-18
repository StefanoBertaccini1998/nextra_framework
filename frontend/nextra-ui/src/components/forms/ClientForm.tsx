import { DynamicForm, type FormField } from '@nextra/ui-lib';
import type { Client } from '../../store/slices/clientsSlice';

interface ClientFormProps {
  initialValues?: Partial<Client>;
  onSubmit: (values: Partial<Client>) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const clientFormFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Mario Rossi',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'mario.rossi@example.com',
    required: true,
    validation: (value: any) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Invalid email format';
      }
      return null;
    },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+39 333 111222',
    required: true,
  },
  {
    name: 'fiscalId',
    label: 'Fiscal ID',
    type: 'text',
    placeholder: 'MRSS80A01H501X',
    required: true,
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    placeholder: 'Via Roma 1, Milano',
    required: true,
  },
  {
    name: 'preferredBudgetMin',
    label: 'Minimum Budget (€)',
    type: 'number',
    placeholder: '150000',
    min: 0,
    step: 1000,
    validation: (value: any) => {
      if (value && value < 0) {
        return 'Budget must be positive';
      }
      return null;
    },
  },
  {
    name: 'preferredBudgetMax',
    label: 'Maximum Budget (€)',
    type: 'number',
    placeholder: '300000',
    min: 0,
    step: 1000,
    validation: (value: any) => {
      if (value && value < 0) {
        return 'Budget must be positive';
      }
      return null;
    },
  },
  {
    name: 'preferredLocations',
    label: 'Preferred Locations',
    type: 'text',
    placeholder: 'Milan,Rome (comma-separated)',
  },
  {
    name: 'preferredPropertyTypes',
    label: 'Preferred Property Types',
    type: 'text',
    placeholder: 'Apartment,Villa (comma-separated)',
  },
  {
    name: 'preferredSizeMin',
    label: 'Minimum Size (m²)',
    type: 'number',
    placeholder: '50',
    min: 0,
    step: 1,
  },
  {
    name: 'preferredSizeMax',
    label: 'Maximum Size (m²)',
    type: 'number',
    placeholder: '120',
    min: 0,
    step: 1,
  },
  {
    name: 'notes',
    label: 'Notes',
    type: 'textarea',
    placeholder: 'Additional notes or requirements...',
    rows: 4,
  },
];

export function ClientForm({ initialValues, onSubmit, onCancel, loading }: ClientFormProps) {
  return (
    <DynamicForm
      fields={clientFormFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitLabel={initialValues?.id ? 'Update Client' : 'Create Client'}
      cancelLabel="Cancel"
      loading={loading}
      columns={2}
    />
  );
}
