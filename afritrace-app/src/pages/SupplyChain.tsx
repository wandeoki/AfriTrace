import React, { useState } from 'react';
import { Typography, Card, CardContent, Button, TextField, Box } from '@mui/material';

      


interface SupplyChainStep {
  stakeholder: string;
  location: string;
  timestamp: string;
  stepDescription: string;
  temperature: number;
  humidity: number;
}

interface Product {
  id: string;
  name: string;
  supplyChainSteps: SupplyChainStep[];
}

interface QueryData {
  product: Product;
}

function SupplyChain() {
  

  const [newStep, setNewStep] = useState({
    location: '',
    stepDescription: '',
    temperature: '',
    humidity: '',
  });

  // Mock data in case the query doesn't work for local testing
  const mockData: QueryData = {
    product: {
      id: '1',
      name: 'Organic Coffee Beans',
      supplyChainSteps: [
        {
          stakeholder: 'Farmer A',
          location: 'Ethiopia',
          timestamp: '1633024800',
          stepDescription: 'Harvested at the farm',
          temperature: 25,
          humidity: 60,
        },
        {
          stakeholder: 'Warehouse B',
          location: 'Addis Ababa',
          timestamp: '1633053600',
          stepDescription: 'Stored in the warehouse',
          temperature: 18,
          humidity: 70,
        },
        {
          stakeholder: 'Shipper C',
          location: 'Port of Djibouti',
          timestamp: '1633075200',
          stepDescription: 'Shipped to destination',
          temperature: 15,
          humidity: 75,
        },
      ],
    },
  };

  // For testing, use mockData instead of real data
  const product =  mockData.product;

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography>Error: {error.message}</Typography>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    //   await addSupplyChainStep({
    //     variables: {
    //       productId: id,
    //       ...newStep,
    //       temperature: parseInt(newStep.temperature),
    //       humidity: parseInt(newStep.humidity),
    //     },
    //   });
      // Reset form
      setNewStep({ location: '', stepDescription: '', temperature: '', humidity: '' });
      // Optionally refetch data or update local state
    } catch (error) {
      console.error('Error adding supply chain step:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStep({ ...newStep, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Supply Chain: {product.name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {product.supplyChainSteps.map((step, index) => (
          <Card key={index} sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{step.location}</Typography>
              <Typography color="textSecondary">
                {new Date(parseInt(step.timestamp) * 1000).toLocaleString()}
              </Typography>
              <Typography>{step.stepDescription}</Typography>
              <Typography color="textSecondary">Temperature: {step.temperature}°C</Typography>
              <Typography color="textSecondary">Humidity: {step.humidity}%</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Add New Supply Chain Step
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Location"
          name="location"
          value={newStep.location}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Step Description"
          name="stepDescription"
          value={newStep.stepDescription}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Temperature (°C)"
          name="temperature"
          type="number"
          value={newStep.temperature}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Humidity (%)"
          name="humidity"
          type="number"
          value={newStep.humidity}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Step
        </Button>
      </form>
    </Box>
  );
}

export default SupplyChain;
