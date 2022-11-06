<script setup>
defineProps({
  albumInfo: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div id="mainBody">
    <div id="album">
      <div v-if="albumInfo.albumCover">
        <img :src="albumInfo.albumCover" id="albumCover">
      </div>
      <div id="albumInfo">
        <div class="title">{{ albumInfo.albumName }} • {{ albumInfo.artistName }}</div>
        <p>{{ albumInfo.releaseYear }}</p>

        <div id="mainButtons">
          <button class="danger-button">
            <i class="fa-solid fa-play"></i> Play
          </button>
          <button class="danger-button">
            <i class="fa-solid fa-shuffle"></i> Shuffle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-top: 12px;
  color: #bb1c24;
}

#mainBody {
  width: 100%;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #161616;
}

#album {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  width: 100%;
  gap: 20px;
}

#albumInfo {
  margin-top: 0;
}

#albumCover {
  height: 170px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.smallThumbnail {
  width: 32px;
  border-radius: 100%;
}

#mainButtons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.danger-button {
  background-color: #e32029;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 7px;
  width: 120px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: 250ms ease;
}

.danger-button:hover {
  background-color: #a71a21;
}

.title {
  font-size: 1.9rem;
  font-weight: 700;
  color: rgb(227, 32, 41);
  filter: drop-shadow(0 0 0.3em rgba(227, 32, 41, 0.3));
}

.subTitle {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
