const crazysdk = window.CrazyGames.CrazySDK.getInstance(); // getting the SDK
crazysdk.init(); // initializing the SDK, call as early as possible

crazysdk.addEventListener("bannerRendered", (event) => {
    console.log(`Banner for container ${event.containerId} has been
      rendered!`);
  });
  crazysdk.addEventListener("bannerError", (event) => {
    console.log(`Banner render error: ${event.error}`);
  });