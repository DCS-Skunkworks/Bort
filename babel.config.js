module.exports = function babel(api) {
    const BABEL_ENV = api.env();
    const presets = [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
            },
        ],
    ];
    const plugins = [
        [
            '@babel/plugin-transform-runtime',
            {
                regenerator: true,
            },
        ],
    ];
    if (BABEL_ENV === 'development') {
        plugins.push('react-refresh/babel');
    }
    return {
        presets,
        plugins,
    };
};
