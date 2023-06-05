// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import React from 'react';
import CardHeader from '@mui/material/CardHeader'

// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (value: string) => void
 
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, toggle, value } = props
  const [role, setRole] = useState<string>('')
  const [fullname, setFullname] = useState('')

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
    handleFilter(event.target.value);
  };

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
     
     <CardHeader title='Customers List' sx={{ pb: 2, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
     
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={fullname}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search FullName'
         onChange={ handleFullnameChange}
        />

        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          Add Customer
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
