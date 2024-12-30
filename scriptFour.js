(function () {
  if (window.ChatbotScriptLoaded) return;
  window.ChatbotScriptLoaded = true;

  const currentScriptTag =
    document.currentScript ||
    Array.from(document.getElementsByTagName("script")).pop();

  const paramObj = JSON.parse(currentScriptTag.getAttribute("data-params"));

  console.log(paramObj, "OBJECT");
  const chatbotConfig = {
    botUrl: "https://ainexus-staging.bjitgroup.com/chatapp",
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
  window.addEventListener("message", (event) => {
    if (event.origin !== "https://ainexus-staging.bjitgroup.com/chatapp") {
      return; // Make sure to restrict by origin
    }
    console.log(event, "event");
    if (event.data.status === "active") {
      console.log("Message from chatbot:", event, event.data.message);
    }
  });

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
  iframe.style.pointerEvents = "none";
  iframe.style.allowTransparency = "true";

  // Enable pointer events when the iframe is focused
  iframe.addEventListener("mouseenter", function () {
    iframe.style.pointerEvents = "auto";
  });

  // Disable pointer events when the iframe is not focused
  iframe.addEventListener("mouseleave", function () {
    iframe.style.pointerEvents = "none";
  });

  if (chatbotConfig.position === "bottom-right") {
    iframe.style.bottom = "0";
    iframe.style.right = "20px";
  } else if (chatbotConfig.position === "bottom-left") {
    iframe.style.bottom = "0";
    iframe.style.left = "20px";
  }

  document.body.appendChild(iframe);
})();
