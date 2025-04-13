// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  try {
    // Get the contract factory
    const TravelBooking = await ethers.deployContract("TravelBooking");

    // Deploy the contract
    console.log("Deploying TravelBooking contract...");
    await TravelBooking.waitForDeployment();

    const address = await TravelBooking.getAddress();
    console.log("TravelBooking deployed to:", address);

    // Optional: Verify deployment with a test travel
    const tx = await TravelBooking.createTravel(
      "Test Travel",
      "A test travel package",
      ethers.parseEther("0.1"), // 0.1 ETH
      10 // max participants
    );
    await tx.wait();
    console.log("Test travel created!");

  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exit(1);
  }
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
