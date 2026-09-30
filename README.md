# Medical Center - TPI

## Breve descripción de lo implementado
Este proyecto es un panel administrativo web interactivo y responsivo para el ecosistema médico (Medical Center). El desarrollo incluyó la maquetación completa de las interfaces de Inicio de Sesión y Dashboard principal, unificando la paleta de colores, tipografía y estilos visuales en base a los mockups de diseño.

A nivel funcional, se implementó un módulo completo para la **Gestión de Especialidades**. Las características principales incluyen:
* **Persistencia de Datos del lado del cliente:** Almacenamiento, lectura y actualización de datos utilizando `localStorage`.
* **Identificadores Únicos:** Generación de IDs inequívocos para cada especialidad mediante `crypto.randomUUID()`.
* **Altas con Validación:** Un formulario de creación (`specialty.html`) que aplica validaciones estrictas en tiempo real (límites de caracteres) antes de permitir el guardado.
* **Listado Dinámico y Búsqueda:** Una tabla de visualización (`specialties.html`) renderizada dinámicamente desde el almacenamiento local, que incluye badges visuales de estado (Activo/Inactivo) y un buscador integrado que filtra los resultados en la interfaz de forma instantánea y sin recargar la página.

## Integrantes del Grupo
* Gutierrez Maia - 60348
* Ibarra Mauro - 60698
* Escalante Daniel - 60554
* Ruiz Lisandro - 58399

## Instrucciones para correr el proyecto localmente
1. Clonar este repositorio en tu máquina local.
2. Abrir la carpeta del proyecto en un editor de código (como Visual Studio Code).
3. Instalar la extensión **Live Server** en VS Code.
4. Hacer clic derecho sobre el archivo `login.html` (o `dashboard.html`) y seleccionar **"Open with Live Server"**.
5. El proyecto se abrirá automáticamente en tu navegador predeterminado y reflejará los cambios en tiempo real.
