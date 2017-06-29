using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;

namespace FCSAmerica.Transact.Client.UI.Infrastructure
{
    public class JwtSecurityTokenHandlerWrapper : JwtSecurityTokenHandler
    {
        public JwtSecurityTokenHandlerWrapper(Dictionary<string, string> inboundClaimTypeMap = null)
        {
            if (inboundClaimTypeMap != null)
            {
                InboundClaimTypeMap = inboundClaimTypeMap;
            }
        }

        public override SecurityToken ReadToken(string jwtEncodedString)
        {
            // unbase64 header if necessary
            if (IsBase64Encoded(jwtEncodedString))
            {
                jwtEncodedString = DecodeBase64(jwtEncodedString);
            }

            if (jwtEncodedString.StartsWith("<"))
            {
                return base.ReadToken(new XmlTextReader(new StringReader(jwtEncodedString)));
            }

            return base.ReadToken(jwtEncodedString);
        }

        private static bool IsBase64Encoded(string token)
        {
            token = token.Trim();
            return (token.Length % 4 == 0) && Regex.IsMatch(token, @"^[a-zA-Z0-9+/]*={0,3}$", RegexOptions.None);
        }

        private static string DecodeBase64(string token)
        {
            var encoding = Encoding.GetEncoding("iso-8859-1");
            var decodedToken = encoding.GetString(Convert.FromBase64String(token));
            return decodedToken;
        }
    }
}
