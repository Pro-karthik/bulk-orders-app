import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'warning';
    case 'Inprogress':
      return 'info';
    case 'Delivered':
      return 'success';
    default:
      return 'default';
  }
};

const OrderCard = ({ details }) => {
  const { id, buyerName, buyerContact, deliveryAddress, items, status, createdAt } = details;

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: 2,
        backgroundColor: '#fafafa',
        '&:hover': { boxShadow: 6 },
      }}
      variant="outlined"
    >
     
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="bold">
              Order #{id}
            </Typography>
            <Chip label={status} color={getStatusColor(status)} />
          </Box>

          <Typography mt={1} variant="body2" color="text.secondary">
            Placed on: {new Date(createdAt).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="body1">
            <strong>Buyer:</strong> {buyerName}
          </Typography>
          <Typography variant="body1">
            <strong>Contact:</strong> {buyerContact}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {deliveryAddress}
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="body2" color="text.secondary" fontWeight="bold" gutterBottom>
            Items:
          </Typography>
          {items.map((item, index) => (
            <Box key={index} ml={2} mb={0.5}>
              <Typography variant="body2">
                • {item.name} (x{item.quantity}) — ₹{item.price}
              </Typography>
            </Box>
          ))}
        </CardContent>
      
    </Card>
  );
};

export default OrderCard;
