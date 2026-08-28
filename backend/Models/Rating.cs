namespace Models;

public class Rating
{
    public int id { get; set; }
    public int raterId { get; set; }
    public int rateeId { get; set; }
    public int value { get; set; }
    public DateTime createdAt { get; set; }
}
