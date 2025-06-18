jQuery(document).ready(function($) {
    // Elements
    const $focusKeyword = $('#focusKeyword');
    const $languageSelect = $('#languageSelect');
    const $generateBtn = $('#generateBtn');
    const $resetBtn = $('#resetBtn');
    const $resultsContainer = $('#resultsContainer');
    const $hashtagsResults = $('#hashtagsResults');
    const $selectedContainer = $('#selectedContainer');
    const $selectedHashtags = $('#selectedHashtags');
    const $copySelectedBtn = $('#copySelectedBtn');
    const $clearSelectedBtn = $('#clearSelectedBtn');

    // Hashtag database
    const hashtagDatabase = {
        en: ["#trending","#viral","#youtube","#subscribe","#like","#comment","#share","#newvideo","#youtuber","#youtubechannel","#youtubevideos","#youtubecommunity","#youtubelife","#youtubeguru","#youtubemusic","#youtubecreator","#youtubevideo","#youtubestar"],
        es: ["#tendencia","#viral","#youtube","#suscribete","#meencanta","#comenta","#compartir","#nuevovideo","#youtuber","#canaldeyoutube","#videosdeyoutube","#comunidadyoutube","#vidayoutuber","#youtubeguru","#musicayoutube","#creadordeyoutube","#videodelyoutube","#estrellayoutube"],
        fr: ["#tendance","#viral","#youtube","#abonnezvous","#j'aime","#commentaire","#partager","#nouveauvidéo","#youtuber","#chainedeyoutube","#vidéosyoutube","#communauteyoutube","#vieyoutube","#youtubeguru","#musiqueyoutube","#créateuryoutube","#vidéoyoutube","#étoileyoutube"],
        de: ["#trend","#viral","#youtube","#abonnieren","#like","#kommentar","#teilen","#neuesvideo","#youtuber","#youtubekanal","#youtubevideos","#youtubegemeinschaft","#youtubeleben","#youtubeguru","#youtubemusik","#youtubeschöpfer","#youtubevideo","#youtubestar"],
        hi: ["#ट्रेंडिंग","#वायरल","#यूट्यूब","#सब्सक्राइब","#लाइक","#कमेंट","#शेयर","#नयावीडियो","#यूट्यूबर","#यूट्यूबचैनल","#यूट्यूबवीडियो","#यूट्यूबसमुदाय","#यूट्यूबजीवन","#यूट्यूबगुरु","#यूट्यूबसंगीत","#यूट्यूबनिर्माता","#यूट्यूबवीडियो","#यूट्यूबस्टार"],
        pt: ["#tendencia","#viral","#youtube","#inscrevase","#curtir","#comentar","#compartilhar","#novovideo","#youtuber","#canaldoyoutube","#videosdoyoutube","#comunidadeyoutube","#vidayoutuber","#youtubeguru","#musicayoutube","#criadordoyoutube","#videodoyoutube","#estrelayoutube"],
        ru: ["#тренды","#вирусный","#ютуб","#подписаться","#лайк","#комментарий","#поделиться","#новоевидео","#ютубер","#ютубканал","#ютубвидео","#ютубсообщество","#жизньютубера","#ютубгуру","#музыкаютуба","#создательконтента","#видеоютуба","#звездаютуба"],
        ja: ["#トレンド","#バズる","#YouTube","#登録","#いいね","#コメント","#シェア","#新動画","#ユーチューバー","#YouTubeチャンネル","#YouTube動画","#YouTubeコミュニティ","#ユーチューバーの生活","#YouTubeの達人","#YouTube音楽","#YouTubeクリエイター","#YouTubeビデオ","#YouTubeスター"],
        ar: ["#ترند","#فيروسي","#يوتيوب","#اشترك","#إعجاب","#تعليق","#مشاركة","#فيديو_جديد","#يوتيوبر","#قناة_يوتيوب","#فيديوهات_يوتيوب","#مجتمع_يوتيوب","#حياة_اليوتيوب","#خبير_يوتيوب","#موسيقى_يوتيوب","#منشئ_يوتيوب","#فيديو_يوتيوب","#نجم_يوتيوب"],
        zh: ["#热门","#病毒","#YouTube","#订阅","#喜欢","#评论","#分享","#新视频","#YouTuber","#YouTube频道","#YouTube视频","#YouTube社区","#YouTube生活","#YouTube大师","#YouTube音乐","#YouTube创作者","#YouTube视频","#YouTube明星"]
    };

    // Generate hashtags
    function generateHashtags() {
        const keyword = $focusKeyword.val().trim();
        const language = $languageSelect.val();
        
        if (!keyword) {
            alert('Please enter a focus keyword');
            return;
        }
        
        if (!language) {
            alert('Please select a language');
            return;
        }
        
        $hashtagsResults.empty();
        const baseHashtags = hashtagDatabase[language] || hashtagDatabase['en'];
        
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
        
        const allHashtags = [...new Set([...keywordHashtags, ...baseHashtags])].slice(0, 30);
        
        allHashtags.forEach(hashtag => {
            $('<span>')
                .addClass('hashtag-tag')
                .text(hashtag)
                .click(() => selectHashtag(hashtag))
                .appendTo($hashtagsResults);
        });
        
        $resultsContainer.removeClass('hidden');
        $selectedContainer.removeClass('hidden');
    }
    
    // Select hashtag
    function selectHashtag(hashtag) {
        $('<span>')
            .addClass('selected-hashtag')
            .text(hashtag)
            .appendTo($selectedHashtags);
    }
    
    // Copy selected
    $copySelectedBtn.click(function() {
        if ($selectedHashtags.children().length === 0) {
            alert('No hashtags selected');
            return;
        }
        
        const hashtags = $selectedHashtags.children()
            .map((i, el) => $(el).text())
            .get()
            .join(' ');
        
        navigator.clipboard.writeText(hashtags)
            .then(() => alert('Hashtags copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    });
    
    // Clear selected
    $clearSelectedBtn.click(function() {
        $selectedHashtags.empty();
    });
    
    // Reset
    $resetBtn.click(function() {
        $focusKeyword.val('');
        $languageSelect.val('');
        $hashtagsResults.empty();
        $selectedHashtags.empty();
        $resultsContainer.addClass('hidden');
        $selectedContainer.addClass('hidden');
    });
    
    // Generate
    $generateBtn.click(generateHashtags);
});
