import  { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Slider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(4),
}));

const CardGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '400px',
}));

// Define the types for the data structures
interface CarbonCreditHistoryItem {
  timestamp: string;
  amount: string;
}

interface CarbonCreditData {
  carbonCredits: any;
  totalCredits: number;
  history: CarbonCreditHistoryItem[];
}

interface ChartData {
  date: string;
  credits: number;
}

// Mock Data for Carbon Credits
const mockData: CarbonCreditData = {
  carbonCredits: {
    totalCredits: 4500,
    history: [
      { timestamp: '1672531200', amount: '500' },
      { timestamp: '1675119600', amount: '300' },
      { timestamp: '1677798000', amount: '700' },
      { timestamp: '1680390000', amount: '1000' },
      { timestamp: '1683068400', amount: '2000' },
    ],
  },
  totalCredits: 0,
  history: []
};

function CarbonOffset() {
  const [address, setAddress] = useState<string>('');
  const [offsetAmount, setOffsetAmount] = useState<number>(100);
  const [data] = useState<CarbonCreditData>(mockData); 
  const [loading] = useState<boolean>(false); 

  const handleOffset = async () => {
    try {
      console.log('Offsetting carbon with amount:', offsetAmount);
      // Simulate API call here
    } catch (error) {
      console.error('Error offsetting carbon:', error);
    }
  };

  const formatChartData = (history: CarbonCreditHistoryItem[]): ChartData[] => {
    return history.map((item) => ({
      date: new Date(parseInt(item.timestamp) * 1000).toLocaleDateString(),
      credits: parseInt(item.amount),
    }));
  };

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Carbon Offset Dashboard
      </Typography>

      <CardGrid>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Carbon Credits
            </Typography>
            <Typography variant="h3">
              {loading ? 'Loading...' : data?.carbonCredits?.totalCredits || '0'}
            </Typography>
          </CardContent>
        </StyledCard>

        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Offset Carbon
            </Typography>
            <Slider
              value={offsetAmount}
              onChange={(_, newValue) => setOffsetAmount(newValue as number)}
              aria-labelledby="carbon-offset-slider"
              valueLabelDisplay="auto"
              min={1}
              max={1000}
            />
            <Typography>Amount to offset: {offsetAmount} kg CO2</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOffset}
              fullWidth
              sx={{ mt: 2 }}
            >
              Offset Carbon
            </Button>
          </CardContent>
        </StyledCard>
      </CardGrid>

      <ChartContainer>
        <Typography variant="h6" gutterBottom>
          Carbon Credits History
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={
              data?.carbonCredits?.history
                ? formatChartData(data.carbonCredits.history)
                : []
            }
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="credits"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Enter Ethereum Address
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            /* Fetch data for entered address */
          }}
        >
          Fetch Carbon Credits
        </Button>
      </Paper>
    </PageContainer>
  );
}

export default CarbonOffset;
