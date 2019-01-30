$(window).load(function(){
var i=0,status="";
drawFun(i);
$('.wrapper').css('transform','scale('+0.001*$(document).height()+')');
$(window).resize(function(){$('.wrapper').css('transform','scale('+0.001*$(document).height()+')')});
function turnForward()
	 {
	     $('.turn').removeClass('disable').addClass('disable');
		 $('.svgContainer').removeClass('hiddenElem').addClass('hiddenElem');
		if(i==0)
		{
			$('.cover').removeClass('turn-backward').addClass('turn-forward');
		}
		else if(i==1)
		{
			$('.first-page').removeClass('turn-backward').addClass('turn-forward');
		}
		else
		{
			$('.second-page').removeClass('turn-backward').removeClass('stopAnim').addClass('turn-forward');
			setTimeout(function(){
			$('.second-page').addClass('stopAnim').removeClass('turn-forward');
			},2000);
		}
		i++;
		setTimeout(function(){ $('.turn').removeClass('disable');},2000);
		setTimeout(function(){drawFun(i);},500);
	}
	
function turnBackward(){
		$('.turn').removeClass('disable').addClass('disable');
		$('.svgContainer').removeClass('hiddenElem').addClass('hiddenElem');;
		if(i==0)
		{
			console.log('no page to turn');
		}
		else if(i==1)
		{
			$('.cover').addClass('turn-backward').removeClass('turn-forward');
			i--;
		}
		else if(i==2)
		{
			$('.first-page').addClass('turn-backward').removeClass('turn-forward');
			i--;
		}
		else
		{
			$('.second-page').removeClass('stopAnim').addClass('stopAnim turn-forward');
			setTimeout(function(){
			$('.second-page').removeClass('stopAnim').addClass('turn-backward').removeClass('turn-forward');},5);
			i--;
		}
		setTimeout(function(){ $('.turn').removeClass('disable');},2000);
		setTimeout(function(){drawFun(i);},1000);
	}
$('#turn_btn_forward').click(function(){turnForward();});
$('#turn_btn_back').click(function(){turnBackward();});
function drawFun(a){
	if(a==0)
	{$('.svgContainer').html('').load('images/cat.svg',function(){svgLoaded();});}
	else if(a%5==4)
	$('.svgContainer').html('').load('images/mouse.svg',function(){svgLoaded();});
	else if(a%5==3)
	$('.svgContainer').load('images/phone.svg',function(){svgLoaded();});
	else if(a%5==2)
	$('.svgContainer').load('images/bottle.svg',function(){svgLoaded();});
	else if(a%5==1)
	$('.svgContainer').load('images/ball.svg',function(){svgLoaded();});
	else if(a%5==0)
	$('.svgContainer').load('images/cat.svg',function(){svgLoaded();});
	else
	$('.svgContainer').load('images/cat.svg',function(){svgLoaded();});
}
function svgLoaded(){
	$('.svgContainer').removeClass('hiddenElem');
	var paths = $('svg path');
	var length;
	for(var n=0;n<paths.length;n++)
	{
		length = paths[n].getTotalLength();
		paths[n].style.strokeDashoffset=paths[n].style.strokeDasharray=length;
	}
	var m=0;
	function startDrawing(){
		length = paths[m].getTotalLength();
		paths[m].setAttribute('class','drawPath');
		paths[m].setAttribute('fill','none');
		paths[m].getBoundingClientRect();
		paths[m].style.transition=paths[m].style.WebkitTransition="stroke-dashoffset "+0.3*length/120+"s ease-in-out";
		paths[m].getBoundingClientRect();
		paths[m].style.strokeDashoffset="0px";
		m++;
		if(m<paths.length)
		setTimeout(function(){startDrawing();},300*length/120);
	}
	startDrawing();
}
});