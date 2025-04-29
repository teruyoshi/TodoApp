import { Box } from '@mui/material'
import React from 'react'

interface LeftMarginIndentBoxProps {
  level: number
  children: React.ReactNode
}

function LeftMarginIndentBox(props: LeftMarginIndentBoxProps) {
  const { level, children } = props

  return <Box sx={{ marginLeft: `${level}rem` }}>{children}</Box>
}

export default LeftMarginIndentBox
