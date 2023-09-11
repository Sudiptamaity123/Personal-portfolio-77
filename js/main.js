/*-------------------------------------------------
 Navigation Menu Start 
-------------------------------------------------*/

(function () {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  const closeNavBtn = navMenu.querySelector('.close-nav-menu');

  hamburgerBtn.addEventListener('click', showNavMenu);
  closeNavBtn.addEventListener('click', hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add('open');
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove('open');
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector('.fade-out-effect').classList.add('active');
    setTimeout(function () {
      document.querySelector('.fade-out-effect').classList.remove('active');
    }, 300);
  }

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('link-item')) {
      // Makes sure event.target.hash has a value before overridding default behaviour
      if (event.target.hash !== '') {
        event.preventDefault();

        const hash = event.target.hash;

        //deactivate existing active 'section'
        document.querySelector('.section.active').classList.add('hide');
        document.querySelector('.section.active').classList.remove('active');

        //activate new 'section'
        document.querySelector(hash).classList.add('active');
        document.querySelector(hash).classList.remove('hide');

        //deactivate existing active navigation menu 'link-item'
        navMenu
          .querySelector('.active')
          .classList.add('outer-shadow', 'hover-in-shadow');
        navMenu
          .querySelector('.active')
          .classList.remove('active', 'inner-shadow');

        if (navMenu.classList.contains('open')) {
          // //activate new active navigation menu 'link-item'
          event.target.classList.add('active', 'inner-shadow');
          event.target.classList.remove('outer-shadow', 'hover-in-shadow');

          //hide navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll('.link-item');
          navItems.forEach(function (item) {
            if (hash === item.hash) {
              item.classList.add('active', 'inner-shadow');
              item.classList.remove('outer-shadow', 'hover-in-shadow');
            }
          });
          fadeOutEffect();
        }

        //add hash(#) to url
        window.location.hash = hash;
      }
    }
  });
})();

/*-------------------------------------------------
 Navigation Menu End
-------------------------------------------------*/

/* ------------------------------------------------
About Section Tabs Start
-------------------------------------------------*/

(function () {
  const aboutSection = document.querySelector('.about-section');
  tabsContainer = document.querySelector('.about-tabs');
  tabsContainer.addEventListener('click', function (event) {
    /* If the tab you clicked on, is not active */
    if (!event.target.classList.contains('active')) {
      const target = event.target.getAttribute('data-target');

      /* Deactivate the active tab */
      tabsContainer
        .querySelector('.active')
        .classList.remove('active', 'outer-shadow');

      /* Activate the active tab content*/
      event.target.classList.add('active', 'outer-shadow');

      /* Deactivate the previous active tab content */
      document.querySelector('.tab-content.active').classList.remove('active');

      /* Activate the new Active tab content */
      document.querySelector(target).classList.add('active');
    }
  });
})();

/*----------------------------------------------------
  About Section Tabs End 
  ---------------------------------------------------*/

/*---------------------------------------------------
 Portfolio Filter Items and PopUp
 ---------------------------------------------------*/

function bodyScrollingToggle() {
  document.body.classList.toggle('hidden-scrolling');
}

(function () {
  const filterContainer = document.querySelector('.portfolio-filter');
  const portfolioItemsContainer = document.querySelector('.portfolio-items');
  const portfolioItems =
    portfolioItemsContainer.querySelectorAll('.portfolio-item');
  const popup = document.querySelector('.portfolio-popup');
  const prevBtn = popup.querySelector('.pp-prev');
  const nextBtn = popup.querySelector('.pp-next');
  const closeBtn = popup.querySelector('.pp-close');
  const projectDetailsContainer = popup.querySelector('.pp-details');
  const projectDetailsBtn = popup.querySelector('.pp-project-details-btn');

  let itemIndex, slideIndex, screenshots;

  /* Filter Portfolio Items */
  filterContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('active')) {
      //deactivating existing active filter item
      filterContainer
        .querySelector('.active')
        .classList.remove('outer-shadow', 'active');

      //activating new "filter-item" as active
      event.target.classList.add('outer-shadow', 'active');

      const target = event.target.getAttribute('data-target');

      portfolioItems.forEach(function (item) {
        //Filtering the projects category wise
        if (target === item.getAttribute('data-category') || target === 'all') {
          item.classList.remove('hide');
          item.classList.add('show');
        } else {
          item.classList.remove('show');
          item.classList.add('hide');
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener('click', function (event) {
    if (event.target.closest('.portfolio-item-inner')) {
      const portfolioItem = event.target.closest(
        '.portfolio-item-inner'
      ).parentElement;

      //Get the indexes of the Projects
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );

      //Get the Screenshots of the Project
      screenshots = portfolioItems[itemIndex]
        .querySelector('.portfolio-item-img img')
        .getAttribute('data-screenshot');

      screenshots = screenshots.split(',');

      //If the project has only 1 photo
      if (screenshots.length === 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
      }

      slideIndex = 0;

      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener('click', function () {
    popupToggle();
  });

  function popupToggle() {
    popup.classList.toggle('open');
    bodyScrollingToggle();
  }

  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector('.pp-img');

    popupImg.src = imgSrc;

    popup.querySelector('.pp-counter').innerHTML =
      slideIndex + 1 + 'of' + screenshots.length;
  }

  //Next Slide
  nextBtn.addEventListener('click', function () {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  //Previous Slide
  prevBtn.addEventListener('click', function () {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
  });

  function popupDetails() {
    //Get the Project Details
    const details = portfolioItems[itemIndex].querySelector(
      '.portfolio-item-details'
    ).innerHTML;

    const title = portfolioItems[itemIndex].querySelector(
      '.portfolio-item-title'
    ).innerHTML;

    const category = portfolioItems[itemIndex].getAttribute('data-category');

    //Replacing the details of pop-up with the actual project details
    popup.querySelector('.pp-project-details').innerHTML = details;

    popup.querySelector('.pp-title h2').innerHTML = title;

    popup.querySelector('.pp-project-category').innerHTML = category
      .split('-')
      .join(' ');
  }

  projectDetailsBtn.addEventListener('click', function () {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains('active')) {
      projectDetailsBtn.querySelector('i').classList.remove('fa-minus');

      projectDetailsBtn.querySelector('i').classList.add('fa-plus');

      projectDetailsContainer.classList.remove('active');
      projectDetailsContainer.style.maxHeight = 0 + 'px';
    } else {
      projectDetailsBtn.querySelector('i').classList.remove('fa-plus');

      projectDetailsBtn.querySelector('i').classList.add('fa-minus');

      projectDetailsContainer.classList.add('active');
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + 'px';

      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();
/*---------------------------------------------------
 Portfolio Filter, PopUp Ends 
 ---------------------------------------------------*/

/*--------------------------------------------------
 Hide all sections except active
--------------------------------------------------*/

(function () {
  const sections = document.querySelectorAll('.section');
  sections.forEach(function (section) {
    if (!section.classList.contains('active')) {
      section.classList.add('hide');
    }
  });
})();
