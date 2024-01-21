import {
    addMessage,
    handleInputChange,
    toggleChatbot,
  } from '../chatbotComponent';
  
  describe('createChatbotApp Functions', () => {
    let container;
    let input;
    let messages;
    let count;
    let audio;
    let badgeFloat;
  
    beforeEach(() => {
      container = document.createElement('div');
      container.id = 'container';
      input = document.createElement('input');
      input.id = 'input';
      messages = document.createElement('div');
      messages.id = 'messages';
      count = 0;
      audio = {
        play: jest.fn(),
      };
      badgeFloat = document.createElement('div');
      badgeFloat.className = 'badge';
    });
  
    test('addMessage adds a message to the messages container', () => {
      document.body.appendChild(messages);
      addMessage('user', 'Test message');
      const userMessage = messages.querySelector('.user');
      expect(userMessage).toBeTruthy();
      expect(userMessage.textContent).toBe('Test message');
    });
  
    test('handleInputChange updates productTitle', () => {
      const event = { target: { value: 'Test Product' } };
      handleInputChange(event);
      expect(container.productTitle).toBe('Test Product');
    });
  
    test('toggleChatbot toggles the display of the chatbot container', () => {
      document.body.appendChild(container);
      document.body.appendChild(input);
      toggleChatbot();
      expect(container.style.display).toBe('flex');
      toggleChatbot();
      expect(container.style.display).toBe('none');
    });
  
  });
  