document.addEventListener('DOMContentLoaded', function() {
  const getBtn = document.getElementById('get-thumbnail');
  const urlInput = document.getElementById('yt-url');
  const grid = document.querySelector('.thumbnails-grid');
  const modal = document.getElementById('thumbnail-modal');
  const modalImg = document.getElementById('modal-image');
  const downloadBtn = document.getElementById('download-btn');
  const closeBtn = document.querySelector('.close');
  
  // Get thumbnails function
  getBtn.addEventListener('click', function() {
    const url = urlInput.value.trim();
    
    if (!url) {
      alert('Please enter a YouTube URL');
      return;
    }
    
    const videoId = extractVideoId(url);
    if (!videoId) {
      alert('Invalid YouTube URL. Please check and try again.');
      return;
    }
    
    displayThumbnails(videoId);
  });
  
  // Close modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Click outside image to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  
  function displayThumbnails(videoId) {
    grid.innerHTML = '';
    
    const thumbnails = [
      {
        quality: 'MAX Resolution',
        url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        type: 'maxresdefault'
      },
      {
        quality: 'High Quality',
        url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        type: 'hqdefault'
      },
      {
        quality: 'Medium Quality',
        url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        type: 'mqdefault'
      },
      {
        quality: 'Standard Quality',
        url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        type: 'sddefault'
      },
      {
        quality: 'Low Quality',
        url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
        type: 'default'
      }
    ];
    
    thumbnails.forEach(thumb => {
      const item = document.createElement('div');
      item.className = 'thumbnail-item';
      
      const img = document.createElement('img');
      img.className = 'thumbnail-img';
      img.src = thumb.url;
      img.alt = thumb.quality;
      img.loading = 'lazy';
      
      const label = document.createElement('div');
      label.className = 'quality-label';
      label.textContent = thumb.quality;
      
      item.appendChild(img);
      item.appendChild(label);
      grid.appendChild(item);
      
      // Click event for each thumbnail
      item.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = thumb.url;
        downloadBtn.href = thumb.url;
        downloadBtn.download = `youtube-thumbnail-${videoId}-${thumb.type}.jpg`;
      });
    });
  }
});
