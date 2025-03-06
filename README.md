# CallFlow

CallFlow is a server-client app that enables multiple clients to connect to a central server and engage in real-time voice communication. The server manages the clients' connections, prioritization (tokens), registration, and communication. All voice data is routed through the server to ensure a stable and controlled environment.

## Requirements

### Server (ExpressJS)
- **Client Management**:
  - The server manages the connections of all clients.
  - Each client receives a unique UUID for identification.
  - Clients are managed based on priority (tokens).
  - The server handles the registration of clients and ensures the client name is unique.

- **Voice Forwarding**:
  - All voice communication data between clients is routed through the server.
  - The server acts as an intermediary to connect and forward voice data.

- **Admin Client**:
  - The server provides an Admin API accessible through a special Admin client.
  - Only the Admin client must be specifically registered and authenticated.
  - The Admin client is given a JWT token for secure communication with the server.
  - The Admin client frontend is implemented using Vue.js 3 and enables the management of client connections and data.

- **JWT Authentication and Authorization**:
  - Authentication is done via JWT (JSON Web Tokens).
  - The JWT contains role information (e.g., "admin", "superadmin").
  - The Admin client is validated by JWT and authorized based on the user role.

- **Persistence**:
  - All client data (UUID and client names) is stored in an encrypted file.
  - The file is securely encrypted to ensure the integrity of the data.
  
### Client (ElectronJS with Vue.js 3)
- **Connection to Server**:
  - The client connects to the server via a WebSocket-based connection for extremely performant and interruption-free communication.
  - The client receives and forwards voice data to other clients.

- **Name and UUID Registration**:
  - Each client must register upon the first connection, and the client name must be unique.
  - The client is assigned a randomly generated UUID, which is only visible in the server backend.
  
- **Name Validation**:
  - During the registration process, the server checks if the desired name is already taken.
  - If the name is already taken, the client is prompted to choose another name.

- **Voice Communication**:
  - The client receives and sends voice data via WebRTC, with the server forwarding the voice communication for all clients.

## Functional Overview

- **Client Registration**:
  - The client sends a registration request with a unique name to the server.
  - The server checks whether the name already exists and returns an error if it does.
  - The server generates a UUID for the client and stores it along with the name in an encrypted file.

- **Admin Client**:
  - The Admin client can log in with a special admin token and access all server data, including registered clients and their statuses.
  - The Admin API allows the admin to monitor, manage, and view all client connections.

- **Voice Communication**:
  - All clients communicate through the server, with their voice data being forwarded in real-time.
  - The server handles the mediation and forwarding of voice data between clients.

- **JWT-based Authentication**:
  - The Admin client and server use JWTs to ensure that only authorized users can access admin functions.
  - JWTs are used for authentication and authorization.

## Installation

### Server

1. Clone the repository:
   ```bash
   git clone https://github.com/username/CallFlow.git
   ```

2. Go to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Admin Client

1. Go to the admin-client directory and install dependencies:
   ```bash
   cd admin-client
   npm install
   ```

2. Start the admin client:
   ```bash
   npm run dev
   ```

### Client (ElectronJS)

1. Go to the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the client:
   ```bash
   npm start
   ```

## License

CallFlow is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
