using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProyectoAPI.Models
{
    public class Cliente
    {
        [Key]
        public string Cedula { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Nombres { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Apellidos { get; set; }

        public virtual ICollection<TarjetaCredito> TarjetasCredito { get; set; }        
    }
}
