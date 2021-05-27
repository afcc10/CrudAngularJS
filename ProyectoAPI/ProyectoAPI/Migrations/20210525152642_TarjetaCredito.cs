using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProyectoAPI.Migrations
{
    public partial class TarjetaCredito : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cedula",
                table: "TarjetaCredito");

            migrationBuilder.AddColumn<DateTime>(
                name: "Fecha",
                table: "TarjetaCredito",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Fecha",
                table: "TarjetaCredito");

            migrationBuilder.AddColumn<string>(
                name: "Cedula",
                table: "TarjetaCredito",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");
        }
    }
}
