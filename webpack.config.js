const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "public"),
		publicPath: "/",
		filename: "main.js",
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react", "@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(scss|sass|css)$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, "public"),
		compress: true,
		port: 3000,
		watchContentBase: true,
		progress: true,
		historyApiFallback: true,
	},
};
