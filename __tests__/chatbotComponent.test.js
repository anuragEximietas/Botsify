import {
    addMessage,
    handleInputChange,
    toggleChatbot,
    handleSendMessage,
    updateStylesForWindowSize,
    render,
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

    test('handleSendMessage adds user message to chat history', async () => {
      document.body.appendChild(container);
      document.body.appendChild(input);
      document.body.appendChild(messages);
      const delayPromiseSpy = jest.spyOn(window, 'Promise');
      const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue({ products: [] }),
      });
  
      await handleSendMessage();
      expect(messages.querySelector('.user')).toBeTruthy();
      expect(container.productTitle).toBe('');
      expect(input.value).toBe('');
      expect(fetchSpy).toHaveBeenCalled();
      expect(delayPromiseSpy).toHaveBeenCalled();
  
      fetchSpy.mockRestore();
      delayPromiseSpy.mockRestore();
    });
  
    test('updateStylesForWindowSize updates styles based on window width', () => {
      document.body.appendChild(container);
      document.body.appendChild(floatingButtonDiv);

      window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
          matches: query.includes('max-width: 300px'),
        };
      });
  
      updateStylesForWindowSize();
  
      expect(container.style.width).toBe('300px');
      expect(container.style.marginRight).toBe('15%');
      expect(container.style.bottom).toBe('50px');
      expect(floatingButtonDiv.style.bottom).toBe('10px');
      expect(floatingButtonDiv.style.right).toBe('10px');
  
      // Clean up
      window.matchMedia.mockRestore();
    });
  
    test('render updates the chatbot UI and sets appropriate styles', () => {
      document.body.appendChild(container);
      document.body.appendChild(floatingButtonDiv);
  
      // Mock window.matchMedia to simulate different window widths
      window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
          matches: query.includes('max-width: 300px'),
        };
      });
  
      render();
  
      // Assert styles are updated based on window width
      expect(container.style.width).toBe('300px');
      expect(container.style.marginRight).toBe('15%');
      expect(container.style.bottom).toBe('50px');
      expect(floatingButtonDiv.style.bottom).toBe('10px');
      expect(floatingButtonDiv.style.right).toBe('10px');
  
      // Assert that event listeners are attached
      expect(sendButton).toHaveProperty('onclick');
      expect(input).toHaveProperty('oninput');
      expect(input).toHaveProperty('onkeypress');
      expect(window).toHaveProperty('onresize');
  
      // Clean up
      window.matchMedia.mockRestore();
    });
  });
  