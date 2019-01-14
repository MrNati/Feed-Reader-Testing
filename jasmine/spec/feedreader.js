/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        })

        // loops through each feed in the allFeeds object and 
        // ensures it has a URL defined and that the URL is not empty
        it('url defined and not empty', () => {
            allFeeds.forEach(feed => {
                // tests to check the feeds length and existence go here
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        })

        // loops through each feed in the allFeeds object and 
        // ensures it has a name defined and that the name is not empty.
        it('name defined and not empty', () => {
            allFeeds.forEach(feed => {
                // tests to check the feeds length and existence go here
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        })
    })


    // a new test suite named "The menu"
    describe('The menu', () => {

        // ensures the menu element is hidden by default
        it('is hidden by default', () => {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })

        // ensures the menu changes visibility when the menu icon is clicked
        it('shows and hides', () => {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');

            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        })
    })

    // test suite named "Initial Entries" 
    describe('Initial Entries', () => {

        // ensures when the loadFeed function is called and completes its work, 
        // there is at least a single .entry element within the .feed container
        beforeEach(done => {
            loadFeed(0, done);
        })

        it('completes work', () => {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        })
    })

    // test suite named "New Feed Selection"
    describe('New Feed Selection', () => {
        let feedEntries;

        // ensures when a new feed is loaded by the 
        // loadFeed function that the content actually changes
        beforeEach(done => {
            loadFeed(0, () => {
                feedEntries = $('.feed .entry').html();
                loadFeed(1, done);
            })
        })

        it('changes its content', () => {
            expect($('.feed .entry').html()).not.toMatch(feedEntries);
        })
    })
}());