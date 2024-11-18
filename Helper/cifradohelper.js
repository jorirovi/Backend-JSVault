import crypto  from 'crypto'
import  dotenv  from 'dotenv'

dotenv.config()

const KEY = 'e3e69f01fa1fe97a4ab22b7e2c184b43'
const IV_LENGTH = 16

class CifradoHelper {
    static encryptString(plainText) {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(KEY), iv);
        
        let encrypted = cipher.update(plainText, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        
        return iv.toString('base64') + ':' + encrypted;
    }

    static decryptString(cipherText) {
        const textParts = cipherText.split(':');
        const iv = Buffer.from(textParts.shift(), 'base64');
        const encryptedText = textParts.join(':');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(KEY), iv);
        
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}

export default CifradoHelper