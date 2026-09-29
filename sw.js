const CACHE='ritmo-shell-v3';
const assets=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(assets)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ritmo-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy));}
      return response;
    }).catch(()=>caches.match('./index.html')));
  }else if(assets.slice(2).some(asset=>new URL(asset,self.location.href).href===event.request.url)){
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
  }
});

// Handle notification clicks — open the app
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(clientList=>{
      // Focus existing window if open
      for(const client of clientList){
        if(client.url.includes('index.html')&&'focus' in client)return client.focus();
      }
      // Otherwise open new window
      if(clients.openWindow)return clients.openWindow('./');
    })
  );
});
