export default (options) => {
  return {
    // 转换html的
    // 将我们插件的一个执行时机提前
    transformIndexHtml: {
      enforce: "pre",
      transform: (html, ctx) => {
        const keys = Object.keys(options.inject.data);
        return keys.reduce((prev, key) => {
          return prev.replaceAll(`<%= ${key} %>`, options.inject.data[key]);
        }, html);
      },
    },
  };
};
