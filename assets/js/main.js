$(document ).ready(function() {

    $.ajax({
        url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: displayMovie
    });

    function displayMovie(movies){
    	for(var m in movies){
    		var movie = movies[m]; 
     		$.each(movie, function(index, value){
				title = movie[index].title;
				poster = movie[index].backdrop_path;
				if(poster == null){
					poster = "http://barkpost-assets.s3.amazonaws.com/wp-content/uploads/2013/11/muchdoge-700x393.jpg";
				}else{
					poster = "https://image.tmdb.org/t/p/w600"+poster+"";
				}
				resume = movie[index].overview;
				popularity = movie[index].popularity;
				popularity = Math.round(popularity);
				$('.slider_content').append(
				 	"<li class='item' data-sort="+index+">\
       				<img src='"+poster+"'>\
       				<div class='movie_infos'>\
	       				<div class='name'>"+title+"</div>\
	       				<div class='rating' data-rating="+popularity+"></div>\
	       				<div class='resume'>"+resume+"</div>\
       				</div>\
       				</li>");
         	});
    	}
    	for (var i=0; i<5; i++){
    		$('.rating').append('<i class="icon-star-empty"></i>');
    	}

        //REMOVE MAXIMUM AND MINIMUM
        $('.item').each(function(){
            f = $(this).data('sort');
            if( isNaN(f)){
                $(this).remove();
            }
        })
    } 

    function rating(){
    	$('.item').each(function(){
    		rating = $(this).find('.rating').data('rating');
    		for (i=0; i<rating; i++){
    			$(this).find('.rating .icon-star-empty').eq(i).addClass('icon-star-full');
    		}
    	})
    }

    function slider(){
    	var imgWidth = $('.item').width();
    	var numItems = $('.item').length;

    	sliderWidth = numItems * imgWidth;

    	$('.slider_content').css('width', sliderWidth);
		
		for(i=0; i<numItems; i++){
			$('.slider_bullet ul').append('<li><a href="#" class="'+i+'"></a></li>');
		}

    	function slideRight(){
            current_sort = $('.slider_content li:first-child').data('sort');
            next = current_sort+1;

            if(current_sort == numItems-1){
                next = 0;
            }

            $('.item[data-sort="'+next+'"]').prependTo('.slider_content');
            $('.slider_content').css('transform', 'translateX(0px)');
    	}

    	function slideLeft(){
            current_sort = $('.slider_content li:first-child').data('sort');
            prev = current_sort-1;
            if(current_sort == 0){
                prev = numItems-1;
            }
            $('.item[data-sort="'+prev+'"]').prependTo('.slider_content');
    	}

        function goTo(){
            $('.slider_bullet li a').on('click', function(e){
                e.preventDefault();
                id = $(this).attr('class');
                $('.item[data-sort="'+id+'"]').prependTo('.slider_content');
            });    
        }

    	$('.arrow_right').on('click', function(){
    		slideRight();
    	});

    	$('.arrow_left').on('click', function(){
    		slideLeft();
    	});

        goTo();
    }   

    setTimeout(function(){
	    slider();
    	rating();

	    $('.slider_container, .sliderName').removeClass('hidden');
	},500)
});