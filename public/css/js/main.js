document.getElementById("video-url").addEventListener("input", function() {
    const url = this.value;
    const videoId = extractVideoId(url);

    if (videoId) {
        fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
            .then(response => response.json())
            .then(data => {
                if (data.title) {
                    document.getElementById("link-preview").innerHTML = `Video Title: <a href="${url}" target="_blank">${data.title}</a>`;
                    document.getElementById("link-preview").style.display = "block";
                } else {
                    document.getElementById("link-preview").style.display = "none";
                }
            })
            .catch(err => {
                console.error("Failed to fetch video details:", err);
                document.getElementById("link-preview").style.display = "none";
            });
    } else {
        document.getElementById("link-preview").style.display = "none";
    }
});

function extractVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
}
