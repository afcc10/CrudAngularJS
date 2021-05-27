using Microsoft.EntityFrameworkCore.Migrations;

namespace ProyectoAPI.Migrations
{
    public partial class Segundo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Cedula = table.Column<string>(nullable: false),
                    Nombres = table.Column<string>(type: "varchar(50)", nullable: false),
                    Apellidos = table.Column<string>(type: "varchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cliente", x => x.Cedula);
                });

            migrationBuilder.CreateTable(
                name: "TarjetaCredito",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titular = table.Column<string>(type: "varchar(100)", nullable: false),
                    NumeroTarjeta = table.Column<string>(type: "varchar(16)", nullable: false),
                    FechaExpiracion = table.Column<string>(type: "varchar(5)", nullable: false),
                    CVV = table.Column<string>(type: "varchar(3)", nullable: false),
                    Estado = table.Column<short>(type: "smallint", nullable: false),
                    Cedula = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClienteCedula = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TarjetaCredito", x => x.id);
                    table.ForeignKey(
                        name: "FK_TarjetaCredito_Cliente_ClienteCedula",
                        column: x => x.ClienteCedula,
                        principalTable: "Cliente",
                        principalColumn: "Cedula",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TarjetaCredito_ClienteCedula",
                table: "TarjetaCredito",
                column: "ClienteCedula");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TarjetaCredito");

            migrationBuilder.DropTable(
                name: "Cliente");
        }
    }
}
