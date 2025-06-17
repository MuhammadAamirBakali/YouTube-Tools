<script>
document.addEventListener('DOMContentLoaded', function() {
  const generateBtn = document.getElementById('generate-btn');
  const tagInput = document.getElementById('tag-input');
  const resultsContainer = document.getElementById('results-container');
  const tagsOutput = document.getElementById('tags-output');
  const copyBtn = document.getElementById('copy-btn');
  const resetBtn = document.getElementById('reset-btn');
  const buttonText = document.querySelector('.button-text');
  const loadingSpinner = document.querySelector('.loading-spinner');

  // Generate Tags Function
  generateBtn.addEventListener('click', function() {
    const text = tagInput.value.trim();
    
    if (!text) {
      alert('Please enter a video topic');
      return;
    }
    
    buttonText.textContent = 'Generating...';
    loadingSpinner.style.display = 'inline-block';
    generateBtn.disabled = true;
    
    setTimeout(() => {
      const tags = generateTagsLocally(text);
      displayTags(tags);
      buttonText.textContent = 'Generate Tags';
      loadingSpinner.style.display = 'none';
      generateBtn.disabled = false;
    }, 800);
  });

  // Local Tag Generation (Updated to use 2025)
  function generateTagsLocally(text) {
    const words = text.toLowerCase().split(/\s+/);
    const baseTags = words.filter(w => w.length > 3);
    
    const variations = [
      ...baseTags,
      ...baseTags.map(w => w + ' 2025'),
      ...baseTags.map(w => w + ' tips'),
      ...baseTags.map(w => w + ' tutorial'),
      ...baseTags.map(w => 'how to ' + w),
      ...baseTags.map(w => 'best ' + w),
      ...baseTags.map(w => w + ' for beginners'),
      ...baseTags.map(w => w + ' tricks'),
    ];
    
    return [...new Set(variations)].slice(0, 30);
  }

  // Display Tags in Box
  function displayTags(tags) {
    tagsOutput.textContent = tags.join(', ');
    resultsContainer.style.display = 'block';
  }

  // Copy All Tags
  copyBtn.addEventListener('click', function() {
    const tags = tagsOutput.textContent;
    navigator.clipboard.writeText(tags)
      .then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy All Tags';
        }, 2000);
      });
  });

  // Reset Function
  resetBtn.addEventListener('click', function() {
    tagInput.value = '';
    tagsOutput.textContent = '';
    resultsContainer.style.display = 'none';
  });
});
</script>
