const buttonInstall = document.getElementById('buttonInstall');
let deferredPrompt = null;

function handleBeforeInstallPrompt(event) {
  // Store the triggered events
  deferredPrompt = event;

  // Remove the hidden class from the button.
  buttonInstall.classList.remove('hidden');
}

async function handleInstallClick() {
  if (!deferredPrompt) {
    return;
  }

  // Show prompt
  deferredPrompt.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  deferredPrompt = null;

  buttonInstall.classList.add('hidden');
}

function handleAppInstalled(event) {
  // Clear prompt
  deferredPrompt = null;
}

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

// TODO: Implement a click event handler on the `butInstall` element
buttonInstall.addEventListener('click', handleInstallClick);

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', handleAppInstalled);
