import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([{
    extends: [...nextCoreWebVitals],

    rules: {
        "@next/next/no-img-element": "off",
        "react-hooks/refs": "off",
        "react-hooks/set-state-in-effect": "off",
    },
}]);