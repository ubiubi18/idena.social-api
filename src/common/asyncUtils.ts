
export type NodeDetails = { idenaNodeUrl: string, idenaNodeApiKey: string };
export const getRpcClient = (nodeDetails: NodeDetails) => async (method: string, params: any[]) => {
    try {
        const response = await fetch(nodeDetails.idenaNodeUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'method': method,
                'params': params,
                'id': 1,
                'key': nodeDetails.idenaNodeApiKey
            }),
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error: unknown) {
        console.error(error);
        return {};
    }
};
export type RpcClient = ReturnType<typeof getRpcClient>;
