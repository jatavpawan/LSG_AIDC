using System;

namespace FCSAmerica.Transact.Client.Models
{
    public class DraftImage
    {
        public int DraftFileRowId { get; set; }
        public byte[] FrontImage { get; set; }
        public byte[] BackImage { get; set; }
        public string FrontImageBase64 => Convert.ToBase64String(FrontImage);
        public string BackImageBase64 => Convert.ToBase64String(BackImage);
    }
}