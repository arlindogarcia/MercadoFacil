import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

export default () => {
    return defineConfig({
        plugins: [
            laravel({
                input: [
                    `resources/css/front.css`,
                    `resources/js/front.js`,
                ],
                refresh: true,
            }),
            pluginPurgeCss({
                content: [
                    './resources/views/**/*.blade.php',
                    './resources/js/**/*.js',
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                safelist: {
                    standard: [/^noUi-/, /^home-index-page/],
                    deep: [],
                    greedy: [],
                },
            }),
        ],
    });
};
