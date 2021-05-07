// main js file

const navMenuMore = document.querySelector('.nav-menu-more');
const showMore = document.querySelector('.show-more');
const searchForm = document.querySelector('.search-form');
const authBtn = document.querySelector('.auth-btn');
const userAvatar = document.querySelector('.user-avatar');
const authActive = document.querySelector('.auth');
const content = document.querySelector('.content');
const subscriptionsList = document.querySelector('.subs-list');
const likedVideos = document.querySelectorAll('.nav-link-liked');
const trendingVideos = document.querySelectorAll('.nav-link-trending');
const musicVideos = document.querySelector('.nav-link-music');
const gameVideos = document.querySelector('.nav-link-games');

// dataVideo, dataList
const createCard = dataVideo => {

    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = typeof dataVideo.id === 'string' ? dataVideo.id : dataVideo.id.videoId;
    const viewCount = dataVideo.statistics?.viewCount;
    const videoTitle = dataVideo.snippet.title;
    const publishedVideo = dataVideo.snippet.publishedAt;
    const channelTitle = dataVideo.snippet.channelTitle;

    const card = document.createElement('li');
    card.classList.add('video-card');
    card.innerHTML = `
        <div class="video-thumb">
            <a class="link-video youtube-modal" href="https://www.youtube.com/watch?v=${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
            </a>
        </div>

        <h3 class="video-title">${videoTitle}</h3>
        <div class="video-info">
            <span class="video-counter">
                ${viewCount ? `<span class="video-views">${getViews(viewCount)}</span>` : ''}
                <span class="video-date">${getDate(new Date(publishedVideo))}</span>
            </span>
            <span class="video-channel">${channelTitle}</span>
        </div>
    `;

    return card;
};

const createList = (listVideo, title, clear) => {
    const channelTitle = document.createElement('section');
    channelTitle.classList.add('channel');

    if (clear) {
        content.textContent = '';
    }

    if (title) {
        const header = document.createElement('h2');
        header.textContent = title;
        channelTitle.insertAdjacentElement('afterbegin', header);
    }

    const wrapper = document.createElement('ul');
    wrapper.classList.add('video-list');
    channelTitle.insertAdjacentElement('beforeend', wrapper);

    listVideo.forEach(item => {
        const card = createCard(item);
        wrapper.append(card);
    });

    content.insertAdjacentElement('beforeend', channelTitle);
};

const getDate = date => {
    const currentDate = Date.parse(new Date());
    const days = Math.round((currentDate - Date.parse(date)) / 86400000);

    if (days > 30) {
        if (days > 60) {
            return Math.round(days / 30) + ' months ago';
        }
        return 'one month ago';
    }

    if (days > 1) {
        return Math.round(days) + ' days ago';
    }
    return 'one day ago';
};

const getViews = count => {
    if (count >= 1000000) {
        return Math.round(count / 1000000) + 'M views';
    }

    if (count >= 1000) {
        return Math.round(count / 1000) + 'K views';
    }

    return count + ' views';
};

const loadScreenData = () => {
    content.textContent = '';

    // you can put your own, or any channel ID here
    getVideos('UC05mHIxrD6IG7dc3c1lEaJg', data => {
        createList(data, 'Discovery');

        getTrending(data => {
            createList(data, 'Popular videos');

            getMusic(data => {
                createList(data, 'Popular music');
            });
        });
    });

    // search
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const inputValue = searchForm.elements.search.value;
        getSearchResult(inputValue, data => {
            createList(data, 'Search result', true);
        });
    });
};
