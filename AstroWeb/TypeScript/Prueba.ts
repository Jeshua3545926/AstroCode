// Este archivo solo es de prueba y no se utiliza en la aplicación. 
// Si deseas utilizarlo, asegúrate de que el código esté correctamente implementado y no contenga errores, junto con su instalcion de typescript y su configuración.
// Puedes eliminar este comentario y el archivo si no es necesario.
//lq instalacion es la sigiente
// npm install -g typescript
// Para compilar el archivo, utiliza el siguiente comando en la terminal:
// tsc Prueba.ts
// una vez compilado el conecta el archivo .js generado en el html
// Para ejecutar el archivo, utiliza el siguiente comando en la terminal:
// node Prueba.js
// ! Recordatorio: Este archivo es solo un ejemplo y no se utiliza en la aplicación.
//Para mas informacion sobre Como usaremos typescript en el proyecto puedes consultar la siguiente documentacio en la carpeta:

const miEnlace = "/Update/Update.md";




// This file is for testing purposes only and is not used in the application.
// If you want to use it, make sure the code is properly implemented and error-free, along with its TypeScript installation and configuration.
// You can delete this comment and the file if not needed.
// The installation is as follows:
// npm install -g typescript
// To compile the file, use the following command in the terminal:
// tsc Prueba.ts
// Once compiled, connect the generated .js file in the html
// To run the file, use the following command in the terminal:
// node Prueba.js
//! Record: This file is just an example and is not used in the application.

//---------------------------------------------------------------------
//*
//* 
//*                         Prueba de TypeScript
//*                         typeScript test
//*                      
//*
//----------------------------------------------------------------------



// Enums para tipos y temas
enum TipoMensaje {
    USUARIO = 'usuario',
    ASISTENTE = 'asistente'
}

enum TemaChat {
    CLARO = 'claro',
    OSCURO = 'oscuro'
}

// Interfaces con documentación
/**
 * Representa un mensaje en el chat
 * @interface IMensajeChat
 */
interface IMensajeChat {
    readonly id: number;
    readonly texto: string;
    readonly tipo: TipoMensaje;
    readonly timestamp: Date;
}

/**
 * Configuración del chat
 * @interface IConfiguracionChat
 */
interface IConfiguracionChat {
    readonly tema: TemaChat;
    readonly sonido: boolean;
    readonly notificaciones: boolean;
}

// Clase para manejar el chat
class ChatManager {
    private static instance: ChatManager;
    private mensajes: IMensajeChat[] = [];
    private configuracion: IConfiguracionChat;

    private constructor() {
        this.configuracion = {
            tema: TemaChat.OSCURO,
            sonido: true,
            notificaciones: true
        };
    }

    public static getInstance(): ChatManager {
        if (!ChatManager.instance) {
            ChatManager.instance = new ChatManager();
        }
        return ChatManager.instance;
    }

    /**
     * Agrega un nuevo mensaje al chat
     * @param texto - Contenido del mensaje
     * @param tipo - Tipo de mensaje (usuario/asistente)
     * @returns El mensaje agregado
     */
    public agregarMensaje(texto: string, tipo: TipoMensaje): IMensajeChat {
        const nuevoMensaje: IMensajeChat = {
            id: this.mensajes.length + 1,
            texto,
            tipo,
            timestamp: new Date()
        };
        this.mensajes.push(nuevoMensaje);
        return nuevoMensaje;
    }

    /**
     * Obtiene todos los mensajes
     * @returns Array de mensajes
     */
    public getMensajes(): readonly IMensajeChat[] {
        return [...this.mensajes];
    }

    /**
     * Actualiza la configuración del chat
     * @param nuevaConfig - Nueva configuración
     */
    public actualizarConfiguracion(nuevaConfig: Partial<IConfiguracionChat>): void {
        this.configuracion = { ...this.configuracion, ...nuevaConfig };
    }

    /**
     * Obtiene la configuración actual
     * @returns Configuración actual
     */
    public getConfiguracion(): Readonly<IConfiguracionChat> {
        return { ...this.configuracion };
    }
}

// Ejemplo de uso
const chatManager = ChatManager.getInstance();
chatManager.agregarMensaje("¡Hola! ¿En qué puedo ayudarte?", TipoMensaje.ASISTENTE);
chatManager.agregarMensaje("Necesito ayuda con mi código", TipoMensaje.USUARIO);
