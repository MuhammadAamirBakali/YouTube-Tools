<script>
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');
    const videoUrl = document.getElementById('videoUrl');
    const resultsContainer = document.getElementById('resultsContainer');
    const thumbnailsGrid = document.querySelector('.thumbnails-grid');
    
    downloadBtn.addEventListener('click', function() {
        const url = videoUrl.value.trim();
        if (!url) {
            alert('Please enter a YouTube video URL');
            return;
        }
        
        // Extract video ID from URL
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1].split('&')[0];
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('youtube.com/shorts/')) {
            videoId = url.split('shorts/')[1].split('?')[0];
        }
        
        if (!videoId) {
            alert('Invalid YouTube URL. Please check and try again.');
            return;
        }
        
        // Clear previous results
        thumbnailsGrid.innerHTML = '';
        
        // Create thumbnail URLs for all qualities
        const qualities = [
            { name: '4K Quality', code: 'maxresdefault' },
            { name: 'HD Quality', code: 'hqdefault' },
            { name: 'High Quality', code: 'sddefault' },
            { name: 'Standard Quality', code: 'mqdefault' },
            { name: 'Medium Quality', code: 'default' },
            { name: 'Low Quality', code: '1' }
        ];
        
        qualities.forEach(quality => {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality.code}.jpg`;
            
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item';
            
            const img = document.createElement('img');
            img.src = thumbnailUrl;
            img.alt = quality.name;
            img.loading = 'lazy';
            
            const qualityLabel = document.createElement('div');
            qualityLabel.className = 'thumbnail-quality';
            qualityLabel.textContent = quality.name;
            
            const downloadLink = document.createElement('a');
            downloadLink.href = thumbnailUrl;
            downloadLink.className = 'download-btn';
            downloadLink.textContent = 'Download Image';
            downloadLink.setAttribute('download', `youtube-thumbnail-${quality.code}.jpg`);
            
            thumbnailItem.appendChild(img);
            thumbnailItem.appendChild(qualityLabel);
            thumbnailItem.appendChild(downloadLink);
            
            thumbnailsGrid.appendChild(thumbnailItem);
        });
        
        resultsContainer.classList.remove('hidden');
    });
    
    resetBtn.addEventListener('click', function() {
        videoUrl.value = '';
        resultsContainer.classList.add('hidden');
        thumbnailsGrid.innerHTML = '';
    });
});
</script>
