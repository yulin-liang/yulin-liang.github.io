$(function() {
    if ($(window).scrollTop() > 50) {
        $('#back-to-top').show();
    }
    else {
        $('#back-to-top').hide();
    }
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#back-to-top').show();
        }
        else {
            $('#back-to-top').hide();
        }

        $('#navigation-bar').toggleClass('scrolled', $(window).scrollTop() > 100)
    });
});

$('#back-to-top').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 200);
});

function registerPostTOC() {
    const navItems = document.querySelectorAll('.post-toc li');
    const sections = [...navItems].map(element => {
        var link = element.querySelector('a.toc-link');
        var target = document.getElementById(decodeURI(link.getAttribute('href')).replace('#', ''));
        // TOC item animation navigate.
        link.addEventListener('click', event => {
          event.preventDefault();
          var offset = target.getBoundingClientRect().top + window.scrollY;
          window.anime({
            targets  : document.scrollingElement,
            duration : 500,
            easing   : 'linear',
            scrollTop: offset + 10
          });
        });
        return target;
      });

    var tocElement = document.querySelector('.post-toc-wrap');

    function activateNavByIndex(target) {
        if (target.classList.contains('active-current')) 
        return;
  
        console.log('active');
        document.querySelectorAll('.post-toc .active').forEach(element => {
            console.log(element);
          element.classList.remove('active', 'active-current');
        });
        target.classList.add('active', 'active-current');

        var parent = target.parentNode;
        while (!parent.matches('.post-toc')) {
          if (parent.matches('li')) parent.classList.add('active');
          parent = parent.parentNode;
        }
        // Scrolling to center active TOC element if TOC content is taller then viewport.
        // window.anime({
        //   targets  : tocElement,
        //   duration : 200,
        //   easing   : 'linear',
        //   scrollTop: tocElement.scrollTop - (tocElement.offsetHeight / 2) + target.getBoundingClientRect().top - tocElement.getBoundingClientRect().top
        // });
    }

    function findIndex(entries) {
        let index = 0;
        let entry = entries[index];
        if (entry.boundingClientRect.top > 0) {
          index = sections.indexOf(entry.target);
          return index === 0 ? 0 : index - 1;
        }
        for (; index < entries.length; index++) {
          if (entries[index].boundingClientRect.top <= 0) {
            entry = entries[index];
          } else {
            return sections.indexOf(entry.target);
          }
        }
        return sections.indexOf(entry.target);
    }
  
    function createIntersectionObserver(marginTop) {
        marginTop = Math.floor(marginTop + 10000);
        let intersectionObserver = new IntersectionObserver((entries, observe) => {
          let scrollHeight = document.documentElement.scrollHeight + 100;
          if (scrollHeight > marginTop) {
            observe.disconnect();
            createIntersectionObserver(scrollHeight);
            return;
          }
          let index = findIndex(entries);
          activateNavByIndex(navItems[index]);
        }, {
          rootMargin: marginTop + 'px 0px -100% 0px',
          threshold : 0
        });
        sections.forEach(element => {
          element && intersectionObserver.observe(element);
        });
    }
    
    createIntersectionObserver(document.documentElement.scrollHeight);
}
