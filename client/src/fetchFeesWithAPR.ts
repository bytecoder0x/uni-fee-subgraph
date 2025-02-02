import { getAPR, getEthPriceFromOracle, getFormattedTotalFeeInUSD, getTVL, log } from "./helpers";
import { getDailyTotalFee } from "./getDailyFees";

const fetchDailyTotalFees = async () => {
	const startTimestamp = Date.now();

	const dailyTotalFees = await getDailyTotalFee();

	const ethPrice = await getEthPriceFromOracle();

	const TVL = await getTVL(ethPrice);

	const { formattedDailyTotalFees, formattedTotalFeeInUSD } = getFormattedTotalFeeInUSD(dailyTotalFees, ethPrice);

	const APR = getAPR(formattedTotalFeeInUSD, TVL, formattedDailyTotalFees.length);
	const APRBasedOnLastDay = getAPR(formattedDailyTotalFees[0].totalFeeInUSD, TVL, 1);

	const totalDays = formattedDailyTotalFees.length;
	const endTimestamp = Date.now();

	log.info(`Earnings in USD: ${formattedTotalFeeInUSD}$ for ${totalDays} days with TVL: ${TVL}$`);
	log.info(`Current APR: ${APR}% based on ${totalDays} days`);
	log.info(`Current APR based on last day: ${APRBasedOnLastDay}%`);
	log.info(`Spend time: ${((endTimestamp - startTimestamp) / 1000).toFixed(2)} seconds`);
}

fetchDailyTotalFees();
