import { Typography, Box, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

interface Product {
  id: string;
  name: string;
  description: string;
  producer: {
    id: string;
  };
  isCertified: boolean;
}

interface SupplyChainStep {
  id: string;
  product: {
    id: string;
  };
  stakeholder: {
    id: string;
  };
  location: string;
}

interface Data {
  products: Product[];
  supplyChainSteps: SupplyChainStep[];
}

const query = gql`
  {
    products(first: 5) {
      id
      name
      description
      producer {
        id
      }
    }
    supplyChainSteps(first: 5) {
      id
      product {
        id
      }
      stakeholder {
        id
      }
      location
    }
  }
`;

const url = 'https://api.studio.thegraph.com/query/88776/afritrace/version/latest';

const mockData = {
    products: [
      {
        id: '1',
        name: 'Organic Tomatoes',
        description: 'Fresh organic tomatoes grown sustainably.',
        producer: {
          id: 'A123',
        },
        isCertified: true,
      },
      {
        id: '2',
        name: 'Free-range Chicken',
        description: 'Ethically raised free-range chicken.',
        producer: {
          id: 'B456',
        },
        isCertified: false,
      },
      {
        id: '3',
        name: 'Almond Milk',
        description: 'Homemade almond milk with no preservatives.',
        producer: {
          id: 'C789',
        },
        isCertified: true,
      },
      {
        id: '4',
        name: 'Honey',
        description: 'Natural honey sourced from local beekeepers.',
        producer: {
          id: 'D012',
        },
        isCertified: false,
      },
      {
        id: '5',
        name: 'Brown Eggs',
        description: 'Fresh farm eggs with no additives.',
        producer: {
          id: 'E345',
        },
        isCertified: true,
      },
    ],
  };
  
function Dashboard() {
  const { data, status } = useQuery<Data>({
    queryKey: ['data'],
    async queryFn() {
      return await request<Data>(url, query);
    },
  });

  if (status === 'pending') return <Typography>Loading...</Typography>;
  if (status === 'error') return <Typography>Error fetching products</Typography>;

  return (
    <Box sx={{ minHeight: '100vh', padding: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Recent Products
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 3,
          
        }}
      >
        {mockData?.products.map((product) => (
          <Card key={product.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="textSecondary">Producer ID: {product.producer.id}</Typography>
              <Typography color="textSecondary">
                Status: {product.isCertified ? 'Certified' : 'Not Certified'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={`/product/${product.id}`}>
                View Details
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Dashboard;
