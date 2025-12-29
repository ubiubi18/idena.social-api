export const handler = async (event: any, context: any) => {
    try {
        const res = await fetch('https://restricted.idena.io', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'method': 'bcn_lastBlock',
                'params': [],
                'id': 1,
                'key': 'idena-restricted-node-key'
            }),
        });
        console.info('status', res.status);

        return { statusCode: res.status, body: JSON.stringify(await res.json()) };
    }
    catch (e) {
        console.error(e);
        return 500;
    }
};
