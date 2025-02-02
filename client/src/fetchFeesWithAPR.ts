import { getEthPriceFromOracle, getTVL } from "./helpers";

const fetchDailyTotalFees = async () => {
	const ethPrice = await getEthPriceFromOracle();

	const TVL = await getTVL(ethPrice);

	console.log(`ETH price: ${ethPrice}`);
	console.log(`TVL: ${TVL}$`);
}

fetchDailyTotalFees();
