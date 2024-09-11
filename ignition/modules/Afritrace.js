const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("AfriTrace", (m) => {
 

  const lock = m.contract("AfriTrace", ["0xee150424a9936d09b01442c666627657d2780c6e","0xad83e7e17dc7B12FC6cAA0eD580Ea99Cf31A1d4F","0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE","0x9e1344a1247c8a1785d0a4681a27152bffdb43666ae5bf7d14d24a5efd44bf71"]);

  return { lock };
});
