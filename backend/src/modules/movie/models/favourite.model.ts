import mongoose, { Schema, Document } from 'mongoose';

export interface FavouriteDocument extends Document {
    user: mongoose.Types.ObjectId;
    movieId: string;
    title: string;
    year: string;
    type: string;
    poster: string;
    addedAt: Date;
}

const favouriteSchema = new Schema<FavouriteDocument>(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        movieId: { type: String, required: true, index: true }, // OMDB ID is a string, not ObjectId
        title: { type: String, required: true },
        year: { type: String },
        type: { type: String },
        poster: { type: String },
        addedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: false,
    }
);

// Compound index to prevent duplicates per user
favouriteSchema.index({ user: 1, movieId: 1 }, { unique: true });

export const FavouriteModel = mongoose.model<FavouriteDocument>('Favourite', favouriteSchema);
