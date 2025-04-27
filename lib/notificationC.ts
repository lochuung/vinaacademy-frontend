import { NotificationCreateDTO } from '@/types/notification-type';
import crypto from 'crypto';

export type SignatureProp = {
    timeStamp: string,
    secretKey: string,
    notiCreate: NotificationCreateDTO
    
}

export function createSignature({notiCreate, timeStamp, secretKey}: SignatureProp) {
  const data = `${JSON.stringify(notiCreate)}${timeStamp}${secretKey}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}