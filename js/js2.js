/* Este código foi feito com a ajuda do professor Denilson L. Bonatti  [http://learncafe.com/perfil/denilsonbonatti]*/
/*Comentado e Identado por Fábio Carvalho, Renata Azevedo e Jeziel Lopes*/
/*As músicas e sons deste game não infligem as regras de direitos autorais*/
 
$(document).ready(function() {
    $("#tiro").hide();
    $("#explosao1").hide();
    $("#explosao2").hide();
    $("#fim").hide();
 
});
 
function start(){
 
 
$("#inicio").hide();

	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
 
var velocidade=5;
var posicaoY1 = parseInt(Math.random() * 410);
var posicaoY2 = parseInt(Math.random() * 410);
var podeAtirar=true;
var jogadorEnergia=3;
var score=0;
 
 
 
var TECLA = {
    W: 87,
    S: 83,
    D: 68
}
 
var jogo = {};
jogo.pressionou = [];
 
/*Função principal do jogo */
 
$(function(){
    jogo.timer = setInterval(loop,30); 
 
        var somDisparo=document.getElementById("somDisparo");
        var somExplosao=document.getElementById("somExplosao");
        var musica = document.getElementById("musica");
        musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
        musica.play();
 
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
});
 
 
 
function loop()
{
    moveJogador();
    moveFundo();
    moveInimigo1();
    moveInimigo2();
    colisao();
    energia();
    pontos();
}
 
 
 
function moveJogador() {
 
if (jogo.pressionou[TECLA.W])
    {
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top",topo-10);
         
 
if (topo<=0) {
         
        $("#jogador").css("top",topo+10);
         
        }
         
    }
     
    if (jogo.pressionou[TECLA.S])
    {
         
        var topo = parseInt($("#jogador").css("top"));
        $("#jogador").css("top",topo+10);   
 
    if (topo>=410) {
         
        $("#jogador").css("top",topo-10);
         
        }
 
 
         
    }
     
    if (jogo.pressionou[TECLA.D])
    {
         
        tiro();
    }
}
 
function moveFundo() {
     
    posicao = parseInt($("#fundoGame").css("background-position"));  // posicao recebe a posição do fundo.
    $("#fundoGame").css("background-position",posicao-1); // diminuiu 1px da variavel posicao
         
}
 
 
 
function moveInimigo1() {
 
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY1);
 
 
if (posicaoX<=0) {
             
            posicaoY1 = parseInt(Math.random() * 410);
            $("#inimigo1").css("left",617);
            $("#inimigo1").css("top",posicaoY1);
             
        }
 
         
}
 
function moveInimigo2() {
 
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left",posicaoX-velocidade);
         
        if (posicaoX<=0) {

            $("#inimigo2").css("left",617);

             
        }
         
}
 
 
function tiro() {
 
    if (podeAtirar == true){
 
    podeAtirar=false;
    somTiro.play();
    topo = parseInt($("#jogador").css("top"))
    posicaoX= parseInt($("#jogador").css("left"))
    tiroX = posicaoX + 80;
    topoTiro=topo+80;
    $("#tiro").show();
    $("#tiro").css("top",topoTiro);
    $("#tiro").css("left",tiroX);
 
 
    var tempoTiro=window.setInterval(executaTiro, 30);
 
 
    }
 
 
 function executaTiro() {
        posicaoX = parseInt($("#tiro").css("left"));
        $("#tiro").css("left",posicaoX+20); 
 
        if (posicaoX>650) {
                         
            window.clearInterval(tempoTiro);
            tempoTiro=null;
            $("#tiro").hide();
            $("#tiro").css("top",-15);
            podeAtirar=true;
        }
}
 
}
 
