import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'

interface VerticalBoxProps {
  gap?: number
  sx?: SxProps<Theme>
  children: React.ReactNode
}

function VerticalBox(props: VerticalBoxProps) {
  const { gap, sx, children } = props

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap, ...sx }}>
      {children}
    </Box>
  )
}

export default VerticalBox
