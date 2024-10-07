using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class HttpExtensions //creating a pagination header to really expose to the client the real form of the pagination
    {
        public static void AddPaginationHeader (this HttpResponse response , int CurrentPage , 
        int itemsPerPage, int totalItems , int TotalPages)
        {
            var paginationHeader = new 
            {
                CurrentPage,
                itemsPerPage,
                totalItems,
                TotalPages
            };
            response.Headers.Append("Pagination" , JsonSerializer.Serialize(paginationHeader)) ; //turning it into json data
            response.Headers.Append("Access-Control-Expose-Headers","Pagination" ) ; //turning it into json data
        } 
    }
}