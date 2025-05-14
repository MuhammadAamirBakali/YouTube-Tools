$(document).ready(function() {
    $("#download-btn").click(function() {
        const url = $("#youtube-url").val().trim();
        
        if (!url) {
            alert("Please enter a YouTube URL!");
            return;
        }
        
        // Extract Video ID
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1];
        } else {
            alert("Invalid YouTube URL!");
            return;
        }
        
        // Show Thumbnail (Max Resolution)
        const thumbnailUrl = https://img.youtube.com/vi/${videoId}/maxresdefault.jpg;
        $("#result").html(`
            <h3>Download Thumbnail:</h3>
            <img src="${thumbnailUrl}" alt="YouTube Thumbnail" class="img-fluid">
            <p class="mt-2">
                <a href="${thumbnailUrl}" download class="btn btn-success">Download HD Thumbnail</a>
            </p>
        `);
    });
});
