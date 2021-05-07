// navigation
showMore.addEventListener('click', event => {
    event.preventDefault();
    navMenuMore.classList.toggle('nav-menu-more-show');
});

subscriptionsList.addEventListener('click', event => {
    event.preventDefault();
    const target = event.target;
    const linkChannel = target.closest('.nav-link');
    const channelId = linkChannel.dataset.channelId;
    const channelTitle = linkChannel.dataset.title;
    getVideos(channelId, data => {
        createList(data, channelTitle, true);
    }, 12)
});

likedVideos.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        getLikedVideos(data => {
            createList(data, 'liked videos', true);
        })
    });
});

trendingVideos.forEach(elem => {
    elem.addEventListener('click', event => {
        event.preventDefault();
        getTrending(data => {
            createList(data, 'trending videos', true);
        })
    });
});

musicVideos.addEventListener('click', event => {
    event.preventDefault();
    getMusic(data => {
        createList(data, 'music', true);
    });
});

gameVideos.addEventListener('click', event => {
    event.preventDefault();
    getGameVideos(data => {
        createList(data, 'games', true);
    });
});