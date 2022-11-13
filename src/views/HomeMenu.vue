<script setup>
const albumCover = "https://lastfm.freetls.fastly.net/i/u/770x0/6f2784172913db6982b2f6de18b837f6.jpg#6f2784172913db6982b2f6de18b837f6";
const trackList = ["Die For You", "BLAHBLAHBLAH DEMO", "Glimpse of Us", "1AM Freestyle"];
const albumList = [
    {
        name: "After Hours",
        cover: "https://lastfm.freetls.fastly.net/i/u/770x0/7d957bd27dd562bee7aaa89eafa0bbe6.jpg#7d957bd27dd562bee7aaa89eafa0bbe6",
        artist: "The Weeknd",
    },
    {
        name: "SMITHEREENS",
        cover: "https://lastfm.freetls.fastly.net/i/u/770x0/6f2784172913db6982b2f6de18b837f6.jpg#6f2784172913db6982b2f6de18b837f6",
        artist: "Joji",
    },
    {
        name: "Nectar",
        cover: "https://lastfm.freetls.fastly.net/i/u/770x0/71da7e08ec27c0c83b1133c0e6d1ca51.jpg#71da7e08ec27c0c83b1133c0e6d1ca51",
        artist: "Joji",
    },
    {
        name: "Face The Sun",
        cover: "https://lastfm.freetls.fastly.net/i/u/770x0/a6ca584491130520db4092d04c32e907.jpg#a6ca584491130520db4092d04c32e907",
        artist: "Seventeen",
    }
];

const artistList = [{
    name: "Joji",
    cover: "https://lastfm.freetls.fastly.net/i/u/770x0/6f2784172913db6982b2f6de18b837f6.jpg#6f2784172913db6982b2f6de18b837f6",
}, {
    name: "Xdinary Heroes",
    cover: "https://lastfm.freetls.fastly.net/i/u/770x0/048f22b0516b92c7f29663c9008aac43.jpg#048f22b0516b92c7f29663c9008aac43",
},
{
    name: "The Weeknd",
    cover: "https://lastfm.freetls.fastly.net/i/u/770x0/7d957bd27dd562bee7aaa89eafa0bbe6.jpg#7d957bd27dd562bee7aaa89eafa0bbe6",
},
{
    name: "Seventeen",
    cover: "https://lastfm.freetls.fastly.net/i/u/770x0/a6ca584491130520db4092d04c32e907.jpg#a6ca584491130520db4092d04c32e907",
}];
</script>

<template>
    <div id="homeMenu">
        <div id="recentSongs">
            <h2>Recently Played Songs</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Track in trackList.slice(0, 4)">
                    <router-link to="/album/SMITHEREENS"><img class="albumCover" :src="albumCover"></router-link>
                    <div class="itemName clickableItemInfo">{{ Track }}</div>
                    <div class="artistName clickableItemInfo">Joji</div>
                </div>
                <div class="seeMoreItem">See more...</div>
            </div>
        </div>

        <div id="recentAlbums">
            <h2>Recently Played Albums</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Album in albumList.slice(0, 4)">
                    <img class="albumCover" :src="Album.cover">
                    <div class="itemName clickableItemInfo">{{ Album.name }}</div>
                    <div class="artistName clickableItemInfo">{{ Album.artist }}</div>
                </div>
                <div class="seeMoreItem">See more...</div>
            </div>
        </div>

        <div id="recentArtists">
            <h2>Recently Played Artists</h2>
            <div class="recentCoasterMenu">
                <div class="coasterItem" v-for="Artist in artistList.slice(0, 4)">
                    <img class="albumCover" :src="Artist.cover">
                    <div class="itemName clickableItemInfo">{{ Artist.name }}</div>
                </div>
                <div class="seeMoreItem">See more...</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#homeMenu {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
}

.recentCoasterMenu {
    display: flex;
    gap: 30px;
    margin: 20px;
    border-radius: 10px;
    width: 1020px;
}

.seeMoreItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 180px;
    border: solid 1px #272727;
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    transition: 250ms ease;
}

.seeMoreItem:hover {
    filter: brightness(85%);
    cursor: pointer;
}

.coasterItem {
    max-width: 180px;
    font-size: 0.9rem;
    font-weight: 500;
}

.artistName {
    font-size: 0.8rem;
}

.albumCover {
    height: 180px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    user-select: none;
    filter: brightness(100%);
    transition: 250ms ease;
}

.albumCover:hover {
    filter: brightness(85%);
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
</style>