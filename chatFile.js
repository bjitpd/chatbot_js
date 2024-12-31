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
      webUrl: paramObj?.webUrl,
    },
  };

  const queryString = new URLSearchParams(chatbotConfig.queryParams).toString();
  const chatbotUrlWithParams = `${chatbotConfig.botUrl}?${queryString}`;

  const iframe = document.createElement("iframe");
  iframe.src = chatbotUrlWithParams;
  iframe.style.width = "90px";
  iframe.style.height = "90px";
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
    console.log(event, "TRIGGERED");

    if (event.origin !== "https://ainexus-staging.bjitgroup.com") {
      console.log("NOT VALID");

      return; // This line might be the cause if origins do not match.
    }

    if (event.data.status == "active") {
      iframe.style.height = chatbotConfig?.height;
      iframe.style.width = chatbotConfig?.width;
    } else if (event.data.status == "inactive") {
      iframe.style.height = "90px";
      iframe.style.width = "90px";
    }
  });

  document.body.appendChild(iframe);
})();
