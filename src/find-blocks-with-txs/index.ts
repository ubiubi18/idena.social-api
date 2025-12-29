import { getBlockCounter, getBlockTransaction } from "../common/dbUtils.ts";

export const handler = async (event: any, context: any) => {
    const { queryStringParameters } = event;

    const inputBlockNumber = parseInt(queryStringParameters.blockNumber);

    if (!Number.isFinite(inputBlockNumber)) {
        return { statusCode: 400, body: 'invalid blockNumber' };
    }

    let blockNumber = queryStringParameters?.blockNumber ? parseInt(queryStringParameters.blockNumber) : (await getBlockCounter())!.last_captured;

    const blocksWithTxs = [];

    for (let index = 0; index < 100; index++) {
        const { previous_block_with_txs: previousBlockWithTxs, transactions } = await getBlockTransaction(blockNumber);

        if (index === 0 && transactions?.size) {
            blocksWithTxs.push(blockNumber);
        }

        if (previousBlockWithTxs === 0) {
            break;
        }

        blocksWithTxs.push(previousBlockWithTxs);
        blockNumber = previousBlockWithTxs;
    };

    return { statusCode: 200, body: JSON.stringify(blocksWithTxs) };
};
