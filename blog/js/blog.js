window.addEventListener('load', function () {
    const PROFILE_PICTURE = document.getElementById('pfp');
    const SOCIAL_MEDIA_CONTAINER = document.getElementById('social-media-container');
    const BLOGGER_NAME = document.getElementById('blogger-name');
    const NAVIGATION = document.getElementsByTagName('nav')[0];
    const FOOTER = document.getElementsByTagName('footer')[0];
    const FIRST_BLOG_POST = document.getElementsByClassName('blogs-container')[0].firstElementChild;
    const MY_LIFE_SECTION = document.getElementById('mylife');



    const STYLES = {
        about$customFont: 'body .custom-font',
        about$sectionParagraphs: 'body main #about section .title-AND-paragraph-container',
        mylife$sectionHeading: 'body main #mylife > section h2',
        mylife$postText: 'body main #mylife > section .blogs-container article'
    };
    const STYLESHEET_RULES = document.styleSheets[0].cssRules;
    const NUMBER_OF_RULES = STYLESHEET_RULES.length;

    function __getStyles__(selector) {
        for (let i=0; i < NUMBER_OF_RULES; i++) {
            const CURRENT_RULE = STYLESHEET_RULES[i];

            if (CURRENT_RULE.cssText.split('{')[0].trim() === selector) {
                return CURRENT_RULE.style;
            }
        }

        return null;
    };

    STYLES['about$customFont'] = __getStyles__(STYLES['about$customFont']);
    STYLES['about$sectionParagraphs'] = __getStyles__(STYLES['about$sectionParagraphs']);
    STYLES['mylife$sectionHeading'] = __getStyles__(STYLES['mylife$sectionHeading']);
    STYLES['mylife$postText'] = __getStyles__(STYLES['mylife$postText']);



    // RESIZING
    let sectionSelected = 'mylife';

    __resizeActiveComponents__();
    window.addEventListener('resize', __resizeActiveComponents__);

    function __resizeActiveComponents__() {
        const SOCIAL_MEDIA_CONTAINER_RECT = SOCIAL_MEDIA_CONTAINER.getBoundingClientRect();
        const WINDOW_WIDTH = window.innerWidth;

        __resizeFixedComponents__(SOCIAL_MEDIA_CONTAINER_RECT, WINDOW_WIDTH);

        switch (sectionSelected) {
            case 'about':
                __resizeAboutMeComponents__(SOCIAL_MEDIA_CONTAINER_RECT, WINDOW_WIDTH);
                break;
            case 'mylife':
                const FIRST_BLOG_POST_RECT = FIRST_BLOG_POST.getBoundingClientRect();
                __resizeMyLifeComponents__(FIRST_BLOG_POST_RECT, WINDOW_WIDTH);
                break;
            case 'gallery-art':

        }
    };

    function __resizeFixedComponents__(referenceRect, windowWidth) {
        const PFP_STYLES = PROFILE_PICTURE.style;

        let pfp_multiplier = 0.6;
        let name_multiplier = 1.2;
        let navigationText_multiplier = 0.5;
        let footerText_multiplier = 0.4;

        if (windowWidth > 1200) {
            pfp_multiplier = 0.4;
            name_multiplier = 0.7;
            navigationText_multiplier = 0.35;
            footerText_multiplier = 0.25;
        }

        const NEW_SIZE = Math.round(referenceRect.width * pfp_multiplier) + 'px';
        PFP_STYLES.width = NEW_SIZE;
        PFP_STYLES.height = NEW_SIZE;

        BLOGGER_NAME.style.fontSize = (referenceRect.height * name_multiplier) + 'px';

        NAVIGATION.style.fontSize = (referenceRect.height * navigationText_multiplier) + 'px';

        FOOTER.style.fontSize = (referenceRect.height * footerText_multiplier) + 'px';
    };

    function __resizeAboutMeComponents__(referenceRect, windowWidth) {
        let heading_multiplier = 1;
        let paragraph_multiplier = 0.43;

        if (windowWidth > 1200) {
            heading_multiplier = 0.5;
            paragraph_multiplier = 0.3;
        }

        STYLES['about$customFont'].fontSize = (referenceRect.height * heading_multiplier) + 'px';
        STYLES['about$sectionParagraphs'].fontSize = (referenceRect.height * paragraph_multiplier) + 'px';
    };

    function __resizeMyLifeComponents__(referenceRect, windowWidth) {
        let heading_multiplier = 0.1;
        let postText_multiplier = 0.045;

        if (windowWidth < 900) {
            heading_multiplier = 0.05;
            postText_multiplier = 0.04;
        }

        STYLES['mylife$sectionHeading'].fontSize = (referenceRect.width * heading_multiplier) + 'px';
        STYLES['mylife$postText'].fontSize = (referenceRect.width * postText_multiplier) + 'px';
    };



    // NAVIGATION SECTION SELECTION
    let currentlySelectedElement = NAVIGATION.children[2]; // defaults to my life section

    NAVIGATION.addEventListener('mousemove', function (event) {
        const ELEMENT = event.target;

        if (ELEMENT.tagName === 'A' && ELEMENT !== currentlySelectedElement) {
            currentlySelectedElement.classList.remove('selected');
        }
    });

    NAVIGATION.addEventListener('click', function (event) {
        const ELEMENT = event.target;

        if (ELEMENT.tagName === 'A' && ELEMENT !== currentlySelectedElement) {
            ELEMENT.classList.add('selected');

            // displays selected section
            sectionSelected = ELEMENT.getAttribute('data-section');
            document.getElementById(sectionSelected).classList.remove('hide');
            __resizeActiveComponents__();

            // hides previously selected section
            document.getElementById(currentlySelectedElement.getAttribute('data-section')).classList.add('hide');

            currentlySelectedElement = ELEMENT;
        }
    });

    NAVIGATION.addEventListener('mouseleave', function () {
        currentlySelectedElement.classList.add('selected');
    });



    // LOAD POSTS
    MY_LIFE_SECTION.addEventListener('click', function (event) {
        const ELEMENT_CLICKED = event.target;

        if (ELEMENT_CLICKED.hasAttribute('data-load-more-button')) {
            const SECTION = ELEMENT_CLICKED.parentNode;
            const NEXT_BLOG_CONTAINER = SECTION.querySelector('*.unloaded');

            NEXT_BLOG_CONTAINER.classList.remove('unloaded');

            const ALL_POSTS_ARRAY = NEXT_BLOG_CONTAINER.querySelectorAll('[data-card-type="post"]');
            const NUMBER_OF_POSTS = ALL_POSTS_ARRAY.length;

            for (let i=0; i < NUMBER_OF_POSTS; i++) {
                ALL_POSTS_ARRAY[i].classList.remove('hidden');
            }
        }
    });
});