module.exports = {
	extends: [
		"@dap/eslint-config-portal-common/react"
	].map(require.resolve),
	env: {
		"browser": true,
		"node": true
	},
	rules: {
		// Disable strict warning on ES6 Components
		"sort-imports": 0,
		"react/jsx-indent-props": [2, "tab"],
		"complexity": "off"
	}
};
