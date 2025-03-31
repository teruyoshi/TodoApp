import { Box } from '@mui/material'
import React from 'react'

interface VerticalBoxProps {
  gap?: number
  children: React.ReactNode
}

function VerticalBox(props: VerticalBoxProps) {
  const { gap, children } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap }}>{children}</Box>
  )
}

export default VerticalBox
