using System;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Web.Http;
using FCSAmerica.Transact.Client.UI.Infrastructure;

namespace FCSAmerica.Transact.Client.UI
{
    [Authorize]
    [ServiceRequestActionFilter]
    public class HomeController : ApiController
    {
        // GET api/values 
        public string Get()
        {
            var claimsIdentity = Thread.CurrentPrincipal.Identity as ClaimsIdentity;
            AddCustomClaims(claimsIdentity);

            return claimsIdentity.Name;
        }

        private void AddCustomClaims(ClaimsIdentity claimsIdentity)
        {
            var userKey = claimsIdentity.Claims.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
            var claimsMapperUrl = GetClaimsMapperUrl("MCGRUFF", userKey);
            var customClaimsTokenText = GetCustomClaimsTokenText(claimsMapperUrl);
            var customClaimsToken = CreateFromJwt(customClaimsTokenText);
            claimsIdentity.AddClaims(customClaimsToken.Claims);
        }

        private string GetCustomClaimsTokenText(string claimsMapperUrl)
        {
            string customClaimsTokenText;
            using (var webClient = new WebClient())
            {
                webClient.Headers["Authorization"] = "SAML PEFzc2VydGlvbiBJRD0iX2FkOGRkNjc3LTEwNDAtNDEzYS1hNTU5LTRiNjYxNmVlNjYwMSIgSXNzdWVJbnN0YW50PSIyMDE3LTAzLTAzVDE4OjUwOjI4LjM4NloiIFZlcnNpb249IjIuMCIgeG1sbnM9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPjxJc3N1ZXI+aHR0cHM6Ly90ZXN0c3RzLmZjc2FtZXJpY2EubmV0LzwvSXNzdWVyPjxTaWduYXR1cmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxTaWduZWRJbmZvPjxDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIiAvPjxTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2IiAvPjxSZWZlcmVuY2UgVVJJPSIjX2FkOGRkNjc3LTEwNDAtNDEzYS1hNTU5LTRiNjYxNmVlNjYwMSI+PFRyYW5zZm9ybXM+PFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIiAvPjxUcmFuc2Zvcm0gQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiIC8+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGVuYyNzaGEyNTYiIC8+PERpZ2VzdFZhbHVlPjBOcVUxaVdlTzBuV2wrTGVrVjYwcU53cDAzbXNBd0oyQkFyZmNOUXEzQmM9PC9EaWdlc3RWYWx1ZT48L1JlZmVyZW5jZT48L1NpZ25lZEluZm8+PFNpZ25hdHVyZVZhbHVlPkZIczJQMlNnZ3o5aHB6TC9mK2doY0FJcVpCOHVkOVQrWmt0RE1rQUcrdlB3d01qVG1DTHlBQ2l2SnVvWWw5R0VHL1hEUzc5U1MyVEpCSER4eWZ2QjRtUUVCM2JseWI5MFdYZExWdGhVOVQ0cXV3OUxqZlVMcnVOaWZLRjZzSHpZVEJsOW1FTEpTY0hPTHJHaVo2WHE3TS9QbTZ4UVRYWG5oZHNjTkdCYVlnZmNsRVVZNlZ6aTM5d0RYL1NLZUd1bHRZSWlJem9JTVEzVUhrOHlKMXdqL0JobmducE8ydkFBNGkyY05GU04zZlhRWndsWGtUeVp5SmlCVzl4MVVVRjlOQ0MyZ2FMMFhoMnovRWZxUXhLUlgvN0ZJb3haMjZ6d1dGU3A5cFV5NExCQXI5SHBsWnk2Vy90NWhSbjM3dGZFNFJGNnBBUGhiY05icU4vQ1Y4K1Q2QT09PC9TaWduYXR1cmVWYWx1ZT48S2V5SW5mbz48WDUwOURhdGE+PFg1MDlDZXJ0aWZpY2F0ZT5NSUlIR1RDQ0JnR2dBd0lCQWdJS0hBYzUrQUFCQUFBQzNUQU5CZ2txaGtpRzl3MEJBUVVGQURCTE1STXdFUVlLQ1pJbWlaUHlMR1FCR1JZRFkyOXRNUm93R0FZS0NaSW1pWlB5TEdRQkdSWUtabU56WVcxbGNtbGpZVEVZTUJZR0ExVUVBeE1QWm1OellXMWxjbWxqWVMxeWIyOTBNQjRYRFRFME1ETXlOekl5TVRNeE1Gb1hEVEU0TURjeU16RTRNakkwT0Zvd2dZOHhDekFKQmdOVkJBWVRBbFZUTVFzd0NRWURWUVFJRXdKT1JURU9NQXdHQTFVRUJ4TUZUMjFoYUdFeEtEQW1CZ05WQkFvVEgwWmhjbTBnUTNKbFpHbDBJRk5sY25acFkyVnpJRzltSUVGdFpYSnBZMkV4SERBYUJnTlZCQXNURTFSbFkyaHViMnh2WjNrZ1UyVnlkbWxqWlhNeEd6QVpCZ05WQkFNVEVrWkRVMEZUYVdkdWFXNW5RMlZ5ZEVSbGRqQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQU1BdlJwTEV2Y2piUHU2SVBpYmdLM3BXTm51eDgxSkhkQjZ6L1J0K05PZEtNUVZ6cmlYZDJaL05DbzgzWW9BdkU3VEdYQWZLNlpPVlhLTkJ3L2JxUk9waVRzS1hyT0lmdUpGK3NaeVBqbnJqb3gzcVp1azZMamlzS2lhbDViVTB6RkVmN2t4NzZtOWR0SU5acmdlUU14d25Td2NleWJxTHp5QmtjS2lxMFZaZ29mVHRTOE1pcHd1UVF5K0dvME9JazFJZXZONHNTZ1hpT1VXbXNnbm1OM0dRbHd3ZG1WdmlqbFVJMWtGd0tERHJzYjluTi9pWWhNemxFNWx2andrMzJoekZkci9TdDBhQVByVFBrTjFEUisyNE5FYTRxTkxyTnBmRXZDQWRvbnpYd1FnbUk5NXpua3ZRNGJNb3dxR2hBbi83bWJyckR6WU5zeEtibHFvbGU2c0NBd0VBQWFPQ0E3Z3dnZ08wTUFzR0ExVWREd1FFQXdJRjREQW5CZ05WSFNVRUlEQWVCZ2dyQmdFRkJRY0RBZ1lJS3dZQkJRVUhBd0VHQ0NzR0FRVUZCd01ETUhnR0NTcUdTSWIzRFFFSkR3UnJNR2t3RGdZSUtvWklodmNOQXdJQ0FnQ0FNQTRHQ0NxR1NJYjNEUU1FQWdJQWdEQUxCZ2xnaGtnQlpRTUVBU293Q3dZSllJWklBV1VEQkFFdE1Bc0dDV0NHU0FGbEF3UUJBakFMQmdsZ2hrZ0JaUU1FQVFVd0J3WUZLdzREQWdjd0NnWUlLb1pJaHZjTkF3Y3dIUVlEVlIwT0JCWUVGQXNpVzZrSzliQU5pT3NNUkdPNHYrY3dUV2V0TUI4R0ExVWRJd1FZTUJhQUZLVDhWR3RoMDFlSEU1ZnZMcGxXenBVcjFuNHpNSUlCR1FZRFZSMGZCSUlCRURDQ0FRd3dnZ0VJb0lJQkJLQ0NBUUNHZ2J4c1pHRndPaTh2TDBOT1BXWmpjMkZ0WlhKcFkyRXRjbTl2ZEN4RFRqMXZiV0Z1WlhNeE1ESXdMRU5PUFVORVVDeERUajFRZFdKc2FXTWxNakJMWlhrbE1qQlRaWEoyYVdObGN5eERUajFUWlhKMmFXTmxjeXhEVGoxRGIyNW1hV2QxY21GMGFXOXVMRVJEUFdaamMyRnRaWEpwWTJFc1JFTTlZMjl0UDJObGNuUnBabWxqWVhSbFVtVjJiMk5oZEdsdmJreHBjM1EvWW1GelpUOXZZbXBsWTNSRGJHRnpjejFqVWt4RWFYTjBjbWxpZFhScGIyNVFiMmx1ZElZL2FIUjBjRG92TDI5dFlXNWxjekV3TWpBdVptTnpZVzFsY21sallTNWpiMjB2UTJWeWRFVnVjbTlzYkM5bVkzTmhiV1Z5YVdOaExYSnZiM1F1WTNKc01JSUJNQVlJS3dZQkJRVUhBUUVFZ2dFaU1JSUJIakNCc1FZSUt3WUJCUVVITUFLR2dhUnNaR0Z3T2k4dkwwTk9QV1pqYzJGdFpYSnBZMkV0Y205dmRDeERUajFCU1VFc1EwNDlVSFZpYkdsakpUSXdTMlY1SlRJd1UyVnlkbWxqWlhNc1EwNDlVMlZ5ZG1salpYTXNRMDQ5UTI5dVptbG5kWEpoZEdsdmJpeEVRejFtWTNOaGJXVnlhV05oTEVSRFBXTnZiVDlqUVVObGNuUnBabWxqWVhSbFAySmhjMlUvYjJKcVpXTjBRMnhoYzNNOVkyVnlkR2xtYVdOaGRHbHZia0YxZEdodmNtbDBlVEJvQmdnckJnRUZCUWN3QW9aY2FIUjBjRG92TDI5dFlXNWxjekV3TWpBdVptTnpZVzFsY21sallTNWpiMjB2UTJWeWRFVnVjbTlzYkM5dmJXRnVaWE14TURJd0xtWmpjMkZ0WlhKcFkyRXVZMjl0WDJaamMyRnRaWEpwWTJFdGNtOXZkQ2d4S1M1amNuUXdQQVlKS3dZQkJBR0NOeFVIQkM4d0xRWWxLd1lCQkFHQ054VUlzSm9MZ3JpZ2NvWDFqd09IbjVzcmhxK1piMXFFajlja2g5eTRhUUlCWlFJQkJEQXpCZ2tyQmdFRUFZSTNGUW9FSmpBa01Bb0dDQ3NHQVFVRkJ3TUNNQW9HQ0NzR0FRVUZCd01CTUFvR0NDc0dBUVVGQndNRE1BMEdDU3FHU0liM0RRRUJCUVVBQTRJQkFRQjdlOHFVRzRCdWU5ai9FUjBJSTBLMWlyWEFDVmVyMUszV0xxenIvMVBSN1NLS01nY2VocEZva0cxOC9KYVByMHM4V0RBczRpQ2RWNy9Lc0o0bHNGZ1hGdFR1OUJ2QjNXc1ZjUm0wLzl4c2Fnd0F1Tnc1bjdNbUorTGNiMzZaTkdDeU13WVZubVpzdGZBT2NDT3lMd2NldldZakh0cW5uNThhMmYrRkFYVUwxVStwN3dwOVN4dzFneXllN0gydTQvVFpNTWhwNU0rckpPemZzdnJNY21wdFdwaVJPK21pRWxUWmdVeEdBeVJZdTBrQ2t1RjRaT3EzSmpHYWNMZEhScXRQUzllVkRDVDA1SHBsbFJ3alhhUHc0Vm5vNk4wY2FMejRlWG53V0lPckdhUlZEMmlDTUl6K2tlMmwxdmRGc2ZSVnl4T01jQmUzZUl4Q3UyYld4WHVtPC9YNTA5Q2VydGlmaWNhdGU+PC9YNTA5RGF0YT48L0tleUluZm8+PC9TaWduYXR1cmU+PFN1YmplY3Q+PFN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIiAvPjwvU3ViamVjdD48Q29uZGl0aW9ucyBOb3RCZWZvcmU9IjIwMTctMDMtMDNUMTg6NTA6MjguMzcwWiIgTm90T25PckFmdGVyPSIyMDE3LTAzLTA0VDA0OjUwOjI4LjM3MFoiPjxBdWRpZW5jZVJlc3RyaWN0aW9uPjxBdWRpZW5jZT50ZXN0ZmNzYS5mY3NhbWVyaWNhLm5ldDpNY0dydWZmQWRtPC9BdWRpZW5jZT48L0F1ZGllbmNlUmVzdHJpY3Rpb24+PC9Db25kaXRpb25zPjxBdHRyaWJ1dGVTdGF0ZW1lbnQ+PEF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiIGE6T3JpZ2luYWxJc3N1ZXI9ImZjbWEuY29tIiB4bWxuczphPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcyI+PEF0dHJpYnV0ZVZhbHVlPlRlcnJpbGwuRWR3YXJkc0BmY3NhbWVyaWNhLmNvbTwvQXR0cmlidXRlVmFsdWU+PC9BdHRyaWJ1dGU+PEF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIiBhOk9yaWdpbmFsSXNzdWVyPSJmY21hLmNvbSIgeG1sbnM6YT0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwOS8wOS9pZGVudGl0eS9jbGFpbXMiPjxBdHRyaWJ1dGVWYWx1ZT5GQ1NBTUVSSUNBXEVkd2FyZHNUPC9BdHRyaWJ1dGVWYWx1ZT48L0F0dHJpYnV0ZT48QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLmZjc2FtZXJpY2EuY29tL2NsYWltcy9QYXJ0bmVyQXBwcy9hdWRpZW5jZXVyaSI+PEF0dHJpYnV0ZVZhbHVlPnRlc3RmY3NhLmZjc2FtZXJpY2EubmV0Ok1jR3J1ZmZBZG08L0F0dHJpYnV0ZVZhbHVlPjwvQXR0cmlidXRlPjxBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL2lkZW50aXR5c2VydmVyLnRoaW5rdGVjdHVyZS5jb20vY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiPjxBdHRyaWJ1dGVWYWx1ZT5mY21hLmNvbTwvQXR0cmlidXRlVmFsdWU+PC9BdHRyaWJ1dGU+PC9BdHRyaWJ1dGVTdGF0ZW1lbnQ+PC9Bc3NlcnRpb24+";
                webClient.Headers["FCSA-Audit"] = "eyJTaWduYXR1cmUiOiJEWHZvYWhjb0JYNkQ3c3hYQVRJYXlXaTMzMms1dEpIVjg1QWYwZGNXTFd3RENyazQ1VEJVNHhDcWNkRFFyL1pzWDc2L3JhM29nQnZZSzNYeGZvTFI0eHQvZkZzVFB3Qk80cGZCWTlxR1Myckk0TUtyc0xNZDd2UWxZK1V1N3Y2dDdINGtxdSs4a2pkZE1BWGY0anByemtsaGxiR3lvOUlnTEp0Tkd6cHNWblNRWVhYclJZSytaYlY4T0hWTjJ2S3dMUTArRGFGWkt1ZHdGeVh5Z2NlSG1aNXNxeUllQXJ3aDcyUWNwYy9xeXhEU04xNktmNWZ5cUZZUTFkdmhSWGtycEhiZlFONS9ielVkQ0UwSlBqU1g2am5ydTdqbmkrYzh4UloyTzZ4QW1WbFU4Q3VPRFZxMCtaOGZmMmUrdjVwcmlyL3g4WS8rTS9EZHVBTEtkVUN2ZUE9PSIsIlNpZ25lZERhdGEiOnsiUGFydG5lck5hbWUiOiJGQ1NBIiwiVXNlcktleSI6IlRlcnJpbGwuRWR3YXJkc0BmY3NhbWVyaWNhLmNvbSIsIkVtYWlsQWRkcmVzcyI6IlRlcnJpbGwuRWR3YXJkc0BmY3NhbWVyaWNhLmNvbSIsIkFwcGxpY2F0aW9uIjoiTWNHcnVmZkFkbSIsIkZpcnN0TmFtZSI6IlRlcnJpbGwiLCJMYXN0TmFtZSI6IkVkd2FyZHMiLCJJbWFnZVVybCI6Imh0dHBzOi8vaG9tZS5mY3NhbWVyaWNhLmNvbS9lbXBsb3llZWltYWdlcy9FbXBsb3llZUltYWdlc18xMzNfMTAwL0Vkd2FyZHNULmpwZyIsIkNyZWF0ZWRCeSI6IlRlcnJpbGwuRWR3YXJkc0BmY3NhbWVyaWNhLmNvbSJ9LCJVbnNpZ25lZERhdGEiOnsiU2Vzc2lvbklkIjo2NzEyNzE3NzcsIlJlcXVlc3RJZCI6IjA0ZWU4NzM0LWQyZWMtNGNmMy05NzI1LWZlMzBkOWI4YTZhNiIsIkRhdGVUaW1lQ3JlYXRlZCI6IjIwMTctMDMtMDNUMTI6NTA6MjguMzgyNDg0Ni0wNjowMCJ9fQ==";
                customClaimsTokenText = webClient.DownloadString(claimsMapperUrl);
            }
            return customClaimsTokenText;
        }

        private string GetClaimsMapperUrl(string applicationName, string userKey)
        {
            var escapedUserKey = Uri.EscapeDataString(userKey);
            var base64UserKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(escapedUserKey));
            var results = $"https://testfcsa.fcsamerica.net/McGruff/v2/rest/api/claims/testinternal.fcsamerica.net/{applicationName}/claim/{base64UserKey}";
            return results;
        }

        private JwtSecurityToken CreateFromJwt(string tokenInfo)
        {
            var worker = new JwtSecurityTokenHandlerWrapper();
            tokenInfo = tokenInfo.Trim('"');

            var token = worker.ReadToken(tokenInfo) as JwtSecurityToken;

            return token;
        }

        // GET api/values/5 
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values 
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5 
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5 
        public void Delete(int id)
        {
        }


    }
}
