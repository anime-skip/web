<template>
  <router-view/>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Overpass:200i,400,600,700,900");

::selection {
  background: #b3e5fc;
}

body,
html {
  height: 100%;
}

body,
body * {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2,
h3,
h4,
h5,
h6,
button {
  font-family: "Overpass", sans-serif;
}

.hover:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.flex-row {
  display: flex;
  flex-direction: row;
}

a {
  color: #03a9f4;
}

.button {
  display: block;
  min-height: 36px;
  outline: none;
  box-sizing: border-box;
  border: none;
  background-color: #673ab7;
  color: white;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  line-height: 24px;
  cursor: pointer;
  padding: 6px 16px;
  border-radius: 3px;
}

.button:hover {
  background-color: #7e57c2;
}

.button:disabled {
  opacity: 0.7;
  pointer-events: none;
}

.button a {
  text-decoration: none;
}

.button--secondary {
  background-color: #03a9f4;
  color: white;
}

.button--secondary:hover {
  background-color: #29b6f6;
}

.button--white {
  background-color: white;
  color: #5f2e77;
}

.button--white:hover {
  background-color: #f8f8f8;
}

.button--white:active {
  background-color: #f8f8f8;
}

.button--white a {
  color: white;
}

.button--white {
  background-color: #f8f8f8;
}

.button--flat {
  text-transform: none;
  background-color: transparent;
  color: #673ab7;
}

.button--flat:hover {
  background-color: rgba(0, 0, 0, 0.08);
}

.button--flat.button--secondary {
  color: #03a9f4;
}

.button--flat.button--white {
  color: white;
}

code.letter-list {
  font-family: monospace;
  background-color: rgba(0, 0, 0, 0.12);
  padding: 2px 4px;
  line-height: 14px;
  border-radius: 2px;
  margin-left: 4px;
}

ul,
ol {
  padding-left: 16px;
}
</style>
