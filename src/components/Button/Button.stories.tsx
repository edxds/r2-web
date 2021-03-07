import { Story, Meta } from '@storybook/react';

import { Button as ButtonComponent, ButtonProps } from './Button';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  args: {
    children: 'Label',
  },
} as Meta;

const Template: Story<ButtonProps<'button'>> = ({ ref, ...args }) => <ButtonComponent {...args} />;

export const Button = Template.bind({});
