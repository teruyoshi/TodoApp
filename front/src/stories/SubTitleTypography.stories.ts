import type { Meta, StoryObj } from '@storybook/react-vite'

import { SubTitleTypography } from '@/components'

const meta = {
  component: SubTitleTypography,
} satisfies Meta<typeof SubTitleTypography>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'SubTitle Typography Example',
  },
}
