document.addEventListener('DOMContentLoaded', function () {
	let boxResultado = document.getElementById('box-resultado');
	let formulario = document.getElementById('formulario');
	let balaoNotificacao = document.getElementById('balao-notificacao');

	formulario.addEventListener('submit', function (e) {
		e.preventDefault();
		calcularImc();
	});

	function msgNotificacao(mensagem) {
		balaoNotificacao.innerHTML = mensagem;
		balaoNotificacao.style.display = 'block';
		setTimeout(function () {
			balaoNotificacao.style.display = 'none';
		}, 2000);
	}

	function calcularImc() {
		let alturaInput = document.getElementById('altura');
		let pesoInput = document.getElementById('peso');
		let peso = parseFloat(pesoInput.value);
		let altura = parseInt(alturaInput.value);

		if (!altura || altura <= 0 || !Number.isInteger(altura)) {
			msgNotificacao('Digite uma altura válida!');
			return;
		}
		if (!peso || peso <= 0) {
			msgNotificacao('Digite um peso válido!');
			return;
		}

		let imc = (peso / (altura * altura)).toFixed(2);


		alturaInput.value = '';
		pesoInput.value = '';

		classificaImc(imc);
	}

	function classificaImc(imc) {
		let classificacao = '';
		let cor = '';

		if (imc < 18.5) {
			classificacao = 'Magreza';
			cor = 'rgb(173, 216, 230)';
		} else if (imc >= 18.5 && imc <= 24.9) {
			classificacao = 'Normal';
			cor = 'rgb(76, 175, 80)';
		} else if (imc >= 25 && imc <= 29.9) {
			classificacao = 'Sobrepeso';
			cor = 'rgb(255, 235, 59)';
		} else if (imc >= 30 && imc <= 39.9) {
			classificacao = 'Obesidade';
			cor = 'rgb(255, 152, 0)';
		} else if (imc >= 40) {
			classificacao = 'Obesidade Grave';
			cor = 'rgb(244, 67, 54)';
		}
		mostrarImc(imc, classificacao, cor);
	}

	function mostrarImc(imc, classificacao, cor) {
		let imcValue = document.getElementById('imc-value');
		let imcClassificacao = document.getElementById('imc-classificacao');

		imcValue.innerHTML = `Seu IMC é: <strong> ${imc} </strong>`;
		imcClassificacao.innerHTML = `Classificação: <strong>${classificacao}!</strong>`;
		boxResultado.style.borderLeftColor = cor;
		boxResultado.style.display = 'flex';
	}
});
