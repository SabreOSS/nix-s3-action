import crypto from 'crypto';

export function createHmacKey() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    // @ts-ignore
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY.replace(/\\n/g, '\n')

    // @ts-ignore
    const hmac = crypto.createHmac('sha256', secretAccessKey);
    // @ts-ignore
    return hmac.update(accessKeyId).digest('hex');
}
