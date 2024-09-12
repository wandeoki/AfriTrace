import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import OPStackCalculator from "../opCalculator";
import { useWriteContract, useReadContracts, useAccount } from "wagmi";
import { afriTraceABI, contractAddress } from "../constant";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const afriContract = {
  address: contractAddress,
  abi: afriTraceABI,
} as const;

type SupplyChainStep = {
  location: string;
  timestamp: string;
  stepDescription: string;
  temperature: number;
  humidity: number;
};

type Product = {
  id: string;
  name: string;
  producer: string;
  price: string;
  carbonFootprint: string;
  isCertified: boolean;
  description: string;
  supplyChainSteps: SupplyChainStep[];
};

function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [supplyChainSteps, setsupplyChainSteps] = useState<SupplyChainStep[] | null>(null);
  const { data: hash, writeContract } = useWriteContract();
  const { address } = useAccount();
  const { id } = useParams<{ id: string }>();

  const mockData: Product = {
    id: "1",
    name: "Organic Tomatoes",
    producer: "A123",
    price: "$5",
    carbonFootprint: "15 kg CO2",
    isCertified: true,
    description: "Fresh organic tomatoes grown sustainably.",
    supplyChainSteps: [
      {
        location: "Farm",
        timestamp: "1633024800",
        stepDescription: "Harvested at farm.",
        temperature: 22,
        humidity: 65,
      },
      {
        location: "Processing Plant",
        timestamp: "1633053600",
        stepDescription: "Processed and packaged.",
        temperature: 18,
        humidity: 70,
      },
      {
        location: "Warehouse",
        timestamp: "1633075200",
        stepDescription: "Stored in warehouse.",
        temperature: 12,
        humidity: 80,
      },
    ],
  };

  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_tokenId",
          type: "uint256",
        },
      ],
      name: "purchaseProduct",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;

  const handlePurchase = async () => {
    try {
      writeContract({
        address: contractAddress,
        abi,
        functionName: "purchaseProduct",
        args: [BigInt(id!)],
      });

      const estimatedFee = await OPStackCalculator.estimateTotalFee(
        "purchaseProduct",
        address!
      );
      toast.info(`Estimated fee for this transaction: ${estimatedFee}`);
      toast.info(`Tx Hash:${hash}`);
    } catch (err) {
      toast.error("An error occurred");
      console.trace(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await useReadContracts({
        contracts: [
          {
            ...afriContract,
            functionName: "getProduct",
            args: [id],
          },
        ],
      });

      const supplyChainResult = await useReadContracts({
        contracts: [
          {
            ...afriContract,
            functionName: "getSupplyChain",
            args: [id],
          },
        ],
      });

      if (result?.data && result?.data[0]?.status === "success") {
        setProduct(result?.data[0]?.result as Product);
      } else {
        setProduct(mockData);
      }

      if (supplyChainResult?.data && supplyChainResult?.data[0]?.status === "success") {
        setsupplyChainSteps(supplyChainResult?.data[0]?.result as SupplyChainStep[]);
      } else {
        setsupplyChainSteps(mockData.supplyChainSteps);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Details
      </Typography>
      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {product?.name}
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }}>
                Producer: {product?.producer}
              </Typography>
              <Typography color="textSecondary">
                Price: {product?.price}
              </Typography>
              <Typography color="textSecondary">
                Carbon Footprint: {product?.carbonFootprint}
              </Typography>
              <Typography color="textSecondary">
                Status: {product?.isCertified ? "Certified" : "Not Certified"}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, mt: { xs: 2, sm: 0 } }}>
              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                {product?.description}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              onClick={handlePurchase}
            >
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
        {supplyChainSteps?.map((step, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < supplyChainSteps.length - 1 && <TimelineConnector />}
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
