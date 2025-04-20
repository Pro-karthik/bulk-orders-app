import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Box } from '@mui/material';


const getNextStatus = (status) => {
  if (status === 'Pending') return 'InProgress';
  if (status === 'InProgress') return 'Delivered';
  return 'Delivered';
};

const getStatusColor = (status) => {
  if (status === 'Pending') return 'warning';
  if (status === 'InProgress') return 'info';
  return 'success';
};

const OrderTable = ({ orders, updateStatus }) => {
  const columns = [
    { field: 'id', headerName: 'Order ID',width:120},
    { field: 'buyerName', headerName: 'Buyer Name',width:150 },
    { field: 'buyerContact', headerName: 'Contact',width:200 },
    { field: 'deliveryAddress', headerName: 'Address',width:250 },
    {
      field: 'items',
      headerName: 'Items',
      width:200,
      renderCell: (params) => (
        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {params.value.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity}
            </li>
          ))}
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Chip label={params.value} color={getStatusColor(params.value)} />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        const { id, status } = params.row;
        const next = getNextStatus(status);
        return (
          <Button
            size="small"
            variant="contained"
            onClick={() => updateStatus(id, status)}
            disabled={status === 'Delivered'}
          >
            {status === 'Delivered' ? 'Completed' : `Mark as ${next}`}
          </Button>
        );
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        overflowX: 'auto', 
        display: 'block', 
      }}
    >
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.id}
        disableSelectionOnClick 
        
      />
    </Box>
  );
};

export default OrderTable;
