# uni-fee-subgraph

Subgraph for The Graph (AssemblyScript) that counts swap fees of the Uniswap V2
USDC/WETH pair on Ethereum mainnet. It indexes the `Swap` event from block
19508355, stores every swap and adds 0.3% of the input amount to a per-day total.
Days are UTC dates.

## Entities

- `Swap` - one entity per event: `sender`, `to`, `amount0In`, `amount1In`,
  `amount0Out`, `amount1Out`, `blockNumber`, `blockTimestamp`, `transactionHash`.
- `DailyTotalFee` - `id` (the date), `totalFee0`, `totalFee1`, `firstSwapTimestamp`.

`totalFee0` is in USDC base units (6 decimals), `totalFee1` in wei of WETH
(18 decimals). A swap adds its fee to the token that was sent in.

## Build
```
npm install
npm run codegen
npm run build
```

## Deploy

Subgraph Studio (name `uni-fee-calculating`):
```
npx graph auth <deploy key>
npm run deploy
```

Local graph-node (needs an Ethereum node on port 8545):
```
docker-compose up
npm run create-local
npm run deploy-local
```

## Query
```graphql
{ dailyTotalFees(first: 7, orderBy: id, orderDirection: desc) { id totalFee0 totalFee1 } }
```

## Client
`client/` is a TypeScript script that reads `DailyTotalFee` from the subgraph,
takes the ETH price from the Chainlink ETH/USD oracle and the pool reserves via
ethers, and prints fees in USD and pool APR (for the whole period and for the
last day).

After deploying, put your own query URL into `SUBGRAPH_URL` in
`client/src/config.ts`. Then:

```
cd client
npm install
cp .env.example .env   # set PROVIDER_URL, an Ethereum mainnet RPC URL
npm start
```
