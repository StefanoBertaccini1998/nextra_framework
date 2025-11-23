import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LoadingScreen from '../components/common/LoadingScreen';

const meta: Meta<typeof LoadingScreen> = {
  title: 'Components/LoadingScreen',
  component: LoadingScreen,
};

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

export const Default: Story = {
  args: {
    isLoading: true,
    message: 'Loading...'
  }
};
