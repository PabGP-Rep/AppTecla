import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  email = '';
  pass = '';
  errorMessage = '';

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem('UsuarioRed');
    if (usuario) {
      this.router.navigate(['/main']);      
    }else{
      console.log("Logeate primero");     
    }
  }

  attemptLogin(): void{
    //Logica    
    this.usuarioService.loginUsuario(this.email, this.pass).subscribe(
      data =>{  
        localStorage.setItem('UsuarioRed',JSON.stringify(data));
        //Redireccion
        this.router.navigate(['/main']);
      },
      (error)=>{
        if(error.error.error){
          this.errorMessage = error.error.error;
        }else{
          console.log(error.error);
          this.errorMessage = error.error;
        }  
      }
    );
  }
  



}
