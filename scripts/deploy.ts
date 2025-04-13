// scripts/deploy.ts
import { ethers, network } from "hardhat"; // Aggiungi network qui

async function main() {
  console.log("Iniziando il deploy del contratto TravelBooking...");

  // Deploy del contratto
  const TravelBooking = await ethers.getContractFactory("TravelBooking");
  const travelBooking = await TravelBooking.deploy();

  await travelBooking.waitForDeployment();
  const address = await travelBooking.getAddress();

  console.log(`TravelBooking deployato all'indirizzo: ${address}`);

  // Verifica che il contratto sia stato deployato correttamente
  console.log("Verificando il deploy...");
  
  // Attendi qualche blocco per sicurezza
  await travelBooking.waitForDeployment();
  
  console.log("Deploy completato e verificato!");
  console.log("--------------------");
  console.log("Riepilogo:");
  console.log("--------------------");
  console.log("Indirizzo del contratto:", address);
  console.log("Network:", network.name);
  console.log("--------------------");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
