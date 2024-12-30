(function () {
  if (window.ChatbotScriptLoaded) return;
  window.ChatbotScriptLoaded = true;

  const currentScriptTag =
    document.currentScript ||
    Array.from(document.getElementsByTagName("script")).pop();

  const paramObj = JSON.parse(currentScriptTag.getAttribute("data-params"));

  console.log(paramObj, "OBJECT");
  const chatbotConfig = {
    botUrl: "http://localhost:5174/",
    width: "450px",
    height: "660px",
    position: "bottom-right",
    queryParams: {
      bgColor: paramObj?.bgColor,
      headerTitle: paramObj?.headerTitle || "Chat with us",
      userId: paramObj?.userId,
      apiKey: paramObj?.apiKey,
      assistantId: paramObj?.assistantId,
      screenWidth: paramObj?.screenWidth,
    },
  };

  // // Add an event listener to capture any click events within the iframe
  // window.addEventListener("message", function(event) {
  //   if (event.data.type === "chatbotClick") {
  //     console.log("Chatbot click event:", event.data);
  //   }
  // });

  // // Function to send click events from the chatbot iframe to the parent window
  // function sendClickEventToParent() {
  //   window.parent.postMessage({ type: "chatbotClick", data: "Click event data" }, "*");
  // }
  console.log(paramObj?.headerTitle, "headerTitle");

  const queryString = new URLSearchParams(chatbotConfig.queryParams).toString();
  const chatbotUrlWithParams = `${chatbotConfig.botUrl}?${queryString}`;

  const iframe = document.createElement("iframe");
  iframe.src = chatbotUrlWithParams;
  iframe.style.width = chatbotConfig.width;
  iframe.style.height = chatbotConfig.height;
  iframe.style.position = "fixed";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "18px";
  iframe.style.allowTransparency = "true";

  if (chatbotConfig.position === "bottom-right") {
    iframe.style.bottom = "0";
    iframe.style.right = "20px";
  } else if (chatbotConfig.position === "bottom-left") {
    iframe.style.bottom = "0";
    iframe.style.left = "20px";
  }
  window.addEventListener("message", (event) => {
    if (event.origin !== "http://localhost:5174") {
      return; // This line might be the cause if origins do not match.
    }
    console.log(
      event,
      "Show Message",
      event.data,
      event.data.status,
      typeof event.data.status
    );
    if (event.data.status == "active") {
      console.log("Message from chatbot:", event, event.data.message);
      iframe.style.height = chatbotConfig?.height;
    } else if (event.data.status == "inactive") {
      iframe.style.height = "200px";
    }
  });

  document.body.appendChild(iframe);
})();
