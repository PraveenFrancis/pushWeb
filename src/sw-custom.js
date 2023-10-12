// sw-custom.js

self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: 'path/to/icon.png'
    };
  
    event.waitUntil(
      self.registration.showNotification('Notification Title', options)
    );
  });
  