import { Box } from '@mui/material'
import React from 'react'

interface HorizontalBottomAlignmentProps {
  gap: number
  children: React.ReactNode
}

function HorizontalBottomAlignment(props: HorizontalBottomAlignmentProps) {
  const { gap, children } = props

  return <Box sx={{ display: 'flex', alignItems: 'end', gap }}>{children}</Box>
}

export default HorizontalBottomAlignment
