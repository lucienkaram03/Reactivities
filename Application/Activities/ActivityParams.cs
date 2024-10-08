using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;

namespace Application.Activities
{
    public class ActivityParams : PagingParams  //specified for filtering
    {
        public bool isGoing { get ;set ; }
        public bool isHost {get ; set ;}

        public DateTime StartDate {get ; set ;} = DateTime.UtcNow; //filtering by date
    }
}