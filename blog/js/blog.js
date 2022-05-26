window.addEventListener('load', function () {
    const PROFILE_PICTURE = document.getElementById('pfp');
    const SOCIAL_MEDIA_CONTAINER = document.getElementById('social-media-container');
    const BLOGGER_NAME = document.getElementById('blogger-name');
    const NAVIGATION = document.getElementsByTagName('nav')[0];
    const FOOTER = document.getElementsByTagName('footer')[0];

    const STYLESHEET_RULES = document.styleSheets[0].cssRules;
    const CUSTOM_FONT_CSS = STYLESHEET_RULES[3].style;
    const SECTION_PARAGRAPHS_CSS = STYLESHEET_RULES[20].style;



    // RESIZING
    let sectionSelected = 'mylife';

    __resizeActiveComponents__();
    window.addEventListener('resize', __resizeActiveComponents__);

    function __resizeActiveComponents__() {
        let referenceRect = SOCIAL_MEDIA_CONTAINER.getBoundingClientRect();
        const WINDOW_WIDTH = window.innerWidth;

        __resizeFixedComponents__(referenceRect, WINDOW_WIDTH);

        switch (sectionSelected) {
            case 'about':
                __resizeAboutMeComponents__(referenceRect, WINDOW_WIDTH);
                break;
            case 'mylife':
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
        let header_multiplier = 1;
        let paragraph_multiplier = 0.43;

        if (windowWidth > 1200) {
            header_multiplier = 0.5;
            paragraph_multiplier = 0.3;
        }

        CUSTOM_FONT_CSS.fontSize = (referenceRect.height * header_multiplier) + 'px';
        SECTION_PARAGRAPHS_CSS.fontSize = (referenceRect.height * paragraph_multiplier) + 'px';
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
});