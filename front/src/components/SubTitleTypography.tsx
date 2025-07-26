import React from 'react'
import { Typography } from '@mui/material'

interface SubTitleTypographyProps {
  children?: React.ReactNode
}

function SubTitleTypography({ children }: SubTitleTypographyProps) {
  return <Typography variant="h5">{children}</Typography>
}

export default SubTitleTypography
