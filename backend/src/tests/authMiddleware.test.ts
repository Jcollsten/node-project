import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

describe('JWT Tests', () => {
  it('should verify a valid token', () => {
    const validToken = jwt.sign({ id: '123', role: 'Admin' }, JWT_SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(validToken, JWT_SECRET);
    expect(decoded).toBeTruthy();
  });

  it('should throw an error for an invalid token', () => {
    const validToken = jwt.sign({ id: '123', role: 'Admin' }, JWT_SECRET, { expiresIn: '1h' });
    expect(() => jwt.verify(validToken, 'wrong-secret')).toThrow();
  });

  it('should throw an error for an expired token', () => {
    const expiredToken = jwt.sign({ id: '123', role: 'Admin' }, JWT_SECRET, { expiresIn: '-1s' });
    expect(() => jwt.verify(expiredToken, JWT_SECRET)).toThrow();
  });
});
