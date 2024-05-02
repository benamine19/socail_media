class WebSocketInstance {
    constructor() {
      this.socket = null;
      this.callbacks = {};
    }
  
    connect() {
      this.socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
      this.socket.onopen = () => {
        console.log('WebSocket connected');
      };
  
      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
      };
  
      this.socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (this.callbacks[data.type]) {
          this.callbacks[data.type](data);
        }
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    sendMessage(messageData) {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(messageData));
      } else {
        console.error('WebSocket not connected');
      }
    }
  
    addCallbacks(callbacks) {
      this.callbacks = { ...this.callbacks, ...callbacks };
    }
  }
  
  const webSocketInstance = new WebSocketInstance();
  export default webSocketInstance;
  