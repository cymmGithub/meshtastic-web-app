const API_URL = 'http://localhost:3001/api';

export const messages = {
  async save(senderId, receiverId, content) {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ senderId, receiverId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to save message');
    }

    return response.json();
  },

  async getAll() {
    const response = await fetch(`${API_URL}/messages`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  },

  async markAsRead(messageId) {
    const response = await fetch(`${API_URL}/messages/${messageId}/read`, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error('Failed to mark message as read');
    }

    return response.json();
  },

  async getUnread(userId) {
    const response = await fetch(`${API_URL}/messages/${userId}/unread`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch unread messages');
    }

    return response.json();
  },

  async getById(messageId) {
    const response = await fetch(`${API_URL}/messages/${messageId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch message');
    }

    return response.json();
  },

  async delete(messageId) {
    const response = await fetch(`${API_URL}/messages/${messageId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete message');
    }

    return response.json();
  }
}; 