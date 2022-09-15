<template>
  <div>
    <van-cell
      v-for="(item, index) in heightLightSuggestions"
      :key="index"
      icon="search"
      @click="$emit('change-keywords', suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 1.输入了第一个字符：决定渲染SearchSuggestion

// 2.map 返回新数组，长度和原数组一直，函数的返回值新数组那一项值

// 动态正则
// - /Auglar/ig字面量形式的正则 ，不能动态生成正则内容
// - new RegExp（字符串/变量，修饰符‘ig’） regular expression

// 字符串的replece
// 这个函数参数match，匹配上的结果，函数的返回值作为替换的结果
import { debounce } from 'lodash'
import { getSuggestionsAPI } from '@/api'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  computed: {
    heightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>`
        )
      })
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options.filter(Boolean)
        console.log(data)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
