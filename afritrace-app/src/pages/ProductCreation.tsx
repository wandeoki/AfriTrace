import { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';




function ProductCreation() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ipfsHash: '',
    price: '',
    carbonFootprint: '',
  });



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      

    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="IPFS Hash"
          name="ipfsHash"
          value={formData.ipfsHash}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Carbon Footprint"
          name="carbonFootprint"
          type="number"
          value={formData.carbonFootprint}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Product
        </Button>
      </form>
    </Box>
  );
}

export default ProductCreation;