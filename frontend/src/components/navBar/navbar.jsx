import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import { setTokenReact, setLogout } from '../../actions/login'
import ENUM from '../../Util/enums';
import util from '../../Util/util';
import cadeado from '../../images/iconeCadeado.png'

export default function Navbar({ usuarioAutenticado }) {
   const tokenReact = useSelector(state => state.loginReducer.tokenReact);
   const usuarioData = useSelector(state => state.loginReducer.usuario);
   const idEvento = useSelector(state => state.loginReducer.idEvento);
   const urlBasica = `/auth/${idEvento}/${tokenReact}`;
   const dispatch = useDispatch();

   const fazerLogout = () => {
      dispatch(setLogout());
   }

   const chamarAutenticacaoSpotify = () => {
      try {
         let tokenReact = util.generateRandomString(16);
         dispatch(setTokenReact(tokenReact))
         const AUTH_URL_WITH_TOKEN = `${ENUM.enderecosIP.SERVICO_API_SPOTIFY}/login/${tokenReact}`;
         window.location.href = AUTH_URL_WITH_TOKEN;
      } catch (error) {
         console.log('Erro de rede');
      }
   };

   const componenteUsuarioLogado = () => {
      return (
         <div className='componente-usuario ctn-profile'>
            <img className="profile-pic" src={usuarioData._fotoPerfil} alt="Foto de Perfil" />
            <p className='d-inline'>Olá, {usuarioData._nome.split(" ")[0]}</p>
            <div className="ctn-user-options">
               <ul style={{width:'95%', margin:'auto'}}>
                  <li >
                     <NavLink to={`/login`} onClick={fazerLogout}>Sair</NavLink>
                  </li>
               </ul>
               <div className="seta-para-baixo"></div>
            </div>
         </div>
      );
   }

   const componenteUsuarioDeslogado = () => {
      return (
         <div className="componente-usuario ctn-usuario-deslogado">
            <p className='' onClick={chamarAutenticacaoSpotify}>
               Entre ou cadastre-se
            </p>
         </div>
      );
   }

   function renderAuthLink(texto, to) {
      return (
         <li>
            <NavLink to={to} className='link-navbar auth'> {texto}</NavLink>
         </li>
      );
   }

   function renderNotAuthLink(texto) {
      return (
         <li>
            <div style={{ display: "flex", alignItems: "center" }}>
               <span className='link-navbar'> {texto} </span>
               <img src={cadeado} alt="" style={{ width: '16px', marginLeft: '7px' }} />
            </div>
         </li>
      )
   }

   return (
      <nav id='navbar' className="ctn-navbar p-3 sticky-top">
         <div className='row align-items-center px-4'>
            <div className='col-2 ctn-logo '>
               <img src={logo} alt="Logo" style={{ width: '170px' }} />
            </div>
            <div className='col-7'>
               <ul className='ctn-list'>
                  {usuarioAutenticado ? renderAuthLink("Top Globais", `${urlBasica}/top-globais`)  : renderAuthLink("Top Globais", `/login`)}
                  {usuarioAutenticado ? renderAuthLink("Home", `${urlBasica}/home`) : renderNotAuthLink("Home")}
                  {usuarioAutenticado ? renderAuthLink("Publicar um Tweezer", `${urlBasica}/criar-post`) : renderNotAuthLink("Publicar um Tweezer")}
                  {usuarioAutenticado ? renderAuthLink("Meus dados", `${urlBasica}/perfil`) : renderNotAuthLink("Meus dados")}
               </ul>
            </div>
            <div className='col ms-5'>
               {usuarioAutenticado ? componenteUsuarioLogado() : componenteUsuarioDeslogado()}
            </div>
         </div>
      </nav>
   );
}
