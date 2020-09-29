// Nodejs encryption with CTR
const crypto = require('crypto');
const secret ="secret";


module.exports = {
    encrypt: (text) => {
        const cipher = crypto.createCipher('aes192', secret);  
        var encrypted = cipher.update(text, 'utf8', 'hex');  
        encrypted += cipher.final('hex');
        return encrypted;
   },

   decrypt: (encryptedText) => {
    const decipher = crypto.createDecipher('aes192', secret);  
    var decrypted = decipher.update(encryptedText, 'hex', 'utf8');  
    decrypted += decipher.final('utf8'); 
    return decrypted; 
   }
};