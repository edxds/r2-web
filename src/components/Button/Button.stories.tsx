import { Story, Meta } from '@storybook/react';

import { Button as ButtonComponent, ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    variant: {
      type: 'string',
      control: {
        type: 'radio',
        options: ['solid', 'flat', 'text'],
      },
    },
    size: {
      type: 'string',
      control: {
        type: 'radio',
        options: ['sm', 'md', 'lg'],
      },
    },
    color: {
      type: 'string',
      control: {
        type: 'radio',
        options: ['primary', 'neutral'],
      },
    },
    weight: {
      type: 'string',
      control: {
        type: 'radio',
        options: ['medium', 'heavy'],
      },
    },
    label: {
      type: 'string',
    },
  },
  args: {
    label: 'Label',
  },
} as Meta;

const Template: Story<ButtonProps<'button'> & { label: string }> = ({ ref, label, ...args }) => (
  <ButtonComponent {...args}>{label}</ButtonComponent>
);

export const Button = Template.bind({});
