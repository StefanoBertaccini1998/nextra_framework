import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/common/DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable as any,
};

export default meta;

type Story = StoryObj<typeof DataTable>;

const data = Array.from({length:6}).map((_,i) => ({ id: String(i+1), name: `Name ${i+1}`, email: `user${i+1}@example.com` }));
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' }
];

export const Default: Story = {
  args: {
    data,
    columns
  }
};
