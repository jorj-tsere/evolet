
			var scrollCheker;
			var servicesLeftScrollPosition = 0;
			var servicesLeftScrollDirection = -1;
			var autoScrollingOn = false;
			var tripNextMessage = "";
			
			$(document).ready(function(){
				// mainm menu events
				$("#href_about").on("click", function(){
					$("html, body").animate({
						scrollTop: $("#about").offset().top
					}, 1000);
				});
				
				$("#href_services").on("click", function(){
					$("html, body").animate({
						scrollTop: $("#services").offset().top
					}, 1000);
				});
				
				$("#href_projects").on("click", function(){
					$("html, body").animate({
						scrollTop: $("#projects").offset().top
					}, 1000);
				});
				
				$(".href_contacts").on("click", function(){
					$("html, body").animate({
						scrollTop: $("#contact").offset().top
					}, 1000);
				});
				
				// mainm menu events
				
				// service menu events
				$(".services-content.hidden").hide().removeClass("hidden");
				$(".services-menu-item").on("click", function(){
					$(".services-menu-item-selected").removeClass("services-menu-item-selected").addClass("services-menu-item");
					$(this).removeClass("services-menu-item").addClass("services-menu-item-selected");
					const className = $(this).attr("classname");
					//$(".services-content").hide();
					//$("."+className).removeClass("hidden").show();
					
					$.when($(".services-content").fadeOut(100)).done(function(){
						$("."+className).fadeIn(100);
					});
					
					
				});
				// service menu events
				
				// service mobile events
				
				
				$(".services-carousel-content-container-scroller").scroll(function(){
					if(autoScrollingOn)return;
					if(servicesLeftScrollPosition < $(this).scrollLeft()) servicesLeftScrollDirection = -1; else servicesLeftScrollDirection = 1;
					servicesLeftScrollPosition = $(this).scrollLeft();
					
					clearTimeout(scrollCheker);
					scrollCheker = setTimeout("servicesScrollEnds()", 100);

				});
				
				// service mobile events
				
				
				
				// projects menu events
				$(".projects-content.hidden").hide().removeClass("hidden");
				$(".projects-menu-item-holder").on("click", function(){
					$(".projects-menu-item-holder.active").removeClass("active");
					$(this).addClass("active");
					const className = $(this).attr("classname");
					$.when($(".projects-content:visible").fadeOut(100)).done(function(){
						$("."+className).fadeIn(100);
					});
				});
				// projects menu events
				
				onSmallScreen();
				$(document).on("scroll", function(){
					if($(document).scrollTop() > 200) {
						$(".mousedown").fadeOut();
						$(".scroll-down").removeClass("scroll-down").addClass("scroll-down-static");
					}
					else if($(document).scrollTop() < 100) {
						$(".mousedown").fadeIn();
					}
				});
				
				$("#input-form-button").on("click", function(){
					sendmessage();
				});
				
			});
			
			function onSmallScreen() {
				if($(".scroll-down").length) {
					if($(window).height() < ($(".scroll-down").position().top + $(".scroll-down").height()*2/3)) {
						$(".scroll-down").removeClass("scroll-down").addClass("scroll-down-static");
						var mousedown_top = $(window).height() - 119;
						var mousedown_left = $(window).width() - 50;
						$(".mousedown").removeClass("mousedown").addClass("mousedown2").css("position", "fixed").css("top", mousedown_top+"px").css("left", mousedown_left+"px");
						
						$(document).on("scroll", function(){
							if($(document).scrollTop()> 200) {
								$(".mousedown2").fadeOut();
							}
							else if($(document).scrollTop() < 100) {
							$(".mousedown2").fadeIn();
						} 
						});
					}
				}
			}
			
			$.fn.isOnScreen = function(){

				var win = $(window);

				var viewport = {
					top : win.scrollTop(),
					left : win.scrollLeft()
				};
				viewport.right = viewport.left + win.width();
				viewport.bottom = viewport.top + win.height();

				var bounds = this.offset();
				bounds.right = bounds.left + this.outerWidth();
				bounds.bottom = bounds.top + this.outerHeight();

				return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

			};
			
			function servicesScrollEnds()
			{
				clearTimeout(scrollCheker);
				
				setActiveServicePaginator();
				
				var pNum = 1;
				var prevElement;
				var nextElement;
				var visibleSet = false;
				
				$(".point").each(function(){
					
					if($(this).isOnScreen()){
						visibleSet = true;
						/*
						console.group("scroll");
						console.log("visible point: ", pNum);
						console.log("offset: ", $(this).offset().left);
						console.log("position: ", $(this).position().left);
						console.log("scrolling:", $(this).parent().parent().parent().scrollLeft());
						console.groupEnd();
						//*/
						var mustScroll = 0;
						
						if(servicesLeftScrollDirection == -1){
							mustScroll = $(this).parent().parent().parent().scrollLeft() + $(this).position().left - 25;
						}
						else if(servicesLeftScrollDirection == 1) {
							if(prevElement == 'undefined') {
								$(".services-carousel-menu.selected").removeClass("selected");
								$(".scm1").addClass("selected");
							}
							else {
								mustScroll = $(this).parent().parent().parent().scrollLeft() + prevElement.position().left - 25;
								const className = ".scm"+prevElement.attr("point");
							}
							
						}
						
						//console.log("mustScroll:", mustScroll);
						
						autoScrollingOn=true;
						$(".services-carousel-content-container-scroller").animate({ scrollLeft: mustScroll }, 200, "linear", function(){
							setTimeout(function(){autoScrollingOn=false;setActiveServicePaginator();}, 100);
							
							});
					}
					else {
						//console.log("point: ", pNum, "visibleSet:", visibleSet);
						if(!visibleSet)prevElement = $(this);
						else nextElement = $(this);
					}
					
					pNum++;
				});
			}
			
			function setActiveServicePaginator()
			{
				$(".point").each(function(){
					if($(this).isOnScreen()){
						const className = ".scm"+$(this).attr("point");
						$(".services-carousel-menu.selected").removeClass("selected");
						$(className).addClass("selected");
					}
				});
			}
			
			function sendmessage()
			{
				// input-form-name
				// input-form-email
				// input-form-text
				
				var haveError = false;
//contact-form-name-container.error, .contact-form-email-container.error, .contact-form-text-container				
				if($("#input-form-name").val() == "") {
					haveError = true;
					$("#input-form-name").attr("placeholder", "Enter Your Name Please");
					$(".contact-form-name-container").addClass("error");
					setTimeout(function(){$(".contact-form-name-container").addClass("error1");}, 500);
					setTimeout(function(){$(".contact-form-name-container").removeClass("error1").removeClass("error");}, 1000);

				}
				
				if($("#input-form-email").val() == "" || !validateEmail($("#input-form-email").val())) {
					haveError = true;
					$("#input-form-email").attr("placeholder", "Enter Your Email Please");
					$(".contact-form-email-container").addClass("error");
					setTimeout(function(){$(".contact-form-email-container").addClass("error1");}, 500);
					setTimeout(function(){$(".contact-form-email-container").removeClass("error1").removeClass("error");}, 1000);

				}
				
				if($("#input-form-text").val() == "") {
					haveError = true;
					$("#input-form-text").attr("placeholder", "Enter Text Please");
					$(".contact-form-text-container").addClass("error");
					setTimeout(function(){$(".contact-form-text-container").addClass("error1");}, 500);
					setTimeout(function(){$(".contact-form-text-container").removeClass("error1").removeClass("error");}, 1000);

				}
				
				const name = $("#input-form-name").val();
				const email = $("#input-form-email").val();
				const text = $("#input-form-text").val();
				
				
				
				if(haveError){
					showTrip1("Fill all fields please");
					return;
				}
				
				$.post("sendmessage.php", { name: name, email: email, text: text }, function(data){
					if(data != "")
						showTrip1(data);
				});

			}
			
			function validateEmail(email)
			{
				const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(String(email).toLowerCase());
			}
			
			function showTrip1(text)
			{
				if($(".trip-tiv").isOnScreen()){
					console.log("isOnScreen");
					tripNextMessage = text;
					return;
				}
				$(".trip-tiv").html("<div>"+text+"</div>");
				$(".trip-tiv").animate({
					"left": "50px"
				}, 500, function(){
					setTimeout(function(){hideTrip1()}, 3000);
				});
			}
			
			function hideTrip1()
			{
				var left = "-1000px";
				var speed = 500;
				const w = $(".trip-tiv").width()+100;
				
				
				if(tripNextMessage != ""){
					left = "-" + w + "px";
					speed = 100;
				}
				
				$(".trip-tiv").animate({"left": left}, speed, function(){
					if(tripNextMessage != ""){
						console.log("tripNextMessage");
						showTrip1(tripNextMessage);
						tripNextMessage = "";
					}
				});
				
			}
		