const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async (config) => {
    let androidManifest = config.modResults.manifest;

    // 添加 usesCleartextTraffic 属性
    if (androidManifest['application']) {
      const config2 = androidManifest['application'].find((i) => !!i.$);
      if (config2 && config2.$) {
        config2.$['android:usesCleartextTraffic'] = 'true';
      }
    }

    return config;
  });
};
