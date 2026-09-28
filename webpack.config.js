const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={entry:'./src/scripts/index.js',mode:'development',output:{filename:'main.js',path:path.resolve(__dirname,'dist'),clean:true},devServer:{static:'./dist',open:true},module:{rules:[{test:/\.js$/,exclude:/node_modules/,use:'babel-loader'},{test:/\.css$/,use:['style-loader','css-loader','postcss-loader']},{test:/\.(png|svg|jpg|jpeg|gif|woff2?)$/,type:'asset/resource'},{test:/\.html$/,use:'html-loader'}]},plugins:[new HtmlWebpackPlugin({template:'./src/index.html'})]};
