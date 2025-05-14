document.getElementById('get-thumbnail').addEventListener('click', function() {
  const url = document.getElementById('yt-url').value;
  const container = document.querySelector('.thumbnails-container');
  
  if (!url) {
    alert('Please enter a YouTube URL');
    return;
  }

  // Clear previous results
  container.innerHTML = '';
  
  // Extract video ID
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/i);
  
  if (!videoId) {
    alert('Invalid YouTube URL');
    return;
  }

  // Create thumbnail URLs
  const qualities = [
    { name: 'Max Resolution', url: `https://img.youtube.com/vi/${videoId[1]}/maxresdefault.jpg` },
    { name: 'High Quality', url: `https://img.youtube.com/vi/${videoId[1]}/hqdefault.jpg` },
    { name: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId[1]}/mqdefault.jpg` },
    { name: 'Standard Quality', url: `https://img.youtube.com/vi/${videoId[1]}/sddefault.jpg` },
    { name: 'Default', url: `https://img.youtube.com/vi/${videoId[1]}/default.jpg` }
  ];

  // Display thumbnails
  qualities.forEach(quality => {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'thumbnail-item';
    
    const img = document.createElement('img');
    img.src = quality.url;
    img.alt = quality.name;
    img.loading = 'lazy';
    
    const downloadBtn = document.createElement('a');
    downloadBtn.href = quality.url;
    downloadBtn.download = `yt-thumbnail-${videoId[1]}-${quality.name.replace(' ', '-')}.jpg`;
    downloadBtn.className = 'download-btn';
    downloadBtn.textContent = `Download ${quality.name}`;
    
    imgDiv.appendChild(img);
    imgDiv.appendChild(downloadBtn);
    container.appendChild(imgDiv);
  });
});
