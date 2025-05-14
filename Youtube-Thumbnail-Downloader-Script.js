document.addEventListener('DOMContentLoaded', function() {
  const getBtn = document.getElementById('get-thumbnail');
  const urlInput = document.getElementById('yt-url');
  const grid = document.querySelector('.thumbnails-grid');
  const modal = document.getElementById('thumbnail-modal');
  const modalImg = document.getElementById('modal-image');
  const downloadBtn = document.getElementById('download-btn');
  const closeBtn = document.querySelector('.close');
  
  let currentDownloadUrl = '';
  
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
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Download button functionality - WORKING SOLUTION
  downloadBtn.addEventListener('click', function() {
    if (!currentDownloadUrl) return;
    
    // Create temporary link
    const link = document.createElement('a');
    link.href = currentDownloadUrl;
    
    // Generate filename with timestamp
    const timestamp = new Date().getTime();
    link.download = `youtube-thumbnail-${timestamp}.jpg`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fallback
