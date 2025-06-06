import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';


const requests = [
    {
      id: 1,
      name: "John Doe",
      type: "Delivery",
      service: "Express",
      status: "Approved",
      address: "123 Main St, City",
      date: "2025-04-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Pickup",
      service: "Standard",
      status: "Pending",
      address: "456 Elm St, Town",
      date: "2025-04-02",
    },
  ];

const RequestCard = () => {
  return (
    <div >
    {requests.map((request) => (
      <Card  className='bg-white  rounded-lg shadow-md' key={request.id} sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" component="div" color="primary" >
            <strong>Request :{request.id}</strong>
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Box>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1">{request.name}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Type</Typography>
              <Typography variant="body1">{request.type}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Service</Typography>
              <Typography variant="body1">{request.service}</Typography>
            </Box>
           
            <Box>
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body1">{request.address}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Date</Typography>
              <Typography variant="body1">{request.date}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">Status</Typography>
              <Typography variant="body1" color={request.status === "Approved" ? "green" : "orange"}>
                {request.status}
              </Typography>
            </Box>
          </Box>
          
        </CardContent>
      </Card>
    ))}
  </div>
  );
};

export default RequestCard;
