jQuery(document).ready(function($) {
  // Elements
  const $downloadBtn = $('#downloadBtn');
  const $resetBtn = $('#resetBtn');
  const $urlInput = $('#youtubeUrl');
  const $resultContainer = $('#thumbnailResult');
  const $modal = $('#imageModal');
  const $modalImg = $('#modalImage');
  const $downloadImageBtn = $('#downloadImageBtn');
  const $closeModal = $('.close');
  
  let currentImageUrl = '';
  
  // Download thumbnails
  $downloadBtn.click(function() {
    const videoUrl = $urlInput.val().trim();
    if (!videoUrl) {
      alert('Please enter a YouTube URL');
      return;
    }
    
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert('Invalid YouTube URL. Example: https://youtu.be/VIDEO_ID');
      return;
    }
    
    showThumbnails(videoId);
  });
  
  // Reset tool
  $resetBtn.click(function() {
    $urlInput.val('');
    $resultContainer.empty();
  });
  
  // Extract YouTube video ID
  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  
  // Show all thumbnails
  function showThumbnails(videoId) {
    $resultContainer.empty();
    
    const qualities = [
      { name: '4K Quality (3840x2160)', code: 'maxresdefault' },
      { name: 'Max Quality (1280x720)', code: 'hqdefault' },
      { name: 'High Quality (480x360)', code: 'mqdefault' },
      { name: 'Standard Quality (320x180)', code: 'sddefault' },
      { name: 'Medium Quality (120x90)', code: '0' },
      { name: 'Low Quality (60x45)', code: '1' }
    ];
    
    qualities.forEach(quality => {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality.code}.jpg`;
      
      const $thumbnailItem = $('<div>').addClass('thumbnail-item');
      const $img = $('<img>').addClass('thumbnail-img').attr({
        src: thumbnailUrl,
        alt: quality.name,
        'data-quality': quality.code
      });
      const $label = $('<div>').addClass('quality-label').text(quality.name);
      
      $thumbnailItem.append($img, $label).appendTo($resultContainer);
      
      // Click to enlarge
      $img.click(function() {
        currentImageUrl = thumbnailUrl;
        $modalImg.attr('src', thumbnailUrl);
        $modal.css('display', 'block');
      });
    });
  }
  
  // Download image
  $downloadImageBtn.click(function() {
    if (!currentImageUrl) return;
    
    const link = document.createElement('a');
    link.href = currentImageUrl;
    link.download = `youtube-thumbnail-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Close modal
  $closeModal.click(function() {
    $modal.css('display', 'none');
  });
  
  // Close when clicking outside
  $(window).click(function(e) {
    if (e.target === $modal[0]) {
      $modal.css('display', 'none');
    }
  });
});
