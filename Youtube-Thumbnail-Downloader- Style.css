jQuery(document).ready(function($) {
  // Debugging check
  console.log("Tool JS Loaded!"); // Check in F12 console
  
  // Fix 1: Proper event binding
  $(document).on('click', '#downloadBtn', function() {
    console.log("Download button clicked"); // Debug
    const videoUrl = $('#youtubeUrl').val().trim();
    
    if (!videoUrl) {
      showError("Please enter a YouTube URL");
      return;
    }
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      showError("Invalid URL. Use format: https://youtu.be/VIDEO_ID");
      return;
    }
    
    loadThumbnails(videoId);
  });

  // Fix 2: Better URL parsing
  function extractVideoId(url) {
    // Works for all YouTube URL formats
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Fix 3: Reliable thumbnail loading
  function loadThumbnails(videoId) {
    $('#thumbnailResult').empty();
    $('#errorMessage').hide();
    
    const qualities = [
      { name: '4K Quality', code: 'maxresdefault' },
      { name: 'HD Quality', code: 'hqdefault' },
      { name: 'SD Quality', code: 'sddefault' },
      { name: 'Medium Quality', code: 'mqdefault' }
    ];

    qualities.forEach(q => {
      const imgUrl = `https://img.youtube.com/vi/${videoId}/${q.code}.jpg`;
      const $thumb = $(`
        <div class="thumbnail-item">
          <img src="${imgUrl}" class="thumbnail-img" data-url="${imgUrl}">
          <div class="quality-label">${q.name}</div>
        </div>
      `).appendTo('#thumbnailResult');
      
      // Click to preview
      $thumb.click(function() {
        $('#modalImage').attr('src', imgUrl);
        $('#imageModal').show();
      });
    });
  }

  // Fix 4: Error handling
  function showError(msg) {
    $('#errorMessage').text(msg).show();
    setTimeout(() => $('#errorMessage').fadeOut(), 3000);
  }

  // Reset function
  $('#resetBtn').click(function() {
    $('#youtubeUrl').val('');
    $('#thumbnailResult').empty();
    $('#errorMessage').hide();
  });

  // Modal controls
  $('.close').click(() => $('#imageModal').hide());
  $(window).click(e => e.target === $('#imageModal')[0] ? $('#imageModal').hide() : null);
  $('#downloadImageBtn').click(function() {
    const link = document.createElement('a');
    link.href = $('#modalImage').attr('src');
    link.download = 'youtube-thumbnail.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});
