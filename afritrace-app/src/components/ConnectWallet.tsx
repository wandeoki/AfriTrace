import { useConnect } from 'wagmi';
import { Box, Button, Typography } from '@mui/material';

function ConnectWallet() {
  const { connectors, connect, error } = useConnect();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      padding="20px"
      bgcolor="#181818" 
    >
      <Typography variant="h4" gutterBottom>
        Hey there, there's magic behind these walls.
      </Typography>
      <Typography variant="h6" gutterBottom>
        Connect Wallet to get started.
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mt={4}>
        {connectors.map((connector) => (
          <Button
            key={connector.id}
            variant="contained"
            color="primary"
            onClick={() => connect({ connector })}
            size="large"
            sx={{
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            {connector.name}
          </Button>
        ))}
      </Box>

      {error && (
        <Typography variant="body1" color="error" mt={2}>
          {error.message}
        </Typography>
      )}
    </Box>
  );
}

export default ConnectWallet;
