// import crypto from 'crypto';

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
// const IV_LENGTH = 16;

// export function encrypt(text: string): string {
//   if (!ENCRYPTION_KEY) {
//     console.error('ENCRYPTION_KEY is not defined');
//     throw new Error('ENCRYPTION_KEY is not defined in the environment variables');
//   }
//   console.log('Encrypting text:', text); // Log the input text
//   const iv = crypto.randomBytes(IV_LENGTH);
//   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
//   let encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
//   const result = iv.toString('hex') + ':' + encrypted.toString('hex');
//   console.log('Encrypted text:', result); // Log the encrypted result
//   return result;
// }

// export function decrypt(text: string): string {
//   const textParts = text.split(':');
//   const iv = Buffer.from(textParts[0], 'hex');
//   const encryptedText = Buffer.from(textParts[1], 'hex');
//   if (!ENCRYPTION_KEY) {
//     throw new Error('ENCRYPTION_KEY is not defined in the environment variables');
//   }
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
//   let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
//   return decrypted.toString();
// }
