window.addEventListener('load', function () {
    const PROFILE_PICTURE = document.getElementById('pfp');
    const SOCIAL_MEDIA_CONTAINER = document.getElementById('social-media-container');
    const BLOGGER_NAME = document.getElementById('blogger-name');
    const NAVIGATION = document.getElementsByTagName('nav')[0];

    const STYLESHEET_RULES = document.styleSheets[0].cssRules;
    const CUSTOM_FONT_CSS = STYLESHEET_RULES[3].style;
    const SECTION_PARAGRAPHS_CSS = STYLESHEET_RULES[20].style;



    // RESIZING
    let referenceRect = SOCIAL_MEDIA_CONTAINER.getBoundingClientRect();

    __resizeProfilePicture__(referenceRect);
    __resizeName__(referenceRect);
    __resizeNavigationText__(referenceRect);
    __resizeAboutMeComponents__(referenceRect);

    window.addEventListener('resize', function () {
        referenceRect = SOCIAL_MEDIA_CONTAINER.getBoundingClientRect();

        __resizeProfilePicture__(referenceRect);
        __resizeName__(referenceRect);
        __resizeNavigationText__(referenceRect);
        __resizeAboutMeComponents__(referenceRect);
    });

    function __resizeProfilePicture__(referenceRect) {
        const PFP_STYLES = PROFILE_PICTURE.style;
        const NEW_SIZE = Math.round(referenceRect.width * 0.6) + 'px';

        PFP_STYLES.width = NEW_SIZE;
        PFP_STYLES.height = NEW_SIZE;
    };

    function __resizeName__(referenceRect) {
        BLOGGER_NAME.style.fontSize = (referenceRect.height * 1.2) + 'px';
    };

    function __resizeNavigationText__(referenceRect) {
        NAVIGATION.style.fontSize = (referenceRect.height * 0.5) + 'px';
    };

    function __resizeAboutMeComponents__(referenceRect) {
        CUSTOM_FONT_CSS.fontSize = referenceRect.height + 'px';
        SECTION_PARAGRAPHS_CSS.fontSize = (referenceRect.height * 0.43) + 'px';
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
            document.getElementById(ELEMENT.getAttribute('data-section')).classList.remove('hide');

            // hides previously selected section
            document.getElementById(currentlySelectedElement.getAttribute('data-section')).classList.add('hide');

            currentlySelectedElement = ELEMENT;
        }
    });

    NAVIGATION.addEventListener('mouseleave', function () {
        currentlySelectedElement.classList.add('selected');
    });
});