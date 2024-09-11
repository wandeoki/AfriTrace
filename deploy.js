const { ethers } = require("hardhat");
const { utils } = require("ethers");

async function main() {
  console.log("Deploying AfriTrace contract system to Optimism Sepolia...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

//   const AfriTraceToken = await ethers.getContractFactory("AfriTraceToken");
//   const initialSupply = ethers.parseEther("1000000");
//   const afriTraceToken = await AfriTraceToken.deploy(initialSupply);
//   console.log(afriTraceToken)

  
//   console.log("AfriTraceToken deployed to:", afriTraceToken.target);

  const AfriTrace = await ethers.getContractFactory("AfriTrace");

  const paymentTokenAddress = "0xee150424a9936d09b01442c666627657d2780c6e";
  const priceFeedAddress = "0xad83e7e17dc7B12FC6cAA0eD580Ea99Cf31A1d4F";
  const vrfCoordinatorAddress = "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE";
  const keyHash = "0x9e1344a1247c8a1785d0a4681a27152bffdb43666ae5bf7d14d24a5efd44bf71";

  const afriTrace = await AfriTrace.deploy(
    paymentTokenAddress,
    priceFeedAddress,
    vrfCoordinatorAddress,
    keyHash
  );
  
  console.log("AfriTrace deployed to:", afriTrace);

  // Set up roles
  const VERIFIED_ROLE = await afriTrace.VERIFIED_ROLE();
  const CERTIFIER_ROLE = await afriTrace.CERTIFIER_ROLE();
  const ARBITER_ROLE = await afriTrace.ARBITER_ROLE();

  await afriTrace.grantRole(VERIFIED_ROLE, deployer.address);
  await afriTrace.grantRole(CERTIFIER_ROLE, deployer.address);
  await afriTrace.grantRole(ARBITER_ROLE, deployer.address);

  console.log("Roles granted to deployer");


  if (process.env.ETHERSCAN_API_KEY) {
    console.log("Verifying contracts on Etherscan...");
    await hre.run("verify:verify", {
      address: afriTraceToken.address,
      constructorArguments: [initialSupply],
    });
    await hre.run("verify:verify", {
      address: afriTrace.address,
      constructorArguments: [
        paymentTokenAddress,
        priceFeedAddress,
        vrfCoordinatorAddress,
        keyHash,
      ],
    });
  }

  console.log("Deployment and verification completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
