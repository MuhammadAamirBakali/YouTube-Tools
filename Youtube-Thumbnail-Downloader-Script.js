jQuery(document).ready(function($) {
  $('#downloadBtn').click(function() {
    const videoUrl = $('#youtubeUrl').val().trim();
    if (!videoUrl) {
      alert('Please enter a YouTube URL');
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert('Invalid YouTube URL');
      return;
    }

    showThumbnails(videoId);
  });

  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function showThumbnails(videoId) {
    const qualities = [
      { name: 'Max Resolution', code: 'maxresdefault' },
      { name: 'HD Quality', code: 'hqdefault' },
      { name: 'Medium Quality', code: 'mqdefault' },
      { name: 'Standard Quality', code: 'sddefault' }
    ];

    $('#thumbnailResult').empty();

    qualities.forEach(quality => {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality.code}.jpg`;
      
      const thumbnailItem = $('<div>').addClass('thumbnail-item');
      const img = $('<img>').addClass('thumbnail-img').attr('src', thumbnailUrl);
      const label = $('<div>').addClass('quality-label').text(quality.name);
      
      thumbnailItem.append(img, label).appendTo('#thumbnailResult');
      
      // Click to download
      thumbnailItem.click(function() {
        window.open(thumbnailUrl, '_blank');
      });
    });
  }
});
