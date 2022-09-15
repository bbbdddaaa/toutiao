import request from '@/utils/request'

/**
 * 搜素建议
 * @param {*} q 搜索的关键词
 * @returns Promise
 */
export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getResultsAPI = (/* eslint-disable-line */ page, per_page,q) => {
  return request({
    url: 'v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
