const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const infoButton = document.querySelector("#info-btn");
const uploadButton = document.querySelector("#upload-btn");

let userText = null;

const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Inspiring.ai</h1>
                            <p>Start your conversation and explore the power of our instructor.<br> Your chat history will be displayed here.</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}







const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}




const handleOutgoingChat = () => {
    userText = chatInput.value.trim(); // Get chatInput value and remove extra spaces
    if (!userText) return; // If chatInput is empty return from here

    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    // Create a FormData object and append the user's message to it
    const formData = new FormData();
    formData.append('human_input', userText);

    // Send a POST request with the FormData object as the body
    fetch('/send_message', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const html = `<div class="chat-content">
                        <div class="chat-details">
                            <img src="images/user.jpg" alt="user-img">
                            <p>${userText}</p>
                        </div>
                    </div>`;
        const outgoingChatDiv = createChatElement(html, "outgoing");
        chatContainer.querySelector(".default-text")?.remove();
        chatContainer.appendChild(outgoingChatDiv);

        // Display the server's response in the chat
        const responseHtml = `<div class="chat-content">
                                <div class="chat-details">
                                    <img src="images/chatbot.jpg" alt="chatbot-img">
                                    <p>${data.message}</p>
                                </div>
                              </div>`;
        const incomingChatDiv = createChatElement(responseHtml, "incoming");
        chatContainer.appendChild(incomingChatDiv);

        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    });
}



const ReportinfoChat = () => {
    userText = " Write a detailed report about the previous conversation if it exists, outlining the areas that the userstruggled the most with and the areas that he understood quickly"
    // Create a FormData object and append the user's message to it
    const formData = new FormData();
    formData.append('human_input', userText);

    // Send a POST request with the FormData object as the body
    fetch('/send_message', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {


        // Display the server's response in the chat
        const responseHtml = `<div class="chat-content">
                                <div class="chat-details">
                                    <img src="images/chatbot.jpg" alt="chatbot-img">
                                    <p>${data.message}</p>
                                </div>
                              </div>`;
        const incomingChatDiv = createChatElement(responseHtml, "incoming");
        chatContainer.appendChild(incomingChatDiv);

        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    });
}



deleteButton.addEventListener("click", () => {
    // Remove the chats from local storage and call loadDataFromLocalstorage function
    if(confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});

themeButton.addEventListener("click", () => {
    // Toggle body's class for the theme mode and save the updated theme to the local storage
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    // Adjust the height of the input field dynamically based on its content
    chatInput.style.height =  `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If the Enter key is pressed without Shift and the window width is larger
    // than 800 pixels, handle the outgoing chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);


infoButton.addEventListener("click", ReportinfoChat);