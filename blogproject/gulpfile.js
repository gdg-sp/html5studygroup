/**
 * Gulp Application render
 * @author Rafael Antonio Lucio <rafaelantoniolucio@gmail.com>
 */

var gulp = require('gulp');

/**
 * Gulp Utils utilizado para executar serviços globais.
 *
 * node-url
 * Este módulo tem utilitários de resolução de URL e análise significava ter 
 * paridade de recursos com o módulo url node.js núcleo. https://github.com/defunctzombie/node-url
 */
var url = require('url');

/**
 * Javacript
 *
 * gulp-jshint
 * Este é JSHint, uma ferramenta que ajuda a detectar erros e potenciais problemas no seu código JavaScript.
 * https://github.com/spalger/gulp-jshint
 */
var jshint = require('gulp-jshint');

/**
 * borser-sync
 * Browsersync faz seu ajustes e testa mais rápido sincronizando alterações de arquivos e interações entre vários 
 * dispositivos.
 * http://www.browsersync.io/
 *
 * proxy-middleware
 * Utilizei para criar um "proxy transparente", "A 'proxy transparente' é um proxy que não modifique o pedido ou 
 * resposta para além do que é necessário para a autenticação e identificação do proxy". O proxy-middleware permite 
 * quaisquer solicitação de opções sendo permitidos em HTTP ou HTTPS.
 * https://github.com/andrewrk/node-proxy-middleware
 *
 * karma
 * Uma ferramenta simples que lhe permite testar código JavaScript em vários navegadores reais. https://github.com/karma-runner/karma
 */
var browserSync = require('browser-sync').create();
var proxy = require('proxy-middleware');
var karma = require('karma').Server;

/* Configurando TASKS */
var src = {
	reload: 'web/**/*',
	scripts: 'web/modules/**/*.js'
};

gulp.task('test', function (done) {
	new karma({
		configFile: __dirname + '/karma.conf.js'
	}, function () {
		done();
	}).start();
});

gulp.task('jshint', function () {
	return gulp.src(src.scripts)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server', ['jshint'], function() {
	var proxyOptions = url.parse('http://localhost:4001');
	proxyOptions.route = '/secured/ping';

	browserSync.init({
		server: {
			baseDir: './web',
			middleware: [proxy(proxyOptions)]
		}
	});

	gulp.watch(src.reload, ['jshint']).on('change', browserSync.reload);
	gulp.watch(src.scripts, ['test']).on('change', browserSync.reload);
});

gulp.task('default', function() {
	console.log('gulp default task');
});
