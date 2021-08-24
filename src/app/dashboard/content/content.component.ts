import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  loading = true;
  ownProfile = false;
  isFriend = false;
  id: number;

  //Datos de usuario
  listPosts: any [] = [];
  listFriendships: any [] = [];
  token = JSON.parse(localStorage.getItem('UsuarioRed'))[1].token; 
  idUsuario = JSON.parse(localStorage.getItem('UsuarioRed'))[0].usuario.id;
  urlImagen = '../../../assets/img/profile-picture.png';
  nombre = '';
  foto = '';
  ciudad = '';
  pais = '';
  edad = '';
  estudios = '';
  idiomas = '';
  linkedin = '';
  hobbies = '';

  //Para postear
  contenidoP: string;
  idPostear: string;
  fechaHoy: Date;

  constructor(private usuarioService: UsuarioService, private aRoute: ActivatedRoute) { 
    this.id = +this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {        
    if (this.id == 0) {
      console.log("ES MI PERFIL"); 
      this.id = this.idUsuario;      
    }

    if (this.id == this.idUsuario) {
      this.ownProfile = true;      
    }else{
      this.ownProfile = false;
    }
    
    this.getUserData();
    this.idPostear = this.id.toString();
    this.fechaHoy = new Date();
    this.getUserPosts();
    this.getUserFriendships();
  }

  public async getUserData(){
    await this.usuarioService.getUsuarioById(this.id, this.token).subscribe(
      data =>{    
        let usuario = data;
        //this.idUsuario = usuario.id;
        this.nombre = usuario.nombre +" "+ usuario.apellido;
        this.pais = usuario.pais;
        this.ciudad = usuario.ciudad;
        if (usuario.imagen) {
          this.urlImagen = usuario.imagen;   
        }
        this.edad = usuario.edad;
        this.estudios = usuario.estudios;
        this.idiomas = usuario.idiomas;    
        this.linkedin = usuario.linkedin;
        this.hobbies = usuario.hobbies;    
      } 
    );
  }

  public async getUserPosts(){
    await this.usuarioService.getPosts(this.idPostear,this.token).subscribe(
      data =>{               
        this.listPosts = data;
        console.log("Las Publicaciones de: "+this.idPostear);
        console.log(this.listPosts);
      } 
    );
  }

  public async getUserFriendships(){
    await this.usuarioService.getFriendships(this.idUsuario, this.token).subscribe(
      data =>{        
        this.listFriendships = data;
        console.log("Las amistades de: "+this.idUsuario);
        console.log(this.listFriendships);
        if (!this.ownProfile) {
          this.verifyFriendship(this.idPostear);          
        }            
        this.loading = false;       
      } 
    );
  }

  verifyFriendship(idAmigo): void{    
    //Logica
    for (let index = 0; index < this.listFriendships.length; index++) {
      const element = this.listFriendships[index];
      //console.log("Yo "+this.idUsuario+" Amigo "+idAmigo);      
      //console.log(element.idUsuarioA +" y "+element.idUsuarioB);
      
      if ((element.idUsuarioA == this.idUsuario && element.idUsuarioB == idAmigo)
      || (element.idUsuarioA == idAmigo && element.idUsuarioB == this.idUsuario)) {
        if (element.estatus == 1) {
          this.isFriend = true;
          return console.log(idAmigo+" Si es amigo");          
        }         
      }      
    }
    return console.log(idAmigo+" No es amigo");             
  }



  attemptPost(): void{    
    //Logica    
    this.usuarioService.createPost(this.idPostear, this.idUsuario, this.contenidoP, this.fechaHoy, this.token).subscribe(
      data =>{  
        console.log(data);
        this.contenidoP = '';        
        this.getUserPosts();
      },
      (error)=>{
        console.log(error);
        alert(error.error.error);
        window.location.reload();
      }
    );        
  }

}
