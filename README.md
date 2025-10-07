# STEELCORE 🧬

<div align="center">
  <img src="https://github.com/user-attachments/assets/4e925a73-55f4-4d88-b144-cd4df77d847f" alt="Página de inicio de SteelCore" width="800"/>
  
  **Discipline creates strength.** Transforma tu cuerpo y mente con programas de entrenamiento personalizados.
</div>

## ✅ Descripción del Proyecto

**SteelCore** es un sistema de **gestión de turnos (Citas)** enfocado en la industria del fitness, diseñado para facilitar la interacción entre usuarios/clientes y un *personal trainer*. Permite a los usuarios registrados **agendar, visualizar y cancelar** sus sesiones de entrenamiento de forma eficiente y controlada.

Este proyecto **Full-Stack** fue construido con un enfoque en la **seguridad de las rutas**, la **validación de datos** y el **tipado estricto (TypeScript)** para ofrecer una experiencia de usuario robusta y confiable.

---

## 📸 Vistas de la Aplicación

Una imagen vale más que mil palabras. Aquí tienes un vistazo de las funcionalidades clave del proyecto:

| Módulo | Descripción | Imagen |
| :--- | :--- | :--- |
| **Vista del Home** | Muestra las feautures de la empresa y algunas estadisticas. | <img src="https://github.com/user-attachments/assets/4e925a73-55f4-4d88-b144-cd4df77d847f" alt="Vista de Home" width="300"/>" |
| **Registro de Usuario** | Formulario simple para la creación de nuevas cuentas, con validación en el *frontend* y *backend*. | <img src="https://github.com/user-attachments/assets/8b379ca4-bbc6-41c3-a6bf-ab0733a3a980" alt="Vista de registro" width="300"/> |
| **Inicio de Sesión** | Acceso seguro a la plataforma. Las rutas de gestión de turnos están protegidas. | <img src="https://github.com/user-attachments/assets/6ad87053-9275-43f1-a51e-ad2972bfc201" alt="Vista de login" width="300"/> |
| **Página de Turnos** | Muestra el listado de citas agendadas por el usuario, indicando su estado (Activo o Cancelado). | <img src="https://github.com/user-attachments/assets/a39af48f-9c70-492f-8939-ed66ace609ab" alt="Vista de citas" width="300"/> |
| **Acerca de Nosotros** | Ejemplo de una ruta pública y estática, mostrando información del proyecto y del equipo. | <img src="https://github.com/user-attachments/assets/beb70c36-ee45-45b5-97f8-789ee8780dc2" alt="Vista de About Us" width="300"/> |

---

## 💻 Tecnologías Utilizadas

Este proyecto sigue una arquitectura **cliente-servidor (Full-Stack)**, utilizando:

| Área | Tecnología | Propósito Clave |
| :--- | :--- | :--- |
| **Frontend** | **React** (Vite), **React Router DOM**, **Formik**, **Axios** | Interfaz de usuario dinámica, enrutamiento, gestión de formularios y peticiones HTTP. |
| **Backend** | **Node.js** (Express), **TypeScript**, **TypeORM** | Servidor API RESTful, lógica de negocio robusta y tipado estricto. |
| **Base de Datos** | **PostgreSQL** (`pg`) | Almacenamiento persistente y relacional de usuarios y turnos. |
| **Herramientas** | **SweetAlert2**, **React Icons** | Notificaciones interactivas e iconografía. |

---

## 🎯 Características Clave (Funcionalidades)

* **Autenticación Segura (Login/Registro):** Implementación de rutas privadas que requieren que el usuario esté **registrado y autenticado** para acceder a la gestión de turnos.
* **Gestión de Turnos Personalizada:**
    * **Agendar Citas:** Programación en **intervalos de 30 minutos**.
    * **Restricción Horaria:** Validación estricta que solo permite agendar turnos de **Lunes a Viernes** entre las **9:00 AM y 17:30 PM**.
    * **Visualización de Turnos:** Cada usuario puede ver sus turnos con su respectivo **estado (Activo/Cancelado)**.
    * **Cancelación Controlada:** Los usuarios pueden **cancelar un turno hasta 24 horas antes** de la hora programada, aplicando lógica de negocio.
* **Rutas Dinámicas:** Uso de `react-router-dom` para una navegación fluida y manejo de rutas protegidas.

---

## ⚙️ Feautures (Habilidades Demostradas)

* **Arquitectura y Código Limpio (Backend):** Uso de **TypeScript** y **TypeORM** para implementar un API RESTful bien estructurado, que garantiza el **tipado estricto** y la **separación de responsabilidades** (Routers, Controllers, Middlewares).
* **Validación de Datos Completa (Middleware):** Implementación de **Middlewares** dedicados (`validateUser`, `validateAppointment`, etc.) en Express para **sanear y validar** los datos de entrada antes de la lógica de negocio, asegurando la integridad de los datos y la seguridad.
* **Persistencia y Modelado de Datos:** Modelado de las entidades de `User` y `Appointment` en **PostgreSQL**, utilizando TypeORM como ORM para una gestión eficiente y orientada a objetos de la base de datos.
* **Gestión de Estado y Formulario (Frontend):** Manejo eficiente de la lógica de formularios y la validación a través de la librería **Formik**, mejorando la experiencia del usuario y la robustez de la aplicación.
* **Seguridad de Rutas:** La lógica de enrutamiento y la autenticación implementada aseguran que las **rutas sensibles** solo sean accesibles para usuarios logueados.

---

## 🛠️ Instalación y Uso

Sigue estos pasos para levantar el proyecto localmente.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tiagoisi/gestor-turnos
cd gestor-turnos
```

### 2. Configuración del Backend (Server)

1. Moverse a la carpeta del servidor:
    ```bash
    cd back
    ```
2. Instalar dependencias:
    ```bash
    npm install
    ```
3. **Configuración de `.env`:** Crear un archivo `.env` en la raíz del *back* con las credenciales de tu base de datos **PostgreSQL**:
    ```
    # Ejemplo de .env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=[TU USUARIO DE POSTGRES]
    DB_PASSWORD=[TU CONTRASEÑA DE POSTGRES]
    DB_DATABASE=steelcore_db
    
    ```
4. Ejecutar el servidor (compila TypeScript y ejecuta el Node.js):
    ```bash
    npm run build:start 
    # O para desarrollo: npm run dev
    ```

### 3. Configuración del Frontend (Client)

1. Moverse a la carpeta del cliente:
    ```bash
    cd ../front
    ```
2. Instalar dependencias:
    ```bash
    npm install
    ```
3. Iniciar la aplicación:
    ```bash
    npm run dev
    ```
La aplicación estará disponible en `http://localhost:[PUERTO VITE, generalmente 5173]`.

---

## 👤 Autor

* **Tiago Isidro** - Desarrollador Full-Stack
* **https://www.linkedin.com/in/tiago-isidro/**
* **tiagoisidromadoery123@gmail.com**
