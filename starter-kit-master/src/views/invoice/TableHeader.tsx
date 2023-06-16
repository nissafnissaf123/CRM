// ** Next Import
import Link from 'next/link'

import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import { GridBooleanCell, GridRowId } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import  Grid from '@mui/material/Grid'

interface TableHeaderProps {
  value: string
  selectedRows: GridRowId[]
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { value, selectedRows, handleFilter } = props
  const [fullname, setFullname] = useState('')

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
    handleFilter(event.target.value);
  };

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid
        
        sx={{ mr: 4, mb: 2 }}
       
      >
        
      </Grid>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Customer'
          sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
          onChange={e => handleFilter(e.target.value)}
        />
      
      </Box>
    </Box>
  )
}

export default TableHeader
