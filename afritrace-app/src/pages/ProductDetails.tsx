import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

function ProductDetails() {
  const { id } = useParams();

  const mockData = {
    product: {
      id: '1',
      name: 'Organic Tomatoes',
      producer: 'A123',
      price: '$5',
      carbonFootprint: '15 kg CO2',
      isCertified: true,
      description: 'Fresh organic tomatoes grown sustainably.',
      supplyChainSteps: [
        {
          location: 'Farm',
          timestamp: '1633024800',
          stepDescription: 'Harvested at farm.',
          temperature: 22,
          humidity: 65,
        },
        {
          location: 'Processing Plant',
          timestamp: '1633053600',
          stepDescription: 'Processed and packaged.',
          temperature: 18,
          humidity: 70,
        },
        {
          location: 'Warehouse',
          timestamp: '1633075200',
          stepDescription: 'Stored in warehouse.',
          temperature: 12,
          humidity: 80,
        },
      ],
    },
  };

  const { product } = mockData;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                Producer: {product.producer}
              </Typography>
              <Typography color="textSecondary">
                Price: {product.price}
              </Typography>
              <Typography color="textSecondary">
                Carbon Footprint: {product.carbonFootprint}
              </Typography>
              <Typography color="textSecondary">
                Status: {product.isCertified ? "Certified" : "Not Certified"}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                {product.description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" sx={{ mr: 2 }}>
              Purchase Product
            </Button>
            <Button variant="outlined" color="secondary">
              Raise Dispute
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Supply Chain Timeline
      </Typography>
      <Timeline>
        {product.supplyChainSteps.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < product.supplyChainSteps.length - 1 && (
                <TimelineConnector />
              )}
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{step.location}</Typography>
                <Typography color="textSecondary" sx={{ mb: 1 }}>
                  {new Date(parseInt(step.timestamp) * 1000).toLocaleString()}
                </Typography>
                <Typography>{step.stepDescription}</Typography>
                <Typography color="textSecondary">
                  Temperature: {step.temperature}°C
                </Typography>
                <Typography color="textSecondary">
                  Humidity: {step.humidity}%
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

export default ProductDetails;
