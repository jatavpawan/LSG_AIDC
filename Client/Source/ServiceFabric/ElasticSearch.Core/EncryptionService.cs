using System;
using System.IO;
using System.Security.Cryptography;

namespace EnterpriseSearch.Core
{
    public class EncryptionService
    {
        // TODO: Put random keys for each environment into the config files.
        // Alternately: can we pull these based on a certificate on the server?
        private byte[] IV = Convert.FromBase64String("oRRj0Ew1YhajggErIkvqvg==");
        private byte[] Key = Convert.FromBase64String("kH6w6B+koWwavk2K0XfTLvnkYKUqcHjuIBayZ4ylRg0=");

        public string Encrypt(string value)
        {
            var rijAlg = Rijndael.Create();
            rijAlg.Key = Key;
            rijAlg.IV = IV;

            var encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);
            var msEncrypt = new MemoryStream();
            var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write);
            var swEncrypt = new StreamWriter(csEncrypt);

            swEncrypt.Write(value);

            return Convert.ToBase64String(msEncrypt.ToArray());
        }

        public string Decrypt(string value)
        {
            var provider = new RijndaelManaged();

            var bytesToDecrypt = Convert.FromBase64String(value);
            var decryptor = provider.CreateDecryptor(Key, IV);

            var memoryStream = new MemoryStream(bytesToDecrypt);
            var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
            var streamReader = new StreamReader(cryptoStream);

            var plainText = streamReader.ReadToEnd();
            return plainText;
        }
    }
}
