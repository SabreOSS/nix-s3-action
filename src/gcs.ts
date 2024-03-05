import { Storage } from '@google-cloud/storage';
import { createHmacKey } from './hmac';

export async function downloadFolderFromGCS(projectId: string, bucketName: string, folderPath: string, localPath: string) {
    const hmacKey = createHmacKey();

    const storage = new Storage({
        projectId: projectId,
        credentials: {
            client_email: 'gh-core@sabre.com',
            private_key: hmacKey,
        },
    });
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix: folderPath });

    await Promise.all(files.map(async (file) => {
        const localFilePath = `${localPath}/${file.name}`;
        await file.download({ destination: localFilePath });
    }));
}
