import { DailyTotalFee } from "./interfaces/FeeInterfaces";
import { SUBGRAPH_URL } from "./config";
import axios from "axios";

export const getDailyTotalFee = async (): Promise<DailyTotalFee[]> => {
	const query = `
    {
        dailyTotalFees(first: 365, orderBy: id, orderDirection: desc) {
            id
            totalFee0
            totalFee1
            firstSwapTimestamp
        }
    }
    `;

	let dailyTotalFees: DailyTotalFee[] = [];
	try {
		const response = await axios.post(SUBGRAPH_URL, {
			query: query,
		});

		if (response.data.errors) {
			throw new Error(`GraphQL Error: ${response.data?.errors}`);
		}

		dailyTotalFees = response.data.data.dailyTotalFees;
	} catch (error) {
		console.error("Query error:", error);
	}

	return dailyTotalFees;
}