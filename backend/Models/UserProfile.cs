namespace Models;

public class UserProfile
{
    public int id { get; set; }
    public int userId { get; set; }
    public string? preferredFirstname { get; set; }
    public string? img { get; set; }
    public int? age { get; set; }
    public int? ageLowerBound { get; set; }
    public int? ageUpperBound { get; set; }
    public int maxDistance { get; set; }
    public string? typeRelationship { get; set; }
    public string? kids { get; set; }
    public string? humor { get; set; }
    public string? shows { get; set; }
    public string? books { get; set; }
    public string? hobbies { get; set; }
    public string? funNight { get; set; }
    public string? petPeeve { get; set; }
}
