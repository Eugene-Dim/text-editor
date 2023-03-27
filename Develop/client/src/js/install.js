const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {event.preventDefault();
    deferredPromptEvent = event;
    installButton.classList.remove('hidden');});
 
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {if (!deferredPromptEvent) return;
    deferredPromptEvent.prompt();
    
    const choiceResult = await deferredPromptEvent.userChoice;
    deferredPromptEvent = null;
    installButton.classList.add('hidden');
    
    console.log(`User ${choiceResult.outcome} the installation`);
    });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {deferredPromptEvent = null;

    // Hide the install button
    installButton.classList.add('hidden');
  
    // Log the installation event
    console.log('App installed successfully');
  });
