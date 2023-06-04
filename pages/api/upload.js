import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import fs from 'fs';
import mime from 'mime-types';

const BUCKET_NAME = "lastdisco";

export default async function handle(req, res) {
    const form = new multiparty.Form();

    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) {
                reject(err);
            }
            resolve({fields, files});
        })
    });

    const client = new S3Client({
        region:   "ru-central1",
        endpoint: "https://storage.yandexcloud.net",
        credentials: {
            accessKeyId:     process.env.YC_ACESS_KEY,
            secretAccessKey: process.env.YC_SECRET_ACESS_KEY,
        }
    });

    const links = [];
    for(const file of files.file) {
        const extension   = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + extension;

        await client.send(new PutObjectCommand({
            Bucket:      BUCKET_NAME,
            Key:         newFilename,
            Body:        fs.readFileSync(file.path),
            ACL:         'public-read',
            ContentType: mime.lookup(file.path),
        }));

        const link = `https://storage.yandexcloud.net/${BUCKET_NAME}/${newFilename}`;
        links.push(link);
    }

    return res.json({links});
} 

export const config = {
    api: {bodyParser: false},
};