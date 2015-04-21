/**
 * THIS IS NOT A NODEJS FILE
 * it's a phantomjs file and there is a huge difference
 * 
 * This file runs phantomjs to normalize the markup across browsers
 * and to move the content onto the slabs domain
 * 
 */
 
var page = require('webpage').create();
var system = require('system');
var args = system.args;
var url = args[1];



var slabscrapePathJS = 'http://static.slabs.io/pagescrape/0.1/slabscrape.js';
var slabscrapePathCss = 'http://static.slabs.io/pagescrape/0.1/slabscrape.css';;

page.open(url, function(status){
   page.evaluate(function(url, slabscrapePathJS, slabscrapePathCss){
      var base = document.createElement('base');
      base.href = url;
      document.head.insertBefore(base, document.head.firstChild);
      
      // var scripts = document.getElementsByTagName('script');
      // [].forEach.call(scripts, function(script){
      //    script.parentNode.removeChild(script);
      // });
      
      var l = document.createElement('link');
       l.href = slabscrapePathCss;
       l.type = 'text/css';
       l.rel = 'stylesheet';
    
      document.head.appendChild(l);  
      
      var tempNode = document.createElement('div');
      tempNode.className = 'slabscrape-dummy';
      tempNode.setAttribute('data-slabs-ignore', 'ignore');
      document.body.insertBefore(tempNode, document.body.firstChild);
      
      var slabscrape = document.createElement('script');
      slabscrape.src = slabscrapePathJS;
      document.body.appendChild(slabscrape);
   }, url, slabscrapePathJS, slabscrapePathCss);
   console.log(page.frameContent);
   page.close();
   phantom.exit();
});