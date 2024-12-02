// seeds/task.seed.js
const Task = require('../models/task.model'); // Verifica que esta ruta sea correcta

async function crearTareas() {
  const tasks = [
    {
      title: "Programar una nueva funcionalidad en la app",
      description: "Implementar la funcionalidad de login con Google en la aplicación",
      status: "En Proceso",
    },
    {
      title: "Revisar código de la API",
      description: "Corregir errores en los endpoints de la API relacionados con la autenticación",
      status: "Pendiente",
    },
    {
      title: "Optimizar base de datos",
      description: "Realizar la optimización de las consultas SQL en la base de datos de producción",
      status: "Completada",
    },
    {
      title: "Rediseñar interfaz de usuario",
      description: "Actualizar la interfaz de usuario para hacerla más amigable y moderna",
      status: "En Proceso",
    },
    {
      title: "Escribir pruebas unitarias",
      description: "Escribir pruebas unitarias para el componente de pagos",
      status: "Pendiente",
    },
    {
      title: "Actualizar dependencias de Node.js",
      description: "Actualizar todas las dependencias de Node.js a sus versiones más recientes",
      status: "En Proceso",
    },
    {
      title: "Documentar endpoints de la API",
      description: "Escribir documentación detallada sobre los endpoints de la API",
      status: "Completada",
    },
    {
      title: "Implementar sistema de notificaciones",
      description: "Añadir notificaciones en tiempo real para los usuarios",
      status: "Pendiente",
    },
    {
      title: "Crear página de contacto",
      description: "Diseñar y desarrollar la página de contacto para el sitio web",
      status: "Completada",
    },
    {
      title: "Mejorar seguridad de la aplicación",
      description: "Añadir medidas de seguridad para proteger los datos sensibles",
      status: "En Proceso",
    },
    {
      title: "Desplegar nueva versión a producción",
      description: "Realizar el despliegue de la nueva versión de la aplicación en el servidor de producción",
      status: "Completada",
    },
    {
      title: "Refactorizar código de backend",
      description: "Refactorizar el código del backend para mejorar la mantenibilidad",
      status: "Pendiente",
    },
    {
      title: "Optimizar imágenes del sitio web",
      description: "Reducir el tamaño de las imágenes en el sitio web para mejorar el tiempo de carga",
      status: "En Proceso",
    },
    {
      title: "Realizar pruebas de carga",
      description: "Ejecutar pruebas de carga para evaluar el rendimiento de la aplicación",
      status: "Pendiente",
    },
    {
      title: "Revisar logs de errores",
      description: "Revisar los logs de errores del servidor y corregir los problemas encontrados",
      status: "Completada",
    },
    {
      title: "Configurar integración continua",
      description: "Configurar herramientas de integración continua para facilitar el despliegue automático",
      status: "En Proceso",
    },
    {
      title: "Crear informe de estado del proyecto",
      description: "Redactar un informe sobre el estado actual del proyecto y sus avances",
      status: "Completada",
    },
    {
      title: "Añadir funcionalidad de búsqueda",
      description: "Implementar una barra de búsqueda para los usuarios en el sitio web",
      status: "Pendiente",
    },
    {
      title: "Revisar funcionalidades de la app móvil",
      description: "Probar las funcionalidades de la aplicación móvil y corregir errores encontrados",
      status: "Completada",
    },
    {
      title: "Actualizar el sistema de gestión de usuarios",
      description: "Actualizar el sistema de gestión de usuarios para añadir nuevos permisos",
      status: "En Proceso",
    },
    {
      title: "Configurar entorno de desarrollo",
      description: "Configurar un entorno de desarrollo adecuado para el equipo de trabajo",
      status: "Pendiente",
    },
  ];

  try {
    // Borrar las tareas actuales (opcional)
    await Task.deleteMany({}); // Eliminar las tareas existentes en la base de datos
    // Insertar las tareas generadas
    await Task.insertMany(tasks);
    console.log('Tareas insertadas correctamente');
  } catch (error) {
    console.error('Error al insertar tareas:', error);
  }
}

module.exports = { crearTareas };
