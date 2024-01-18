const createChatbotApp = (uicolor,apiLink) => {
  let productTitle = '';
  let messages;

  function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${role}`;
    messageDiv.textContent = content;
    messageDiv.style.display = 'flex';
    if (messageDiv.className === 'chatbot'){
      messageDiv.style.backgroundColor = uicolor;
      messageDiv.style.color = 'white';
    } 
    else{
      messageDiv.style.backgroundColor = 'white';
    } 

    messages.appendChild(messageDiv);
    
  }

  function handleInputChange(e) {
    productTitle = e.target.value;
  }

  async function handleSendMessage() {
    if (!productTitle) return;
    addMessage('user', productTitle);

    if (productTitle.toLowerCase() === 'hello' || /hello/.test(productTitle.toLowerCase())) {
      addMessage('chatbot', 'Hello! How can I assist you today?');
      productTitle = '';
      return;
    }

    try {
      const response = await fetch(apiLink+`${productTitle}`);
      const apiResponse = await response.json();

      if (apiResponse.products && apiResponse.products.length > 0) {
        const product = apiResponse.products[0];
        const description = product.description || 'No description available';
        const price = product.price || 'Price not specified';
        const ratings = product.rating || 'No ratings available';

        addMessage('chatbot', `Description: ${description}\nPrice: $${price}\nRatings: ${ratings}`);
      } else {
        addMessage('chatbot', `I'm sorry, I didn't understand. Please try a different query`);
      }
    } catch (error) {
      console.error('Error fetching product information:', error);
      addMessage('chatbot', 'Error fetching product information. Please try again.');
    }

    productTitle = '';
  }
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
      
        sendButton.addEventListener('click', () => handleSendMessage());
        input.addEventListener('input', (e) => handleInputChange(e));
      });
    }
  
    return {
      render,
    };
  }