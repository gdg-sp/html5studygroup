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
 */
var browserSync = require('browser-sync').create();
var proxy = require('proxy-middleware');

/* Configurando TASKS */

var src = 'web/**/*';

gulp.task('server', function() {
	var proxyOptions = url.parse('http://localhost:4001');
	proxyOptions.route = '/ping';

	browserSync.init({
		server: {
			baseDir: './web',
			middleware: [proxy(proxyOptions)]
		}
	});

	gulp.watch(src).on('change', browserSync.reload);
});

gulp.task('default', function() {
	console.log('gulp default task');
});
