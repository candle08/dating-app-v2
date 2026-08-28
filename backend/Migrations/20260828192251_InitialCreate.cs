using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace dating_app_v2.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    raterId = table.Column<int>(type: "integer", nullable: false),
                    rateeId = table.Column<int>(type: "integer", nullable: false),
                    value = table.Column<int>(type: "integer", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    username = table.Column<string>(type: "text", nullable: false),
                    firstname = table.Column<string>(type: "text", nullable: false),
                    lastname = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false),
                    createdAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UserProfile",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    userId = table.Column<int>(type: "integer", nullable: false),
                    preferredFirstname = table.Column<string>(type: "text", nullable: true),
                    img = table.Column<string>(type: "text", nullable: true),
                    age = table.Column<int>(type: "integer", nullable: true),
                    ageLowerBound = table.Column<int>(type: "integer", nullable: true),
                    ageUpperBound = table.Column<int>(type: "integer", nullable: true),
                    maxDistance = table.Column<int>(type: "integer", nullable: false),
                    typeRelationship = table.Column<string>(type: "text", nullable: true),
                    kids = table.Column<string>(type: "text", nullable: true),
                    humor = table.Column<string>(type: "text", nullable: true),
                    shows = table.Column<string>(type: "text", nullable: true),
                    books = table.Column<string>(type: "text", nullable: true),
                    hobbies = table.Column<string>(type: "text", nullable: true),
                    funNight = table.Column<string>(type: "text", nullable: true),
                    petPeeve = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfile", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Rating_raterId_rateeId",
                table: "Rating",
                columns: new[] { "raterId", "rateeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_username",
                table: "User",
                column: "username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserProfile_userId",
                table: "UserProfile",
                column: "userId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropTable(
                name: "UserProfile");
        }
    }
}
