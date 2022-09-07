<template>
  <div>
    <!-- <router-view></router-view> -->
    <h1>{{ count }}</h1>
    <h1>{{ bigNum }}</h1>
    <button @click="SET_COUNT(10)">点击count+1</button>
  </div>
</template>

<script>
// git log 查看commit记录
// git

// mapState --> 将vuex里面state映射到computed
// 使用
// - 引入mapState：函数，返回一个对象
// - 参数： ['映射的属性']
// mapGetters --> 将vuex里面state映射到computed

// mapMutations --> 将vuex里面state映射到methods
import { mapState, mapGetters, mapMutations } from 'vuex'
console.log(mapState(['count']))
export default {
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // },
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
    // count() {
    //   return this.$store.state.count
    // }
  }
}
</script>

<style></style>
