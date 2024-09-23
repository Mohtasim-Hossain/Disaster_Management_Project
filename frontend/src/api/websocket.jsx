export const createWebSocket = () => {
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/donations/');
    return ws;
  };
  