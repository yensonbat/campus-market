import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Despliega el contrato CampusMarket
 *
 * @param hre objeto HardhatRuntimeEnvironment
 */
const deployCampusMarket: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CampusMarket", {
    from: deployer,
    // args es una lista vacía [] porque nuestro contrato no tiene constructor
    args: [],
    log: true,
    // autoMine hace que en la red local la transacción se confirme al instante
    autoMine: true,
  });

  console.log("🚀 Contrato CampusMarket desplegado con éxito!");
};

export default deployCampusMarket;

// Etiqueta para identificar el contrato en los scripts
deployCampusMarket.tags = ["CampusMarket"];
