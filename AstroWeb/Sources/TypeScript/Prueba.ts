// Este archivo solo es de prueba y no se utiliza en la aplicación. 
// Si deseas utilizarlo, asegúrate de que el código esté correctamente implementado y no contenga errores, junto con su instalcion de typescript y su configuración.
// Puedes eliminar este comentario y el archivo si no es necesario.
//lq instalacion es la sigiente
// npm install -g typescript
// Para compilar el archivo, utiliza el siguiente comando en la terminal:
// tsc Prueba.ts
// una vez compilado el conecta el archivo .js generado en el html
// Para ejecutar el archivo, utiliza el siguiente comando en la terminal:


// This file is for testing purposes only and is not used in the application.
// If you want to use it, make sure the code is properly implemented and error-free, along with its TypeScript installation and configuration.
// You can delete this comment and the file if not needed.
// The installation is as follows:
// npm install -g typescript
// To compile the file, use the following command in the terminal:
// tsc Prueba.ts
// Once compiled, connect the generated .js file in the html
// To run the file, use the following command in the terminal:

//---------------------------------------------------------------------
//
//
//                      Prueba de TypeScript
//                      typeScript test
//                      
//
//----------------------------------------------------------------------




interface MensajeChat {
    id: number;
    texto: string;
    tipo: 'usuario' | 'asistente';
    timestamp: Date;
}

interface ConfiguracionChat {
    tema: 'claro' | 'oscuro';
    sonido: boolean;
    notificaciones: boolean;
}

const mensajes: MensajeChat[] = [
    {
        id: 1,
        texto: "¡Hola! ¿En qué puedo ayudarte?",
        tipo: "asistente",
        timestamp: new Date()
    },
    {
        id: 2,
        texto: "Necesito ayuda con mi código",
        tipo: "usuario",
        timestamp: new Date()
    }
];

const configuracion: ConfiguracionChat = {
    tema: "oscuro",
    sonido: true,
    notificaciones: true
};

function agregarMensaje(texto: string, tipo: 'usuario' | 'asistente'): void {
    const nuevoMensaje: MensajeChat = {
        id: mensajes.length + 1,
        texto,
        tipo,
        timestamp: new Date()
    };
    mensajes.push(nuevoMensaje);
}


