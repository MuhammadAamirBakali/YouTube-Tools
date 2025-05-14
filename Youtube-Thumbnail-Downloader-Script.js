document.addEventListener('DOMContentLoaded', function() {
  // Get all elements
  const getBtn = document.getElementById('get-thumbnail');
  const urlInput = document.getElementById('yt-url');
  const grid = document.querySelector('.thumbnails-grid');
  const modal = document.getElementById('thumbnail-modal');
  const modalImg = document.getElementById('modal-image');
  const downloadBtn = document.getElementById('download-btn');
  const closeBtn = document.querySelector('.close');
  
  let currentDownloadUrl = '';

  // Debugging: Check if elements exist
  console.log('Get Button:', getBtn);
  console.log('URL Input:', urlInput);
  console.log('Grid:', grid);

  // Get thumbnails function - FIXED VERSION
  getBtn.addEventListener('click', function() {
    console.log('Button clicked!'); // Debug log
    
    const url = urlInput.value.trim();
    console.log('URL entered:', url); // Debug log
    
    if (!url) {
      alert('Please enter a YouTube URL');
      return;
    }
    
    const videoId = extractVideoId(url);
    console.log('Extracted Video ID:', videoId); // Debug log
    
    if (!videoId) {
      alert('Invalid YouTube URL. Please check and try again.');
      return;
    }
    
    displayThumbnails(videoId);
  });

  // Rest of the code remains same as previous working version...
  // [Keep all other functions exactly as they were]
  
  function extractVideoId(url) {
    // Improved URL matching
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function displayThumbnails(videoId) {
    console.log('Displaying thumbnails for:', videoId); // Debug log
    grid.innerHTML = '<div class="loading">Loading thumbnails...</div>';
    
    const thumbnails = [
      { quality: 'MAX Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
      { quality: 'High Quality', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
      { quality: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
      { quality: 'Standard Quality', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
      { quality: 'Low Quality', url: `https://img.youtube.com/vi/${videoId}/default.jpg` }
    ];
    
    // Clear loading message
    grid.innerHTML = '';
    
    thumbnails.forEach(thumb => {
      const img = new Image();
      img.src = thumb.url;
      img.onload = function() {
        const item = document.createElement('div');
        item.className = 'thumbnail-item';
        
        img.className = 'thumbnail-img';
        img.alt = thumb.quality;
        img.loading = 'lazy';
        
        const label = document.createElement('div');
        label.className = 'quality-label';
        label.textContent = thumb.quality;
        
        item.appendChild(img.cloneNode());
        item.appendChild(label);
        grid.appendChild(item);
        
        // Click event for each thumbnail
        item.addEventListener('click', function() {
          modal.style.display = 'block';
          modalImg.src = thumb.url;
          currentDownloadUrl = thumb.url;
        });
      };
      
      img.onerror = function() {
        console.log('Failed to load:', thumb.url);
      };
    });
  }
});
