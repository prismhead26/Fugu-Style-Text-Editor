const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // deffer the prompt event to the `window.deferredPrompt` variable
    window.deferredPrompt = event;
    // butInstall.style.display = 'block';
    // Show the install button
    butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Check if the `window.deferredPrompt` is null
    if (!window.deferredPrompt) return;
    // Show the prompt
    window.deferredPrompt.prompt();
    // nullify the `window.deferredPrompt` variable
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the event
    console.log('Jate PWA installed', event);
    // nullify the `window.deferredPrompt` variable
    window.deferredPrompt = null;
    // butInstall.style.display = 'none';
});
