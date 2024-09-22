export const createWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8000/ws/donations/');
    return ws;
  };
  