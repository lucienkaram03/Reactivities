using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
       Task <PhotosUploadResult> AddPhoto(IFormFile file) { // uploading the file of photos to the cloudinary


       }
        Task<String> DeletePhoto(string PublicId); // deleting images from cloudinary using its id 
        
    }
}