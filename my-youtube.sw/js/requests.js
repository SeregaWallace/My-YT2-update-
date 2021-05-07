// requests
const getChannel = () => {
    gapi.client.youtube.channels.list({
        part: 'snippet, statistics',
            // you can put your own, or any channel ID here
        id: 'UC05mHIxrD6IG7dc3c1lEaJg',
    }).execute(response => {
        console.log(response);
    })
};

const getSearchResult = (text, cb, maxResults = 6) => {
    gapi.client.youtube.search.list({
        part: 'snippet',
        q: text,
        maxResults,
        order: 'relevance',
    })
    .execute(response => {
        cb(response.items);
    })
};

const getVideos = (channelId, cb, maxResults = 6) => {
    gapi.client.youtube.search.list({
        part: 'snippet',
        channelId,
        maxResults,
        order: 'date',
    })
    .execute(response => {
        cb(response.items);
    })
};

const getTrending = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults,
    })
    .execute(response => {
        cb(response.items);
    })
};

const getMusic = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults,
        videoCategoryId: '10',
    })
    .execute(response => {
        cb(response.items);
    })
};

const getSubscriptions = (cb, maxResults = 6) => {
    gapi.client.youtube.subscriptions.list({
        part: 'snippet',
        maxResults,
        order: 'alphabetical',
        mine: 'true',
    })
    .execute(response => {
        cb(response.items);
    })
};

const getLikedVideos = (cb, maxResults = 12) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics, contentDetails',
        maxResults,
        myRating: 'like',
    })
    .execute(response => {
        cb(response.items);
    })
}

const getGameVideos = (cb, maxResults = 6) => {
    gapi.client.youtube.videos.list({
        part: 'snippet, statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults,
        videoCategoryId: '20',
    })
    .execute(response => {
        cb(response.items);
    })
};