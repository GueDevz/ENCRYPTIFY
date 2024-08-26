# ENCRYPTIFY 

![Logo de Encryptify](assets/images/Logo-light.svg)  

## Sitio web

https://guedevz.github.io/ENCRYPTIFY  

## Descripción del Proyecto

**Encryptify** es una aplicación web diseñada para encriptar y desencriptar textos utilizando diferentes métodos de cifrado. La herramienta es útil para proteger información, ya que transforma el texto original en una versión cifrada que solo puede ser revertida utilizando la misma técnica de desencriptación.

El proyecto incluye una interfaz sencilla y fácil de usar donde los usuarios pueden seleccionar el método de encriptación deseado, ingresar el texto a cifrar, generar una contraseña para más protección (opcional) y obtener una versión encriptada del mismo. De manera similar, los usuarios pueden desencriptar un texto previamente cifrado utilizando el mismo método de cifrado.  

  
[![ENCRYPTIFY-2.png](https://i.postimg.cc/057pQX4t/ENCRYPTIFY-2.png)](https://postimg.cc/G9hBgKdY)


## Funcionalidades

- **Encriptación de Texto:** Los usuarios pueden encriptar texto ingresado utilizando diferentes algoritmos de cifrado.
- **Desencriptación de Texto:** El texto encriptado puede ser desencriptado de vuelta al texto original utilizando la clave y el método adecuados.
- **Generación de Contraseñas:** La aplicación permite generar una contraseña alfanumérica segura para agregar una capa adicional de seguridad al proceso de encriptación, siendo esta opcional.
- **Copiar y Pegar:** Soporte para copiar el texto encriptado y pegar texto desde el portapapeles.
- **Contador de Caracteres:** Muestra en tiempo real la cantidad de caracteres ingresados en el campo de texto, con un límite de 500 caracteres.
- **Restablecimiento de Campos:** Los campos de entrada y de contraseña se pueden restablecer fácilmente, y el texto desencriptado se puede borrar.

## Métodos de Encriptación

Encryptify soporta los siguientes métodos de encriptación:

- **Alura Encrypt:**
Este método transforma las vocales en palabras específicas para encriptar el texto.
Las conversiones son:

  a → ai

  e → enter

  i → imes

  o → ober

  u → ufat

  Desencriptación: El proceso inverso se aplica para revertir el texto encriptado a su forma original.

- **Cifrado César:**
Es un método clásico de encriptación que desplaza cada letra del alfabeto un número fijo de posiciones. En Encryptify, se utiliza un desplazamiento de 3 posiciones.
Ejemplo: hola se convierte en krod con un desplazamiento de 3.

  Desencriptación: Se aplica el desplazamiento inverso para obtener el texto original.

## Tecnologías Utilizadas

- **HTML5:** Para la estructura del contenido.
- **CSS3:** Para el diseño y estilo de la interfaz, incluyendo el uso de Flexbox y Grid.
- **JavaScript:** Para la lógica de encriptación, desencriptación, validación de contraseñas, generación de contraseñas y manejo de eventos en la interfaz.
- **Google Fonts:** Para la tipografía utilizada en la aplicación.
- **Boxicons:** Para los iconos que enriquecen la interfaz de usuario.

## Instalación

1. Clona este repositorio en tu máquina local:
```sh
git clone https://github.com/tu-usuario/encryptify.git
```
2. Navega al directorio del proyecto:
```
cd encryptify
```
3. Abre el archivo index.html en tu navegador preferido para comenzar a usar la aplicación.


## Uso
- **Encriptar Texto:**
    - Selecciona el método de encriptación.
    - Ingresa el texto en el campo correspondiente.
    - Opcional, puedes generar una contraseña que se utilizará como clave para desencriptar el texto.
    - Haz clic en "Encriptar".

- **Desencriptar Texto:** 
    - Ingresa la contraseña generada (si fue el caso) y haz clic en "Desencriptar" para ver el texto original.
