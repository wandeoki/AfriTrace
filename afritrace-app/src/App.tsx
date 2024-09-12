import { useAccount } from 'wagmi';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProductCreation from './pages/ProductCreation';
import ConnectWallet from './components/ConnectWallet';
import ProductDetails from './pages/ProductDetails';
import SupplyChain from './pages/SupplyChain';
import Certification from './pages/Certification';
import DisputeResolution from './pages/DisputeResolution';
import CarbonOffset from './pages/CarbonOffset';

function App() {
  const { address } = useAccount();
 

  return (
    <>
      {!address ? (
        <ConnectWallet/>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-product" element={<ProductCreation />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/supply-chain/:id" element={<SupplyChain />} />
              <Route path="/certify" element={<Certification />} />
              <Route path="/disputes" element={<DisputeResolution />} />
              <Route path="/carbon-offset" element={<CarbonOffset />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
