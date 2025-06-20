document.addEventListener('DOMContentLoaded', function() {
  const downloadBtn = document.getElementById('downloadBtn');
  const resetBtn = document.getElementById('resetBtn');
  const urlInput = document.getElementById('youtubeUrl');
  const resultContainer = document.getElementById('thumbnailResult');

  downloadBtn.addEventListener('click', function() {
    const videoUrl = urlInput.value.trim();
    if (!videoUrl) {
      alert('Please enter a YouTube URL');
      return;
    }

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert('Invalid URL. Example: https://youtu.be/dQw4w9WgXcQ');
      return;
    }

    showThumbnails(videoId);
  });

  resetBtn.addEventListener('click', function() {
    urlInput.value = '';
    resultContainer.innerHTML = '';
  });

  function extractVideoId(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function showThumbnails(videoId) {
    resultContainer.innerHTML = '';
    
    const qualities = [
      { name: '4K Quality', code: 'maxresdefault' },
      { name: 'HD Quality', code: 'hqdefault' },
      { name: 'SD Quality', code: 'sddefault' }
    ];

    qualities.forEach(quality => {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality.code}.jpg`;
      
      const thumbnailItem = document.createElement('div');
      thumbnailItem.className = 'thumbnail-item';
      
      const img = document.createElement('img');
      img.className = 'thumbnail-img';
      img.src = thumbnailUrl;
      img.alt = quality.name;
      
      const label = document.createElement('div');
      label.className = 'quality-label';
      label.textContent = quality.name;
      
      thumbnailItem.appendChild(img);
      thumbnailItem.appendChild(label);
      resultContainer.appendChild(thumbnailItem);
    });
  }
});
