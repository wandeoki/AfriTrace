import { createPublicClient, http } from 'viem';
import { optimismSepolia } from 'viem/chains';
import { publicActionsL2 } from 'viem/op-stack';
import { contractAddress, afriTraceABI } from './constant';

const client = createPublicClient({
  chain: optimismSepolia,
  transport: http(),
}).extend(publicActionsL2());

class OPStackCalculator {
  static async estimateTotalFee(functionName: string, account: `0x${string}`) {
    const fee = await client.estimateContractTotalFee({
      address: contractAddress,
      abi: afriTraceABI,
      functionName,
      account,
    });

    return fee;
  }
  
 
  async estimateGas(functionName: string, account: `0x${string}`): Promise<bigint> {
    const gas = await client.estimateContractTotalGas({
      address: contractAddress,
      abi: afriTraceABI,
      functionName,
      account,
    } );
    return gas;
  }


}

export default OPStackCalculator;
