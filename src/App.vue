<template>
  <div class="app">
    waooo
    <img :src="lz" alt="龙珠-卡卡罗特">
    <el-button type='info'>click</el-button>
  </div>
</template>

<script>
import lz from '@/assets/img/1.jpg';
import $axios from 'axios';
export default {
  name: 'App',
  components: {},
  props: {},
  data () {
    return {
      lz: lz
    };
  },
  computed: {},
  methods: {},
  created () {
    $axios.get('./static/mock/init.json')
      .then((res) => {
        console.log(res);
      })
  },
  mounted () {
    console.log(process.env.STRING);
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.app {
  transform: translate(10px);
}
</style>
