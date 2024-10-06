using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IEnumerable<T> items , int count , int pageNumber , int pageSize)
        {
            CurrentPage = pageNumber ;
            TotalPages = (int)Math.Ceiling(count / (double)PageSize) ;
            PageSize = pageSize ;
            TotalCount = count ;
            AddRange(items) ;
        }

        public int CurrentPage {get ; set ;}

        public int TotalPages {get ; set ;} //total numb of pages

        public int PageSize {get ; set ;} //size of the total bage

        public int TotalCount {get ; set ;} //NUMBER OF ITEMS of activities


        //mehod to create list of pages (A book)

        public static async Task<PagedList<T>> CreatePagedListASync(IQueryable<T> source , int pageNumber , int pageSize)
        {
            var count = await source.CountAsync() ; //getting the numb of the items before any pagination happens,but this is a query from the database
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count , pageNumber, pageSize) ; //returning our list 
        }

       
    }
}