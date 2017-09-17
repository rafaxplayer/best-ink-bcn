(function($) {
   
    const animate = (element,n)=>{
        if($(element).length){
            var y = $(window).scrollTop(),
            x = $(element).offset().top - n;
            
            if (y > x) {
                 $(element).addClass('come-in').removeClass('come-out');
            } else {
                $(element).removeClass('come-in').addClass('come-out');
            } 
        }
       
    };

    $(window).scroll((event) =>{
             
        animate('.team-img',500);
        animate('#piercing',500);
        animate('#tattoo',500);
        animate('#micro',500);
        animate('#contact',500);
        animate('.post',500);
        let number = $(window).scrollTop();
        /* console.log(number) */
        if (number > 150) {
          $('.goToTop').fadeIn();
        } else {
          $('.goToTop').fadeOut();
        } 
        
    });
    
})(jQuery);