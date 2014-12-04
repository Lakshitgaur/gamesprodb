document.write('<div id="comment_more"></div>')
var feedpointer = new google.feeds.Feed("http://www.giantbomb.com/feeds/news/");
//feedpointer.setNumEntries(1) //Show 1 entry only
feedpointer.load(formatoutput)


function formatoutput(result) {
    if (!result.error) {
        var rssoutput = ""
        var thefeeds = result.feed.entries
        for (var i = 0; i < thefeeds.length; i++) {
            var entrydate = new Date(thefeeds[i].publishedDate) //get date of entry
            var entrydatestr = ' ' + entrydate.getFullYear() + "/" + (entrydate.getMonth() + 1) + "/" + entrydate.getDate()
            rssoutput += "<div><h1><p><u><a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a></u></h1>" + "<h3>" + "News Date:" + entrydatestr + "</h3>" + "<br />" + thefeeds[i].content + "</p></br><hr style='background:#F87431; border:0; height:7px' /><div>"
        }
        document.getElementById("comment_more").innerHTML = rssoutput
    }
    else //if error fetching feed, alert human readable error message
        alert(result.error.message)
}