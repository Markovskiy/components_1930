module.exports = {
	entry: {
		app: './src/js/app.js',
	},
	output: {
		filename: '[name].min.js',
		path: 'public/js/',
	},
	devtool: 'inline-module-source-map',
	cache: true,
	module: {
		loaders: [
			{
				test: /\.jade$/,
				loader: 'jade',
			},
			{
				test: /\.css$/,
				loader: 'style!css',
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: [/node_modules/],
				query: {
					presets: ['es2015'],
				},
			},
		],
	},
};