function colisao() { //Identifica a colisão do Inimigo1 com o Jogador
 
var jogadorX = parseInt($("#jogador").css("left"))+parseInt($("#jogador").css("width"));
var jogadorBaixo = parseInt($("#jogador").css("top"))+parseInt($("#jogador").css("height"))+50;
var jogadorTopo = parseInt($("#jogador").css("top"));
 
var inimigo1X = parseInt($("#inimigo1").css("left"));
var inimigo1Baixo = parseInt($("#inimigo1").css("top"))+parseInt($("#inimigo1").css("height"));
var inimigo1Topo = parseInt($("#inimigo1").css("top"));
 
var inimigo2X = parseInt($("#inimigo2").css("left"))
var inimigo2Baixo = parseInt($("#inimigo2").css("top"))+parseInt($("#inimigo2").css("height"));
var inimigo2Topo = parseInt($("#inimigo2").css("top"));
 
var tiroX = parseInt($("#tiro").css("left"))+parseInt($("#tiro").css("width"));
var tiroBaixo = parseInt($("#tiro").css("top"))+parseInt($("#tiro").css("height"));
var tiroTopo = parseInt($("#tiro").css("top"));
 
 
    if (inimigo1X <= jogadorX) {
         
        if (inimigo1Baixo <= jogadorBaixo && inimigo1Baixo >= jogadorTopo)
            {
        $("#inimigo1").css("left",617);
        posicaoY1 = parseInt(Math.random() * 410);
        $("#inimigo1").css("top",posicaoY1);
 
 
        explosao1(inimigo1X,inimigo1Topo);
        jogadorEnergia--;
                                     
         } 
             
    }
 
    //Identifica a colisão do Inimigo2 com o Jogador
 
    if (inimigo2X <= jogadorX) {
         
        if (inimigo2Baixo <= jogadorBaixo && inimigo2Baixo >= jogadorTopo)
            {
        $("#inimigo2").css("left",617);
                                     
    explosao2(inimigo2X,inimigo2Topo);
    jogadorEnergia--;
         } 
             
    }
 
 
 
// se a posição do tiro passar a posição do inimigo ele é reposicionado.
    if (tiroX >= inimigo1X) {
     
        if (tiroBaixo <= inimigo1Baixo && tiroBaixo >= inimigo1Topo)
           {
        $("#inimigo1").css("left",617); //reposiciona o inimigo 1.
        posicaoY1 = parseInt(Math.random() * 410);
        $("#inimigo1").css("top",posicaoY1);
 
        explosao1(inimigo1X,inimigo1Topo);          
        score=score+100;
        velocidade=velocidade+0.2;  
        }
    } //fecha tiro acerta inimigo 1.
 
 
 
    if (tiroX >= inimigo2X) { 
     
        if (tiroBaixo <= inimigo2Baixo && tiroBaixo >= inimigo2Topo)
           {
        $("#inimigo2").css("left",617);
 
        explosao2(inimigo2X,inimigo2Topo);
        score=score+100;
        velocidade=velocidade+0.2;
        }
    }//fecha tiro acerta inimigo 2.
 
} //fecha função
 
 
 
function explosao1(inimigo1X,inimigo1Topo) {
 
    somExplosao.play();
    var div=$("#explosao1");
    div.css("top", inimigo1Topo);
    div.css("left", inimigo1X);
    div.show();
    div.animate({width:200, height:100, opacity:0}, "slow");
     
    var tempoExplosao=window.setInterval(resetaExplosao, 1000);
     
    function resetaExplosao() {
        div.css("width", 100);
        div.css("height",100);
        div.css("opacity", 100);
        div.hide();
        window.clearInterval(tempoExplosao);
        tempoExplosao=null;
         
    }
         
}
 
function explosao2(inimigo2X,inimigo2Topo) {
 
    somExplosao.play();
    var div=$("#explosao2");
    div.css("top", inimigo2Topo);
    div.css("left", inimigo2X);
    div.show();
    div.animate({width:200, height:100, opacity:0}, "slow");
     
    var tempoExplosao=window.setInterval(resetaExplosao, 1000);
     
    function resetaExplosao() {
        div.css("width", 100);
        div.css("height",100);
        div.css("opacity", 100);
        div.hide();
        window.clearInterval(tempoExplosao);
        tempoExplosao=null;
         
    }
         
}
 
function energia() {
     
    if (jogadorEnergia==3) {
         
        $("#energia").css("background-image", "url(imgs/energia_3.png)");
    }
     
    if (jogadorEnergia==2) {
         
        $("#energia").css("background-image", "url(imgs/energia_2.png)");
    }
     
    if (jogadorEnergia==1) {
         
        $("#energia").css("background-image", "url(imgs/energia_1.png)");
    }
     
    if (jogadorEnergia==0) {
         
        $("#energia").css("background-image", "url(imgs/energia_0.png)");
        gameOver();
         
    }
     
     
}
 
 
function pontos() {
    $("#placar").html("<h1> Score: " + score + "</h1>");
}
 
 
function gameOver() {
    window.clearInterval(jogo.timer);
    jogo.timer=null;
    $("#inimigo1").hide();
    $("#inimigo2").hide();
    $("#jogador").hide();
    musica.pause();
    gameover.play();
     
    saida = "<h1> Game Over </h1><h1>Sua pontuação foi: " + score + "</h1><p> Clique aqui para jogar novamente</p>"
     
    document.getElementById('fim').innerHTML = saida; 
     
    $("#fim").show();
 
}
 
}//Fim da função star
 
function reinicia() {
 
    $("#inimigo1").show();
    $("#inimigo2").show();
    $("#jogador").show();
    gameover.pause();
    $("#fim").hide();
     
    start();
 
}