import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { env } from '@config/env';

@injectable()
export class DatabaseService {
    async connect(): Promise<void> {
        try {
            if (!env.MONGO_URI) {
                throw new Error('MONGO_URI is not defined in environment variables');
            }

            await mongoose.connect(env.MONGO_URI);
            console.log('Successfully connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}
