import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-amistad',
  templateUrl: './amistad.component.html',
  styleUrls: ['./amistad.component.css']
})
export class AmistadComponent implements OnInit {
  @Input() amistad: any;
  @Input() aceptados: any;

  token = JSON.parse(localStorage.getItem('UsuarioRed'))[1].token;
  idUsuario = JSON.parse(localStorage.getItem('UsuarioRed'))[0].usuario.id;
  idAmistad: number;
  nombreAmigo: string;
  apellidoAmigo: string;
  imagenAmigo:string;
  idAmigo:number;
  estatus:number;
  emisor = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    if (this.idUsuario == this.amistad.idUsuarioB) {
      this.nombreAmigo = this.amistad.amigoA.nombre;
      this.apellidoAmigo = this.amistad.amigoA.apellido;
      this.imagenAmigo = this.amistad.amigoA.imagen;
      this.idAmigo = this.amistad.amigoA.id;
      this.emisor = true;
    }else{
      this.nombreAmigo = this.amistad.amigoB.nombre;
      this.apellidoAmigo = this.amistad.amigoB.apellido;
      this.imagenAmigo = this.amistad.amigoB.imagen;
      this.idAmigo = this.amistad.amigoB.id;
      this.emisor = false;
    }    
    this.estatus = this.amistad.estatus;
    this.idAmistad = this.amistad.id;
  }

  actualizarAmistad(estatus): void{
    //Logica    
    this.usuarioService.updateFriendship(this.idAmistad, estatus, this.token).subscribe(
      data =>{
        console.log(data);
        window.location.reload();      
      },
      (error)=>{
        console.log(error);
        alert(error.error.error);
      }
    );
  }


}
