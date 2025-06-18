document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const focusKeywordInput = document.getElementById('focusKeyword');
  const languageSelect = document.getElementById('languageSelect');
  const generateBtn = document.getElementById('generateBtn');
  const resetBtn = document.getElementById('resetBtn');
  const resultsContainer = document.getElementById('resultsContainer');
  const hashtagsResults = document.getElementById('hashtagsResults');
  const selectedContainer = document.getElementById('selectedContainer');
  const selectedHashtags = document.getElementById('selectedHashtags');
  const copySelectedBtn = document.getElementById('copySelectedBtn');
  const clearSelectedBtn = document.getElementById('clearSelectedBtn');

  // Hashtag database by language
  const hashtagDatabase = {
    en: [
      "#trending", "#viral", "#youtube", "#subscribe", "#like", 
      "#comment", "#share", "#newvideo", "#youtuber", "#youtubechannel",
      "#youtubevideos", "#youtubecommunity", "#youtubelife", "#youtubeguru",
      "#youtubemusic", "#youtubecreator", "#youtubevideo", "#youtubestar"
    ],
    es: [
      "#tendencia", "#viral", "#youtube", "#suscribete", "#meencanta", 
      "#comenta", "#compartir", "#nuevovideo", "#youtuber", "#canaldeyoutube",
      "#videosdeyoutube", "#comunidadyoutube", "#vidayoutuber", "#youtubeguru",
      "#musicayoutube", "#creadordeyoutube", "#videodelyoutube", "#estrellayoutube"
    ],
    fr: [
      "#tendance", "#viral", "#youtube", "#abonnezvous", "#j'aime", 
      "#commentaire", "#partager", "#nouveauvidéo", "#youtuber", "#chainedeyoutube",
      "#vidéosyoutube", "#communauteyoutube", "#vieyoutube", "#youtubeguru",
      "#musiqueyoutube", "#créateuryoutube", "#vidéoyoutube", "#étoileyoutube"
    ],
    de: [
      "#trend", "#viral", "#youtube", "#abonnieren", "#like", 
      "#kommentar", "#teilen", "#neuesvideo", "#youtuber", "#youtubekanal",
      "#youtubevideos", "#youtubegemeinschaft", "#youtubeleben", "#youtubeguru",
      "#youtubemusik", "#youtubeschöpfer", "#youtubevideo", "#youtubestar"
    ],
    hi: [
      "#ट्रेंडिंग", "#वायरल", "#यूट्यूब", "#सब्सक्राइब", "#लाइक", 
      "#कमेंट", "#शेयर", "#नयावीडियो", "#यूट्यूबर", "#यूट्यूबचैनल",
      "#यूट्यूबवीडियो", "#यूट्यूबसमुदाय", "#यूट्यूबजीवन", "#यूट्यूबगुरु",
      "#यूट्यूबसंगीत", "#यूट्यूबनिर्माता", "#यूट्यूबवीडियो", "#यूट्यूबस्टार"
    ],
    pt: [
      "#tendencia", "#viral", "#youtube", "#inscrevase", "#curtir", 
      "#comentar", "#compartilhar", "#novovideo", "#youtuber", "#canaldoyoutube",
      "#videosdoyoutube", "#comunidadeyoutube", "#vidayoutuber", "#youtubeguru",
      "#musicayoutube", "#criadordoyoutube", "#videodoyoutube", "#estrelayoutube"
    ],
    ru: [
      "#тренды", "#вирусный", "#ютуб", "#подписаться", "#лайк", 
      "#комментарий", "#поделиться", "#новоевидео", "#ютубер", "#ютубканал",
      "#ютубвидео", "#ютубсообщество", "#жизньютубера", "#ютубгуру",
      "#музыкаютуба", "#создательконтента", "#видеоютуба", "#звездаютуба"
    ],
    ja: [
      "#トレンド", "#バズる", "#YouTube", "#登録", "#いいね", 
      "#コメント", "#シェア", "#新動画", "#ユーチューバー", "#YouTubeチャンネル",
      "#YouTube動画", "#YouTubeコミュニティ", "#ユーチューバーの生活", "#YouTubeの達人",
      "#YouTube音楽", "#YouTubeクリエイター", "#YouTubeビデオ", "#YouTubeスター"
    ],
    ar: [
      "#ترند", "#فيروسي", "#يوتيوب", "#اشترك", "#إعجاب", 
      "#تعليق", "#مشاركة", "#فيديو_جديد", "#يوتيوبر", "#قناة_يوتيوب",
      "#فيديوهات_يوتيوب", "#مجتمع_يوتيوب", "#حياة_اليوتيوب", "#خبير_يوتيوب",
      "#موسيقى_يوتيوب", "#منشئ_يوتيوب", "#فيديو_يوتيوب", "#نجم_يوتيوب"
    ],
    zh: [
      "#热门", "#病毒", "#YouTube", "#订阅", "#喜欢", 
      "#评论", "#分享", "#新视频", "#YouTuber", "#YouTube频道",
      "#YouTube视频", "#YouTube社区", "#YouTube生活", "#YouTube大师",
      "#YouTube音乐", "#YouTube创作者", "#YouTube视频", "#YouTube明星"
    ]
  };

  // Generate hashtags based on keyword and language
  function generateHashtags() {
    const keyword = focusKeywordInput.value.trim();
    const language = languageSelect.value;
    
    if (!keyword) {
      alert('Please enter a focus keyword');
      return;
    }
    
    if (!language) {
      alert('Please select a language');
      return;
    }
    
    // Clear previous results
    hashtagsResults.innerHTML = '';
    
    // Get base hashtags for selected language
    const baseHashtags = hashtagDatabase[language] || hashtagDatabase['en'];
    
    // Generate keyword-specific hashtags
    const keywordHashtags = [
      `#${keyword.replace(/\s+/g, '')}`,
      `#${keyword.replace(/\s+/g, '_')}`,
      `#${keyword.replace(/\s+/g, '').toLowerCase()}`,
      `#${keyword.replace(/\s+/g, '_').toLowerCase()}`,
      `#best${keyword.replace(/\s+/g, '')}`,
      `#top${keyword.replace(/\s+/g, '')}`,
      `#${keyword.replace(/\s+/g, '')}video`,
      `#${keyword.replace(/\s+/g, '')}videos`,
      `#${keyword.replace(/\s+/g, '')}channel`,
      `#${keyword.replace(/\s+/g, '')}tutorial`
    ];
    
    // Combine and limit to 25-30 hashtags
    const allHashtags = [...new Set([...keywordHashtags, ...baseHashtags])].slice(0, 30);
    
    // Display hashtags
    allHashtags.forEach(hashtag => {
      const tagElement = document.createElement('span');
      tagElement.className = 'hashtag-tag';
      tagElement.textContent = hashtag;
      tagElement.addEventListener('click', () => selectHashtag(hashtag));
      hashtagsResults.appendChild(tagElement);
    });
    
    // Show results container
    resultsContainer.classList.remove('hidden');
    selectedContainer.classList.remove('hidden');
  }
  
  // Select hashtag to copy
  function selectHashtag(hashtag) {
    const selectedTag = document.createElement('span');
    selectedTag.className = 'selected-hashtag';
    selectedTag.textContent = hashtag;
    selectedHashtags.appendChild(selectedTag);
  }
  
  // Copy selected hashtags to clipboard
  function copySelectedHashtags() {
    if (selectedHashtags.children.length === 0) {
      alert('No hashtags selected');
      return;
    }
    
    const hashtags = Array.from(selectedHashtags.children)
      .map(tag => tag.textContent)
      .join(' ');
    
    navigator.clipboard.writeText(hashtags)
      .then(() => alert('Hashtags copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  }
  
  // Clear selected hashtags
  function clearSelectedHashtags() {
    selectedHashtags.innerHTML = '';
  }
  
  // Reset the entire tool
  function resetTool() {
    focusKeywordInput.value = '';
    languageSelect.selectedIndex = 0;
    hashtagsResults.innerHTML = '';
    selectedHashtags.innerHTML = '';
    resultsContainer.classList.add('hidden');
    selectedContainer.classList.add('hidden');
  }
  
  // Event listeners
  generateBtn.addEventListener('click', generateHashtags);
  resetBtn.addEventListener('click', resetTool);
  copySelectedBtn.addEventListener('click', copySelectedHashtags);
  clearSelectedBtn.addEventListener('click', clearSelectedHashtags);
});
