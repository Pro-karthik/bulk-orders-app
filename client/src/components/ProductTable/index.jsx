import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Typography } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import { EditProductPopup } from '../Popup';

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products || products.length === 0) {
    return (
      <Box className="flex flex-col items-center justify-center h-[90vh] w-full text-center">
        <img
          className="w-64"
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="No products"
        />
        <Typography variant="h6" className="mt-6 text-gray-500">
          No products available
        </Typography>
        <Typography className="text-gray-500">
          Save your products by clicking on the add new product
        </Typography>
      </Box>
    );
  }

  
  const columns = [
    { field: 'id', headerName: 'Product ID',flex:1 ,minWidth:140},
    { field: 'name', headerName: 'Product Name',flex:1,minWidth:140},
    {
      field: 'price',
      headerName: 'Product Price',
      flex:1,
      minWidth:140,
      valueFormatter: (params) => {
        const value = params;
        return typeof value === 'number' ? `₹${value}` : '₹0';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex:1,
      minWidth:140,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const product = params.row;
        return (
          <Box display="flex" justifyContent="start" alignItems="center" gap={3}>
            <EditProductPopup
              actualDetails={product}
              onSubmitEditProducts={onEdit}
            />
            <IconButton
              className='text-lg'
              color="error"
              onClick={() => onDelete(product.id)}
            >
              <FaTrash className='text-lg md:text-2xl'/>
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
    </Box>
  );
};

export default ProductTable;
