<template>
<div class="cup-container">
    <span class="steam-container" v-show="loading">
      <div class="steam" id="steam-one"></div>
      <div class="steam" id="steam-two"></div>
      <div class="steam" id="steam-three"></div>
      <div class="steam" id="steam-four"></div>
    </span>
    <div :class="loading ? 'hide' : 'buffer'"></div>
  <div class='cup'>
    <div class='filled'></div>
  </div>
</div>
</template>

<script>
export default {
  name: "loading",
  props: ["loading"],
  data() {
    return {};
  }
};
</script>
<style type="text/css">
.hide {
  display: none;
}
.buffer {
  height: 60px;
}
.cup-container {
  margin: -1em auto;
  font-size: 0.2rem;
}
.steam-container {
  position: relative;
  top: 100px;
}
.cup {
  margin: 5em auto 3rem;
  width: 8em;
  height: 6em;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
}
.cup:before,
.cup:after {
  content: "";
  display: block;
  float: left;
  box-shadow: 0 0 0 0.5em #262626;
  position: absolute;
}
.cup:before {
  height: 1.541em;
  width: 1.0803em;
  margin: 1.2rem 8.5886em;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
}
.cup:after {
  height: 0.5em;
  width: 7.24427em;
  box-shadow: rgb(38, 38, 38) 0px 0.5em 0px 0.61803em inset;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  margin: 6.0884em 0.25rem;
}

.cup .filled {
  display: block;
  width: 101%;
  height: 100%;
  float: left;
  border-bottom-left-radius: 3.90909em;
  border-bottom-right-radius: 3.90909em;
  -webkit-box-shadow: inset 0 0 0 0.23607em #ecf0f1, 0 0 0 0.5em #262626;
  box-shadow: inset 0 0 0 0.23607em #ecf0f1, 0 0 0 0.5em #262626;
  margin-left: -1px;
  margin-right: 3px;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(25%, #ecf0f1),
    color-stop(25%, #427745),
    color-stop(50%, #31584e),
    color-stop(50%, #2b4e4e),
    color-stop(75%, #253d44),
    color-stop(75%, #1a2130)
  );
  background-image: linear-gradient(
    to bottom,
    #ecf0f1 25%,
    #427745 25%,
    #31584e 50%,
    #2b4e4e 50%,
    #253d44 75%,
    #1a2130 75%
  );
}

.steam {
  height: 15px;
  width: 15px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #262626;
  z-index: 0;
  opacity: 0;
}

#steam-one {
  -webkit-animation: steam-one 4s ease-out infinite;
  animation: steam-one 4s ease-out infinite;
}

#steam-three {
  -webkit-animation: steam-one 4s ease-out 1s infinite;
  animation: steam-one 4s ease-out 1s infinite;
}

@-webkit-keyframes steam-one {
  0% {
    transform: translateY(0) translateX(0) scale(0.25);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-200px) translateX(-20px) scale(1);
    opacity: 0;
  }
}

@keyframes steam-one {
  0% {
    transform: translateY(0) translateX(0) scale(0.25);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-200px) translateX(-20px) scale(1);
    opacity: 0;
  }
}

#steam-two {
  -webkit-animation: steam-two 4s ease-out 0.5s infinite;
  animation: steam-two 4s ease-out 0.5s infinite;
}

#steam-four {
  -webkit-animation: steam-two 4s ease-out 1.5s infinite;
  animation: steam-two 4s ease-out 1.5s infinite;
}

@-webkit-keyframes steam-two {
  0% {
    transform: translateY(0) translateX(0) scale(0.25);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-200px) translateX(20px) scale(1);
    opacity: 0;
  }
}

@keyframes steam-two {
  0% {
    transform: translateY(0) translateX(0) scale(0.25);
    opacity: 0.2;
  }
  100% {
    transform: translateY(-200px) translateX(20px) scale(1);
    opacity: 0;
  }
}
</style>
