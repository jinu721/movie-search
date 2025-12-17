import Redis from 'ioredis';
import { injectable } from 'inversify';
import { env } from '@config/env';

@injectable()
export class RedisService {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            username: env.REDIS_USERNAME,
            password: env.REDIS_PASSWORD,
            host: env.REDIS_HOST,
            port: parseInt(env.REDIS_PORT),
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        this.client.on('connect', () => {
            console.log('Redis Client Connected');
        });
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (ttlSeconds) {
            await this.client.set(key, value, 'EX', ttlSeconds);
        } else {
            await this.client.set(key, value);
        }
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
