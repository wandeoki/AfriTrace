import { useState } from 'react';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';

interface Product {
  id: string;
  name: string;
  producer: string;
  timestamp: string;
}

function Certification() {
  const [certifying, setCertifying] = useState(false);

  // Mock product data for testing purposes
  const data = {
    products: [
      {
        id: '1',
        name: 'Ethiopian Coffee Beans',
        producer: 'Farmer A',
        timestamp: '1633024800',
      },
      {
        id: '2',
        name: 'Ghanaian Cocoa Beans',
        producer: 'Farmer B',
        timestamp: '1633053600',
      },
      {
        id: '3',
        name: 'Kenyan Tea Leaves',
        producer: 'Farmer C',
        timestamp: '1633075200',
      },
    ],
  };

  const handleCertify = async (productId: string) => {
    setCertifying(true);
    try {
      // Placeholder for actual certification logic
      console.log(`Certifying product with ID: ${productId}`);
      // Refetch uncertified products if necessary
    } catch (error) {
      console.error('Error certifying product:', error);
    }
    setCertifying(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Certification
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {data.products.map((product: Product) => (
          <Card key={product.id} sx={{ width: 'calc(33.333% - 16px)', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="textSecondary">Producer: {product.producer}</Typography>
              <Typography color="textSecondary">
                Created: {new Date(parseInt(product.timestamp) * 1000).toLocaleString()}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleCertify(product.id)}
                disabled={certifying}
                sx={{ mt: 2 }}
              >
                Certify Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Certification;
