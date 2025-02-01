import { getEthPriceFromOracle } from "./helpers";

const fetchDailyTotalFees = async () => {
	const ethPrice = await getEthPriceFromOracle();

	console.log(`ETH price: ${ethPrice}`);
}

fetchDailyTotalFees();
