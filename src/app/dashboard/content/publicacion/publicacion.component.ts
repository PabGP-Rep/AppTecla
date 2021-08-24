import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  @Input() publicacion: any;
  @Input() idPerfil: any;
  //urlImagen = '../../../assets/img/profile-picture.png';
  //urlImagen: string;

  canDelete = false;
  token = JSON.parse(localStorage.getItem('UsuarioRed'))[1].token;
  idUsuario = JSON.parse(localStorage.getItem('UsuarioRed'))[0].usuario.id;
  idUsuarioP: string;
  id: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  imagenUsuario: string;
  contenido: string;
  fecha: string;
  amistad: boolean;

  
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    //console.log("Estas publicaciones estan en el perfil de id:"+this.idPerfil);
    
    this.idUsuarioP = this.publicacion.Usuario.id;
    this.id = this.publicacion.id;
    this.nombreUsuario = this.publicacion.Usuario.nombre;
    this.apellidoUsuario = this.publicacion.Usuario.apellido;
    this.imagenUsuario = this.publicacion.Usuario.imagen;
    this.contenido = this.publicacion.contenido;
    this.amistad = false;
    this.fecha = this.publicacion.fecha;
    this.fecha = this.fecha.split('T')[0];

    if (this.idUsuarioP == this.idUsuario || this.idUsuario == this.idPerfil ) {
      this.canDelete = true;
    } 
    
  }

  attemptDelete(): void{        
    //Logica    
    this.usuarioService.deletePost(this.id, this.token).subscribe(
      data =>{  
        console.log(data);        
      },
      (error)=>{
        console.log(error);
        alert(error.error.error);
      }
    );
    
    console.log("Intente Borrar el post con id "+this.id);
    window.location.reload();
    //this.getUserPosts();
    
  }

}
