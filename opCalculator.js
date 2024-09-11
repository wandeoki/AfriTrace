const { ethers } = require("ethers");
const {afriTraceABI} = require("./constant")

class OPStackCalculator {
  constructor(provider) {
    this.provider = provider;

    this.gasOracleAddress = "0x420000000000000000000000000000000000000F"; 
    this.gasOracleABI = [
      "function scalar() public view returns (uint256)",
      "function overhead() public view returns (uint256)"
    ];

    this.gasOracle = new ethers.Contract(this.gasOracleAddress, this.gasOracleABI, provider);
  }

  async estimateL1Fee(data) {
    const l1BaseFee = await this.getL1BaseFee();
    const overhead = await this.getOverhead();
    const scalar = await this.getScalar();

    const l1GasUsed = overhead + ethers.utils.arrayify(data).length * 16;
    const l1Fee = l1BaseFee * l1GasUsed * scalar / 1000000;

    return ethers.BigNumber.from(l1Fee);
  }

  async estimateL2Fee(to, data, value) {
    const gasPrice = await this.provider.getGasPrice();
    const gasLimit = await this.provider.estimateGas({
      to,
      data,
      value,
    });

    return gasPrice.mul(gasLimit);
  }

  async estimateTotalFee(to, data, value) {
    const l1Fee = await this.estimateL1Fee(data);
    const l2Fee = await this.estimateL2Fee(to, data, value);

    return l1Fee.add(l2Fee);
  }

  async getL1BaseFee() {
   
    const block = await this.provider.getBlock("latest");
    return block.baseFeePerGas;  
  }

  async getOverhead() {
   
    const overhead = await this.gasOracle.overhead();
    return overhead.toNumber();  
  }

  async getScalar() {
  
    const scalar = await this.gasOracle.scalar();
    return scalar.toNumber(); 
  }
}


export async function estimateAfriTraceCreationFee(afriTraceAddress, name, description, ipfsHash, price, carbonFootprint) {
  const provider = new ethers.providers.JsonRpcProvider(process.env.API_URL);
  const calculator = new OPStackCalculator(provider);

  const afriTrace = new ethers.Contract(afriTraceAddress, afriTraceABI, provider);
  const data = afriTrace.interface.encodeFunctionData("createProduct", [name, description, ipfsHash, price, carbonFootprint]);

  const totalFee = await calculator.estimateTotalFee(afriTraceAddress, data, 0);
  console.log(`Estimated total fee for creating a product: ${ethers.utils.formatEther(totalFee)} ETH`);
  return ethers.formatEther(totalFee)
}
