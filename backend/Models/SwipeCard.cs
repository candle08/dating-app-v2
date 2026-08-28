namespace Models;

// A single swipeable card: the other user's public-facing info, plus their id
// so the frontend can attach a rating to the right person.
public class SwipeCard
{
    public int userId { get; set; }
    public string firstName { get; set; } = "";
    public string img { get; set; } = "";
}