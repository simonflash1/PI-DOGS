import React from 'react'
import "./Footer.css"

export const Footer = () => {
    return (
        <div className="footer-container">
            
            <div className="footer-center">
                <h3>Información de Contacto</h3>
                
                <p>Teléfono: +54 381 617 1063</p>
                <p>Correo Electrónico: nestor.emmanuel.lizarraga@gmail.com</p>
            </div>
            <div className="footer-right">
                <h3>Seguime en Redes Sociales</h3>
                <ul>
                    <li><a href="https://www.facebook.com/simonflash">Facebook</a></li>
                    <li><a href="https://www.linkedin.com/in/emmalizar/">Linkedin</a></li>
                    <li><a href="https://www.instagram.com/emma.lizar/">Instagram</a></li>
                </ul>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Pagina creada por Nestor Emmanuel Lizarraga. Todos los derechos reservados.</p>
            </div>
        </div>
    )
}
