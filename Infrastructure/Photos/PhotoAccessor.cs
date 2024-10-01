using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary ;

        public PhotoAccessor (IOptions<CloudinarySettings> config) 
{ // we will create a cloudinary account 
            var account = new Account ( //adding the necessaru configuration to start the logic
                config.Value.Cloudname,
                config.Value.APIKey,
                config.Value.APISecret

            );
            _cloudinary = new Cloudinary(account) ;



        }


                public async Task<PhotosUploadResult> AddPhoto(IFormFile file) //uploading a file to Cloudinary
        {
            if (file.Length > 0 ) 
{
    await using var stream = file.OpenReadStream() ;
    var uploadParams = new ImageUploadParams { //what are we really uploading to the cloudinary
        File = new FileDescription(file.FileName , stream), 
        Transformation = new Transformation().Height(500).Width(500).Crop("fill")


    };

    var uploadResult = await _cloudinary.UploadAsync(uploadParams); //uploading our results to the cloudinary

    if(uploadResult.Error !=null) {

         throw new Exception(uploadResult.Error.Message);

    }
    return new PhotosUploadResult{

        PublicId = uploadResult.PublicId,
        Url = uploadResult.SecureUrl.ToString(),
    };
}
return null;
        }

        public async Task<string> DeletePhoto(string publicId) //deleting an image from Cloudinary
        { var deletParams = new DeletionParams(publicId); 
        var result = await _cloudinary.DestroyAsync(deletParams); // deleting the photo that we want
        return result.Result == "ok" ? result.Result : null ;
            
    }
}
}