﻿function search() {
    document.getElementById("result").innerHTML = "loading...";
    //var query = document.getElementById("query").value;
    //query = encodeURIComponent(query);
    var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=upcominggames&max-results=50&alt=json-in-script&callback=listVideos";
    // var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=" + query + "&max-results=50&alt=json-in-script&callback=listVideos";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsonpURL;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

function search_trend() {
    document.getElementById("result").innerHTML = "loading...";
    var data = document.getElementById("search").value;
    console.log(data);
    //var query = document.getElementById("query").value;
    //query = encodeURIComponent(query);
    var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq="+data+"&max-results=50&alt=json-in-script&callback=listVideos";
    // var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=" + query + "&max-results=50&alt=json-in-script&callback=listVideos";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsonpURL;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

function search_trending() {
    document.getElementById("result").innerHTML = "loading...";
    var data = document.getElementById("search").value;
    console.log(data);
    //var query = document.getElementById("query").value;
    //query = encodeURIComponent(query);
    var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=highest+rated+games+of+all+time&max-results=50&alt=json-in-script&callback=listVideos";
    // var jsonpURL = "http://gdata.youtube.com/feeds/videos?vq=" + query + "&max-results=50&alt=json-in-script&callback=listVideos";
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsonpURL;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
}

function listVideos(data) {
    var html = '';
    if (data.feed.openSearch$totalResults.$t > 0) {
        var entries = data.feed.entry;
        for (var i = 0; i < entries.length; i++) {
            html += entries[i].content.$t;
        }
    } else {
        html += "<p>not found</p>";
    }
    document.getElementById("result").innerHTML = html;
}