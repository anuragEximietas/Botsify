const createChatbotApp = (uicolor,apiLink) => {
  
    function render() {
      document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
  
        const title = document.createElement('title');
        title.textContent = 'Chatbot';
  
        const head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(title);
  
        const container = document.createElement('div');
        container.id = 'container';
        container.className = 'container';
 
       
        messages = document.createElement('div');
        messages.id = 'messages';
        messages.className = 'messages';
  
        const placeholder = document.createElement('p');
        placeholder.className = 'placeholder';
        placeholder.textContent = "I'm Botsify, How can I help you?";
        placeholder.style.backgroundColor = uicolor;
        messages.appendChild(placeholder);
  
        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
  
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'input';
        input.className = 'input';
  
        const sendButton = document.createElement('button');
        sendButton.id = 'sendButton';
        sendButton.className = 'btn';
        sendButton.textContent = 'Send';

        inputContainer.appendChild(input);
        inputContainer.appendChild(sendButton);
  
        container.appendChild(messages);
        container.appendChild(inputContainer);
  
        body.appendChild(container);
      });
    }
  
    return {
      render,
    };
  }