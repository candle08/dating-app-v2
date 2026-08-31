namespace Models;

// A rating the current user gave, joined with who they rated - used on the dashboard.
public class RatedUserView
{
    public int userId { get; set; }
    public string firstname { get; set; } = "";
    public string lastname { get; set; } = "";
    public string? img { get; set; }
    public int value { get; set; }
    public DateTime createdAt { get; set; }
}

// A confirmed match - both sides rated each other the same value.
public class MatchView
{
    public int userId { get; set; }
    public string firstname { get; set; } = "";
    public string lastname { get; set; } = "";
    public string? img { get; set; }
    public int value { get; set; }
}
