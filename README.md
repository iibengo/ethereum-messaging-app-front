# DApp de Chat basada en Contrato Inteligente de Ethereum

Esta aplicación es un chat descentralizado basado en un contrato inteligente de Ethereum. Permite a los usuarios comunicarse a través de un chat en tiempo real utilizando Vue.js y MetaMask. El contrato inteligente utilizado es "PublicMessageContract".

## Demo

Puedes acceder a una demostración de la aplicación [aquí](https://public-msg-contract-vue-74565c0bbf81.herokuapp.com/home).
![Demostración demo Dapp](public/demo.gif)

## Características principales

- Menú principal: Navega por las diferentes secciones de la aplicación.
- Componente de chat: Muestra los mensajes del chat y permite a los usuarios enviar nuevos mensajes.
- Diálogo de creación de usuario: Permite a los usuarios crear un nuevo usuario para utilizar en el chat.

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes componentes:

- MetaMask: Una extensión de navegador que proporciona una billetera de Ethereum y permite interactuar con contratos inteligentes.
- Node.js: Entorno de ejecución de JavaScript para el desarrollo de aplicaciones.

## Configuración

Sigue estos pasos para configurar y ejecutar la aplicación:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/ionilancer/ethereum-messaging-app-front.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd ethereum-messaging-app-front
   ```

3. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

4. Inicia la aplicación:

   ```bash
   npm run serve
   ```

5. Abre tu navegador web y accede a la siguiente URL:

   ```
   http://localhost:8080
   ```

## Contrato PublicMessage

Para actualizar la dirección por defecto del [contrato](https://github.com/ionilancer/ethereum-messaging-app-back) en el archivo `config/contract/` cambia la constante `publicMessagingETHTest`.

## Uso de MetaMask

Antes de utilizar la aplicación, asegúrate de seguir estos pasos para configurar MetaMask:

1. Abre MetaMask en tu navegador.
2. Crea una nueva billetera o importa una existente.
3. Conéctate a la red de Ethereum adecuada (por ejemplo, Sepolia, Rinkeby, Ropsten, etc.).
4. Asegúrate de tener fondos suficientes en tu billetera para interactuar con el contrato inteligente.

## Funcionalidades

### Conexión y autenticación

- La aplicación se conecta automáticamente a MetaMask al cargarse.
- Si ya tienes una cuenta de usuario, se autentica automáticamente.
- Si eres un usuario nuevo, puedes crear una cuenta utilizando el diálogo "Crear Usuario" en el menú principal.

### Enviar mensajes

- Para enviar un mensaje, simplemente ingresa el texto en el cuadro de entrada y presiona el botón "Enviar".
- Los mensajes se muestran en el componente de chat en tiempo real.

### Eliminar mensajes

- Para eliminar un mensaje presiona el icono de cerrar "x" en tu mensaje.

### Dificultades de la práctica

- Crear una interfaz de usuario visual y amigable de forma sencilla.
- Controlar eventos de MetaMask en el flujo de la DApp.
- Dificultad para identificar las interfaces devueltas por el contrato.

### Mejoras de la aplicación

- Testear la aplicación.
- Mejorar el diseño y la interfaz de usuario.
- Crear un panel de administrador.
- Terminar de usar todas las funciones del contrato.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una rama con la nueva característica o solución de problema que desees agregar.
3. Realiza los cambios necesarios y guarda los archivos modificados.
4. Envía un pull request describiendo los cambios realizados.

## Notas adicionales

- Esta aplicación es solo para fines educativos y no está destinada a ser utilizada en producción.
- El contrato inteligente utilizado en esta práctica es solo un ejemplo y no debe utilizarse en un entorno de producción real.

¡Gracias por revisar este README! Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.

## Estructura de la DApp

A continuación se describe la estructura de archivos de la DApp:

### `HomeView.vue`

Este archivo representa el componente principal de la aplicación. Contiene la lógica y la interfaz de usuario para el chat y otras funcionalidades relacionadas.

#### Componentes Importados:

- `CreateUserDialog`: Componente que muestra el diálogo para

crear un nuevo usuario.

- `MainMenu`: Componente que muestra el menú principal de la aplicación.
- `ChatComponent`: Componente que muestra el chat y permite enviar mensajes.
- `Loading`: Componente que muestra un indicador de carga.

#### Mixins:

- `web3StoreProviderMixin`: Un mixin que proporciona métodos y datos relacionados con la conexión a MetaMask y la interacción con el contrato inteligente.

#### Datos:

- `createUserDialog`: Un booleano que indica si el diálogo de creación de usuario está abierto o cerrado.
- `userWallet`: La dirección de la billetera del usuario actual.
- `messages`: Un array de objetos `MessageModel` que representa los mensajes del chat.
- `loading`: Un booleano que indica si la aplicación se encuentra en un estado de carga.
- `attachedEvent`: Un booleano que indica si la aplicación esta escuchando los eventos del contrato.

#### Propiedades Calculadas:

- `getIsConnected`: Una propiedad calculada que verifica si la conexión a MetaMask está establecida.
- `getIsLoggedIn`: Una propiedad calculada que verifica si el usuario ha iniciado sesión.
- `getLoginUser`: Una propiedad calculada que devuelve los datos del usuario actualmente conectado.

#### Ciclo de Vida:

- `mounted`: Un método del ciclo de vida que se ejecuta cuando el componente se monta en la vista. Verifica la conexión a MetaMask y realiza la conexión y el inicio de sesión correspondientes.

#### Métodos:

- `closeCreateUser`: Cierra el diálogo de creación de usuario.
- `openCreateUser`: Abre el diálogo de creación de usuario.
- `createUser`: Crea un nuevo usuario utilizando el nombre proporcionado. Llama a la función `createUser` del contrato inteligente y actualiza el estado de carga y los datos del usuario.
- `deleteMessage`: Elimina el mensaje llamando a la función `deleteMessage` del contrato inteligente
- `connectAndLogin`: Conecta la aplicación a MetaMask, obtiene los mensajes existentes y verifica la existencia del usuario actualmente conectado.
- `getMessagesData`: Obtiene los mensajes del chat llamando a la función `getMessages` del contrato inteligente y actualiza el estado de los mensajes.
- `sendMessage`: Envía un nuevo mensaje en el chat, llamando a la función `writeMessage` del contrato inteligente .
- `onConfirmCreate`: Callback que se ejecuta cuando se confirma la creación de un nuevo usuario. Muestra un mensaje de advertencia y establece el estado de carga.
- `onCreateUser`: Callback que se ejecuta después de crear un nuevo usuario. Cierra el diálogo de creación de usuario, muestra un mensaje de éxito, realiza la conexión y el inicio de sesión correspondientes, y actualiza la vista.
- `onSendMessage`: Callback que se ejecuta después de enviar un mensaje, actualiza los mensajes y baja el scroll.
- `onDeleteMessage`: Callback que se ejecuta después de eliminar un mensaje, actualiza los mensaje.

## Estilos

El bloque de estilos dentro del archivo `HomeView.vue` aplica estilos CSS específicos al componente. Las clases `.message-chat` y `.login_msg` se utilizan para definir la apariencia del chat y del mensaje de inicio de sesión, respectivamente. Estos estilos están limitados al alcance del componente específico, gracias al modificador `scoped`.

## Estilos

El bloque de estilos dentro del archivo `HomeView.vue` aplica estilos CSS específicos al componente. Las clases `.message-chat` y `.login_msg` se utilizan para definir la apariencia del chat y del mensaje de inicio de sesión, respectivamente. Estos estilos están limitados al alcance del componente específico, gracias al modificador `scoped`.

## public-messaging-service

Este servicio proporciona funciones relacionadas con la mensajería pública en una blockchain. Estas son las principales funciones del servicio:

- `getMessages(wallet: string, provider: Web3): Promise<MessageModel[]>`: Devuelve una lista de mensajes públicos almacenados en el contrato inteligente de la blockchain. Recibe como entrada una billetera (wallet) y una instancia del proveedor de Web3.

- `getUser(wallet: string, provider: Web3): Promise<ContractUser | undefined>`: Obtiene la información del usuario asociado a una billetera en particular. Recibe como entrada una billetera (wallet) y una instancia del proveedor de Web3.

- `createUser(name: string, provider: Web3, from: string, onConfirmCallback: Function): Promise<boolean>`: Crea un nuevo usuario en la plataforma de mensajería pública. Requiere el nombre del usuario, una instancia del proveedor de Web3, la dirección de la billetera desde la cual se realizará la transacción y una función de devolución de llamada para confirmar la transacción.

- `writeMessage(content: string, provider: Web3, from: string, onConfirmCallback: Function): Promise<boolean>`: Escribe un nuevo mensaje en la plataforma de mensajería pública. Recibe el contenido del mensaje, una instancia del proveedor de Web3, la dirección de la billetera desde la cual se realizará la transacción y una función de devolución de llamada para confirmar la transacción.

- `deleteMessage(id: number, provider: Web3, from: string, onConfirmCallback: Function): Promise<boolean>`: Elimina un mensaje existente en la plataforma de mensajería pública. Requiere el ID del mensaje, una instancia del proveedor de Web3, la dirección de la billetera desde la cual se realizará la transacción y una función de devolución de llamada para confirmar la transacción.

- `attachContractEvent(provider: Web3, onMessageSend: Function, onMessageDelete: Function): void`: Permite suscribirse a los eventos del contrato inteligente de la blockchain. Cuando se envía o elimina un mensaje, se llaman a las funciones de devolución de llamada proporcionadas.

## web3-service

Este servicio está relacionado con la interacción con MetaMask y la gestión de cuentas. Estas son las funciones principales del servicio:

- `getAccountAddress(provider: Web3): Promise<string>`: Obtiene la dirección de la cuenta activa conectada a través de MetaMask. Requiere una instancia del proveedor de Web3.

- `connectToMetaMask(): Promise<Web3 | undefined>`: Establece una conexión con MetaMask y devuelve una instancia de Web3 si se logra la conexión.

- `isConnected(): Promise<boolean>`: Comprueba si el usuario está conectado a MetaMask y si hay una cuenta activa.

- `createTransaction(provider: Web3, transactionObject: object, onConfirmCallback: Function): Promise<boolean>`: Crea una transacción en la blockchain utilizando los datos proporcionados en el objeto de transacción. Requiere una instancia del proveedor de Web3, el objeto de transacción y una función de devolución de llamada para confirmar la transacción.
