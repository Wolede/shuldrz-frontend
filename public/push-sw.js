self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
            // console.log(' client', client[0].focus)
            return clients.map(client => {
                // Check to make sure WindowClient.navigate() is supported.
                if ('focus' in client) {
                    return client.focus();
                }
            });
        })
    )
})