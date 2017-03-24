/*------------------------------------
 | Created By: Goodeath
 | Contact: alexandersonbm@hotmail.com
 | Date: 03/24/2017
 |-------------------------------------
 */

(
function()
	{
		this.$this = this;
		this.url = 'blank';
		this.id = 'blank';
		/*
		|-------------------------------------------------------------------
		|     Arquivos CSS necessários para funcionamento da barra  
		|-------------------------------------------------------------------
		*/

		this.cssLinks = [
			/* Coloque o endereço das suas folhas de estilo */
		];

		/*
		|-------------------------------------------------------------------
		|     Arquivos Javascripts Necessários para funcionamento da barra
		|-------------------------------------------------------------------
		*/

		this.scriptFiles = [
			/* Coloque o endereço dos seus scripts */
		];

		/* @nome: appendCssFiles
		 * @desc: Coloca todos os arquivos CSS no site.
		 * @args: {Nenhum}
		 */

		this.appendCssFiles = function()
		{
			// Pega o vetor com os links dos arquivos css
			var css = this.cssLinks;
			// Checa se tem algum
			if(css.length == 0) return false;
			// Percorre por todos
			for(x in css)
			{
				// Cria a tag <link> e coloca o endereço CSS 
				var linkRel = '<link rel="stylesheet" href="'+css[x]+'">';
				// Atribui no topo do head para não mexer nas folhas de estilos do próprio site.
				$("head").prepend($(linkRel)[0]);
			}
		}

		/* @nome: appendScriptFiles
		 * @desc: Coloca todos os arquivos JS no site.
		 * @args: {Nenhum}
		 */

		this.appendScriptFiles = function(x)
		{
			// Hack para o this
			var $this = this.$this;
			// Checa se X tem algum valor, se não, utiliza 0.
			x = x || 0 ;
			// Pega o vetor com os links dos arquivos javascript.
			var scripts = this.scriptFiles;
			// Checa se tem algum
			if(scripts.length == 0) return false;

			// Se não existir mais nenhum link, retorna verdadeiro, indicado a conclusão
			if(!scripts[x]) return true;

			
			$.getScript(scripts[x],function(){
				$this.appendScriptFiles(x+1);
			});

		}

		this.loadPage = function()
		{
			var $this = this.$this;
			var uri = this.url;
			var id = this.id;
			if(window.$ == undefined || window.$.ajax == undefined)
			{
				setTimeout(function(){$this.loadPage()},1000);
				return false;
			}

			$.ajax({
			  url: uri,
			}).done(function(r) {

				// Cria items
				var items = $(r);
				// Procura pelos items
				for(x in items)
				{
					// pega os IDS
					var ida = $(items[x])[0].id
					// Compara com o id escolhido
					if (ida == id)
					{
						var it = items[x];
						break;
					}
				}
				// Coloca no topo
			  $('body').prepend(it);
			  
			  $this.appendCssFiles();
				$this.appendScriptFiles();
				
			});

		

			
		}


		/* @nome: initialize
		 * @desc: Inicializa o programa.
		 * @args: {Nenhum}
		 */

		this.initialize = function()
		{
			// Hack para o this
			var $this = this.$this;
			// Checa se a página carregou - Caso não haja jquery
			if(document.readyState != "complete")
			{
				// Callback 
				setTimeout(function(){$this.initialize()},1000);
				// Para essa chamada
				return false;
			}
			// Checa se Existe Jquery e se $.ajax está definida
			if(window.$ == undefined || window.$.ajax == undefined)
			{
				// Cria <script>
				var script = document.createElement('script');
				// Atribui link do jquery
				script.src = "https://code.jquery.com/jquery-3.1.1.min.js"; // URL do seu script aqui
				// Afixa o jquery
				document.head.appendChild(script);

			}
			//
			this.loadPage();
			
			
		};

		window.FixTopBar = this;

	}()

)

