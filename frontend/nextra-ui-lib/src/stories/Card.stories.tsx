import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div style={{padding: 12}}>Card content</div>
  }
};
