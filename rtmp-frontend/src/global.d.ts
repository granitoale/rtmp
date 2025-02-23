declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
  interface MessageResponse {
    id: number;
    body: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  }
}
export {};