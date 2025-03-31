import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'

interface HorizontalBottomAlignmentBoxProps {
  gap?: number
  sx?: SxProps<Theme>
  children: React.ReactNode
}

function HorizontalBottomAlignmentBox(
  props: HorizontalBottomAlignmentBoxProps
) {
  const { gap, sx, children } = props

  return (
    // flexDirection はデフォルトで row だが、わかりやすくするために敢えて再指定している
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        gap,
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default HorizontalBottomAlignmentBox
