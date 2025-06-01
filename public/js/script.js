const socket = io()

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position)=>{
        const {latitude, longitude} = position.coords;
        socket.emit('send-location', {latitude, longitude})
    }, (error)=>{
        console.log(error)
    },{
        enableHighAccuracy:true,
        timeout: 5000, //5sec
        maximumAge:0, //no caching
    })
}

const markers = {}

const map = L.map('map').setView([0, 0], 13); // Default center, zoom level 13
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'real time tracking web app'
}).addTo(map);


socket.on('receive-location', (data)=>{
    const {id, latitude, longitude} = data;
    map.setView([latitude, longitude],20)
    if(markers[id]){
        markers[id].setLatlng([latitude, longitude]);
    }
    else {
        markers[id]=L.marker([latitude, longitude]).addTo(map)
    }
})

socket.on('user-disconnected', (id)=>{
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})



