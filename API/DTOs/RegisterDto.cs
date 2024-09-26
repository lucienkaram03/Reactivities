

using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto // class responsible if the sign up
    {
        // we are validating the registration of the user with validation error
[Required]
         public string DisplayName {get; set;}
         [Required]
         [EmailAddress] // obligation of being a type of email address
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a\\a-z])(?=.*[A\\A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
       public string Password { get; set; }

       [Required]
       public string Username {get ; set;}
    }
}