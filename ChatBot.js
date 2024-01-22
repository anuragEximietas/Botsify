const createChatbotApp = (uicolor,msgcolor,textcolor,apiLink,audioLink,iconLink) => {
  let productTitle = '';
  let messages;
  let audio = new Audio(audioLink);
  let count =0;
  let isThinking = false; 

  const badgeFloat = document.createElement('div')
  badgeFloat.className='badge'
  badgeFloat.className='badge'

  badgeFloat.style= `
     display:none;
     position:absolute;
     top:0;
     right:0;
     background-color:blue;
     color:${textcolor};
     border-radius:50%;
     padding:5px 8px;
     font-size:12px;
     `

  function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${role}`;
    messageDiv.textContent = content;
    messageDiv.style.display = 'flex';
    messageDiv.style = `
        border-radius: 5px; 
        padding: 8px; 
        margin-bottom: 10px; 
        margin-top: 10px; 
        word-wrap: break-word;`
    if (messageDiv.className === 'chatbot'){
      messageDiv.style.backgroundColor = msgcolor;
      messageDiv.style.color = textcolor;
      messageDiv.style.textAlign='left';
    } 
    else if(messageDiv.className === 'user'){
      messageDiv.style.backgroundColor = 'white';
      messageDiv.style.textAlign='right';
    } 
    messages.appendChild(messageDiv);
    if(container.style.display === 'none' && messageDiv.className === 'chatbot'){
      count += 1;
      audio.play();
      badgeFloat.style.display= 'flex';
      badgeFloat.innerHTML= count;
    }
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
  const input = document.getElementById('input');
  const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));

  if (!productTitle || isThinking) return;
  addMessage('user', productTitle);

  if (input) {
    input.value = '';
  }
  addThinkingMessage();
  isThinking = true;

  try {
    await delayPromise;

    if (/hello/.test(productTitle.toLowerCase()) || /hey/.test(productTitle.toLowerCase()) || /hi/.test(productTitle.toLowerCase())) {
      addMessage('chatbot', 'Hello! How can I assist you today?');
    } 
    else {
      const response = await fetch(apiLink + `${productTitle}`);
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
    }
  } 
  catch (error) {
    console.error('Error fetching product information:', error);
    addMessage('chatbot', 'Error fetching product information. Please try again.');
  } 
  finally {
    isThinking = false;
    removeThinkingMessage();
  }
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

function updateStylesForWindowSize() {
  const container = document.querySelector('.container');
  const floatingButtonDiv = document.querySelector('.floating-button-div');

  if (window.matchMedia('(max-width: 300px)').matches) {
    container.style.width = '300px';
    container.style.marginRight = '15%';
    container.style.bottom = '50px';
    floatingButtonDiv.style.bottom = '10px';
    floatingButtonDiv.style.right = '10px';
  } else if (window.matchMedia('(max-width: 856px)').matches) {
    container.style.width = '300px';
    container.style.right = '10px';
    container.style.bottom = '50px';
    floatingButtonDiv.style.bottom = '10px';
    floatingButtonDiv.style.right = '10px';
  } else if (window.matchMedia('(max-width: 1280px)').matches) {
    container.style.width = '300px';
    container.style.marginRight = '0px';
    container.style.bottom = '0';
    floatingButtonDiv.style.bottom = '10px';
    floatingButtonDiv.style.right = '10px';
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
      floatingButton.style=`
          background-color: ${uicolor}; 
          color:white; 
          border: none; 
          border-radius: 50%; 
          padding:20px; 
          font-size:16px; 
          cursor: pointer; 
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);`

      body.appendChild(floatingDiv)
      floatingDiv.appendChild(floatingButton)
      floatingDiv.appendChild(badgeFloat)
      floatingButton.addEventListener('click', toggleChatbot);

      const container = document.createElement('div');
      container.id = 'container';
      container.className = 'container';
      container.style = `
          position: fixed; 
          flex-direction: column;
          align-self: flex-end; 
          margin-top:10%;
          margin-bottom: 5%; 
          margin-left: 68%;
          height: 400px; 
          width: 300px; 
          border: 0px solid antiquewhite; 
          border-radius: 20px; 
          overflow: hidden; 
          background-color: white;`
      container.style.display = 'none';

      const headerTitle = document.createElement('h2');
      headerTitle.textContent = 'BotsifY 🤖';
      headerTitle.style = `
          background-color: ${uicolor}; 
          font-size: 20px; 
          font-family: lucida Console;
          margin: 0px; 
          padding: 15px; 
          color: white; 
          text-align: center;`
      container.appendChild(headerTitle);

     
      messages = document.createElement('div');
      messages.id = 'messages';
      messages.className = 'messages';
      messages.style=`
          flex: 1;
          padding: 10px; 
          overflow-y: auto;`

      const placeholder = document.createElement('p');
      placeholder.className = 'placeholder';
      placeholder.textContent = "I'm Botsify, How can I help you?";
      //placeholder.style.backgroundColor = msgcolor;
      placeholder.style=`
          background-color: ${msgcolor}; 
          color: ${textcolor}; 
          align-self: flex-end;
          border-radius: 5px;
          padding: 10px;`

      messages.appendChild(placeholder);

      const inputContainer = document.createElement('div');
      inputContainer.className = 'input-container';
      inputContainer.style = `
          display: flex;
          justify-content: space-between; 
          padding: 10px;`

      const input = document.createElement('input');
      input.type = 'text';
      input.id = 'input';
      input.className = 'input';
      input.style = `
          border-radius: 15px; 
          flex: 1; 
          padding: 8px; 
          margin-right: 0px;`
  
      const sendButton = document.createElement('button');
      sendButton.id = 'sendButton';
      sendButton.className = 'btn';
      //sendButton.textContent = 'Send';
      sendButton.style = `
          background-color: white; 
          padding: 4px 8px; 
          color: #fff; 
          border: none; 
          border-radius: 20px; 
          cursor: pointer;`
      
    const sendButtonIcon = document.createElement('img');
    sendButtonIcon.src=iconLink
    sendButtonIcon.style='width:20px; height:20px'
    sendButton.appendChild(sendButtonIcon)

    const closeButton = document.createElement('button');
    closeButton.textContent = '✖'; 
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '15px';
    closeButton.style.color = 'white';
    
    //closeButton.style.textAlign='right'
     closeButton.style.position = 'relative';
     closeButton.style.top = '0';
     closeButton.style.right = '-3.5rem';


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
      window.addEventListener('resize', updateStylesForWindowSize);
    });
  }
  return {
    render,
  };
}