const puppeteer = require('puppeteer')

const URL = "https://react-redux.realworld.io/"
const User = 'qw8899013'
const Email = 'qh201hhgyt@mail.com'
const Password = '123thsy6734';

var browser;
var page;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless:false,
        slowMo:20
    })
    page = await browser.newPage()
    await page.setViewport({width:1920,height:1080})
    await page.goto(URL,{waitUntil:'domcontentloaded'})
},30000)
afterAll(()=>{
    browser.close();
});

describe('Open main page', () => {
    test('Title of the page', async () => {
        await page.screenshot({ path: 'screenshots/main_page.png' });
        const title = await page.title();
        expect(title).toBe('Conduit');
        
    },10000);
});

describe('Perform registration', () => {
    test('Registration form', async () => {
         
        await page.waitForSelector('#main')
        await page.click('[href="#register"]');

        await page.waitForSelector('form');
        await page.type('input[type="text"]', User);
        await page.type('input[type="email"]',Email);
        await page.type('input[type="password"]',Password);
        await page.click('button')

        await page.screenshot({ path: 'screenshots/signup.png' });

        await page.waitForSelector(`a[href="#@${User}"]`)

        await page.screenshot({ path: 'screenshots/user_page.png' });

        const user_name = await page.$eval(`a[href="#@${User}"]`,el => el.innerText);
        expect(user_name).toEqual(User)
       
    })
},40000);

describe('Log out', () => {
    test('Log out button', async () => {
       await page.click('[href="#settings"]')

       await page.screenshot({path:'screenshots/settings.png'})

       await page.waitForSelector('form')
       await page.click('.btn-outline-danger')
       await page.waitForSelector('.home-page')

       await page.screenshot({path:'screenshots/after_logout.png'})

       expect('.font-logo').toBeDefined();

    })
},40000);

describe('Sign in', () => {
    test('Sign in form', async () => {

        await page.waitForSelector('#main')
        await page.click('[href="#login"]');

        await page.waitForSelector('form');
        await page.type('input[type="email"]',Email);
        await page.type('input[type="password"]',Password);
        await page.click('button')

        await page.screenshot({ path: 'screenshots/signin.png' });

        await page.waitForSelector(`a[href="#@${User}"]`)

        await page.screenshot({ path: 'screenshots/user_page_after_signin.png' });

        const user_name = await page.$eval(`a[href="#@${User}"]`,el => el.innerText);
        expect(user_name).toEqual(User)

    })
},40000);

describe('Create post with the most popular tag.', () => {
    test('Creating posts', async () => {
       await page.click('[href="#editor"]');
       await page.waitForSelector('form');

       await page.screenshot({path:'screenshots/new_post_form.png'})

       await page.type('.form-control-lg[type="text"]','Test')
       await page.type(".form-group:nth-child(2) input","Test")
       await page.type('textarea.form-control',"Test")
       await page.type('.form-control[placeholder="Enter tags"]',"test")

       await page.screenshot({path:'screenshots/new_post_filled.png'})

       await page.click('button')
       await page.waitForSelector('.card-footer')
       await page.type('textarea','comment')

       await page.screenshot({path:'screenshots/comment_page.png'})
    
       await page.click('.btn-primary')
       await page.waitForSelector('.card-text')

       await page.screenshot({path:'screenshots/comment_done.png'})
    })
},40000);

describe('Create post with the most popular tag.', () => {
    test('Creating posts', async () => {

       await page.click('a[href="#"]')
       await page.waitForSelector('.nav-pills')
       await page.click('.outline-active .nav-item:nth-child(2) a.nav-link') 
       await page.waitForSelector('.article-review') 

    })
},40000);
