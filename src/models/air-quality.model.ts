import mongoose, { Schema, Document } from 'mongoose';

export interface IParisAirQuality extends Document {
  aqiUS: number;             
  mainUS: string;    
  aqiCN: number;              
  mainCN: string;    
 
}

const ParisAirQualitySchema = new Schema<IParisAirQuality>({
  aqiUS: { type: Number, required: true },
  mainUS: { type: String, required: true },
  aqiCN: { type: Number, required: true },
  mainCN: { type: String, required: true },
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

export default mongoose.model<IParisAirQuality>('ParisAirQuality', ParisAirQualitySchema);
