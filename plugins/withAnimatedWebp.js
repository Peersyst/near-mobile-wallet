const { createRunOncePlugin, withGradleProperties } = require("@expo/config-plugins");

const withAnimatedWebp = (config) => {
    const itemToModify = {
        type: "property",
        key: "expo.webp.animated",
        value: "true",
    };

    return withGradleProperties(config, (config) => {
        config.modResults = config.modResults.filter((item) => !(item.type === itemToModify.type && item.key === itemToModify.key));

        config.modResults.push(itemToModify);

        return config;
    });
};

module.exports = createRunOncePlugin(withAnimatedWebp, "animated-webp-support", "1.0.0");
