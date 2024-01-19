const createChatbotApp = (uicolor,apiLink) => {
  let productTitle = '';
  let messages;
  let isThinking = false; 

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
    messages.scrollTop = messages.scrollHeight;
  }

  function handleInputChange(e) {
    productTitle = e.target.value;
  }
  function toggleChatbot() {
    const container = document.getElementById('container');
    const input = document.getElementById('input');

    if(container.style.display === 'none'){
      container.style.display = 'flex';
      badgeFloat.style.display='none';
      count=0;
    } 
    else container.style.display = 'none';
    input.focus();
  }
  async function handleSendMessage() {
    if (!productTitle) return;
    addMessage('user', productTitle);

    const input = document.getElementById('input');
    if (input) {
      input.value = '';
    }
    addThinkingMessage();
    isThinking = true;

    if (productTitle.toLowerCase() === 'hello' || /hello/.test(productTitle.toLowerCase())) {
      addMessage('chatbot', 'Hello! How can I assist you today?');
      productTitle = '';
      return;
    }

    const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await delayPromise;
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
    } finally {
      isThinking = false;
      removeThinkingMessage();
    }

    productTitle = '';
    messages.scrollTop = messages.scrollHeight;
  }
  function addThinkingMessage() {
    const existingThinkingMessage = document.querySelector('.chatbot.thinking');
    if (!existingThinkingMessage) {
      addMessage('chatbot thinking', '🤖');
      
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .chatbot.thinking {
          animation: pulse 1s infinite; 
        }
      `;
      document.head.appendChild(styleElement);
    }
  }
  function removeThinkingMessage() {
    const existingThinkingMessage = document.querySelector('.chatbot.thinking');
    if (existingThinkingMessage) {
      existingThinkingMessage.remove();
    }
  }
    function render() {
      document.addEventListener('DOMContentLoaded', () => {
        const body = document.body;
  
        const title = document.createElement('title');
        title.textContent = 'Chatbot';
  
        const head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(title);

        
      const floatingDiv=document.createElement('div')
      floatingDiv.className='floating-button-div'
      floatingDiv.style.position='fixed'
      floatingDiv.style.bottom='20px'
      floatingDiv.style.right='20px'
      
      const floatingButton=document.createElement('button')
      floatingButton.className='fb'
      floatingButton.innerHTML='💬'
      //floatingButton.style=  `background-color: ${uicolor};`
      floatingButton.style=`background-color: ${uicolor}; color:white; border: none; border-radius: 50%; padding:20px; font-size:16px; cursor: pointer; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);`
      body.appendChild(floatingDiv)
      floatingDiv.appendChild(floatingButton)

      floatingButton.addEventListener('click', toggleChatbot);
        
      
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

        const sendButtonIcon = document.createElement('img');
      sendButtonIcon.src='https://cdn-icons-png.flaticon.com/128/2983/2983788.png'
      sendButtonIcon.style='width:20px; height:20px'
      sendButton.appendChild(sendButtonIcon)

    const closeButton = document.createElement('button');
    closeButton.textContent = '✖'; 
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '15px';
    closeButton.style.color = 'white';

    closeButton.addEventListener('click', () => {
      container.style.display = 'none';
    });
    headerTitle.appendChild(closeButton);

        inputContainer.appendChild(input);
        inputContainer.appendChild(sendButton);
  
        container.appendChild(messages);
        container.appendChild(inputContainer);
  
        body.appendChild(container);
      
        sendButton.addEventListener('click', () => handleSendMessage());
        input.addEventListener('input', (e) => handleInputChange(e));
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }); 
      });
    }
  
    return {
      render,
    };
  }