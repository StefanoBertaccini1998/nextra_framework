import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ListingView from '../components/ListingView';

const meta: Meta<typeof ListingView> = {
  title: 'Components/ListingView',
  component: ListingView,
};

export default meta;

type Story = StoryObj<typeof ListingView>;

const items = Array.from({length:6}).map((_,i) => ({ id: String(i+1), title: `Item ${i+1}`, subtitle: `Subtitle ${i+1}`, image: null }));

export const Grid: Story = {
  args: {
    items,
    columns: 3,
  }
};
