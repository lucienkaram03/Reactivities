using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Rendering;
using Microsoft.AspNetCore.Hosting;

namespace Application.Core
{
    public class PagingParams //what the client can enter
    {
        private const int MaxPageSize = 50 ; // max page size .

        public int pageNumber {get ; set ;} = 1 ;

        private int _pageSize= 2 ; 

        public  int PageSize 
        {
            get => _pageSize ; // getting the default page size 10 if he doesnt enter a page size
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value ; 
        }
    }
}