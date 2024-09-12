import React, { useState } from 'react';
import { Typography, Card, CardContent, Button, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface Dispute {
  id: string;
  productId: string;
  initiator: string;
  description: string;
  resolved: boolean;
  resolution?: string;
}

function DisputeResolution() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null);
  const [resolution, setResolution] = useState('');

  // Mock data for testing purposes
  const data = {
    disputes: [
      {
        id: '1',
        productId: '1001',
        initiator: 'User A',
        description: 'Product quality is unsatisfactory.',
        resolved: false,
      },
      {
        id: '2',
        productId: '1002',
        initiator: 'User B',
        description: 'Delayed delivery of the product.',
        resolved: true,
        resolution: 'Apology and expedited replacement provided.',
      },
      {
        id: '3',
        productId: '1003',
        initiator: 'User C',
        description: 'Received the wrong item.',
        resolved: false,
      },
    ],
  };

  const handleResolve = async () => {
    try {
      // Placeholder for actual dispute resolution logic
      console.log(`Resolving dispute with ID: ${selectedDispute?.id}, resolution: ${resolution}`);
      setSelectedDispute(null);
      setResolution('');
      // Refetch disputes if necessary
    } catch (error) {
      console.error('Error resolving dispute:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dispute Resolution
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {data.disputes.map((dispute: Dispute) => (
          <Card key={dispute.id} sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6">Dispute ID: {dispute.id}</Typography>
              <Typography color="textSecondary">Product ID: {dispute.productId}</Typography>
              <Typography color="textSecondary">Initiator: {dispute.initiator}</Typography>
              <Typography>{dispute.description}</Typography>
              <Typography color="textSecondary">
                Status: {dispute.resolved ? 'Resolved' : 'Unresolved'}
              </Typography>
              {dispute.resolved && (
                <Typography color="textSecondary">Resolution: {dispute.resolution}</Typography>
              )}
              {!dispute.resolved && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setSelectedDispute(dispute)}
                  sx={{ mt: 2 }}
                >
                  Resolve Dispute
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={!!selectedDispute} onClose={() => setSelectedDispute(null)}>
        <DialogTitle>Resolve Dispute</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Resolution"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDispute(null)}>Cancel</Button>
          <Button onClick={handleResolve} color="primary">
            Resolve
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DisputeResolution;
