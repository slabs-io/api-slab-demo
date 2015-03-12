'use strict';

var Q       = require('q');
var scrap   = require('scrap');


/**
 * getLabel - passes in the config object from the client.
 * This function MUST exist and MUST return a string.
 */
exports.getLabel = function(property, settings){

    // this is the object saved from your the /input portion of the slab.
    var searchTerm  = 'news';
    var siteUrl     = 'http://news.bbc.co.uk';

    if(settings && settings.searchTerm && settings.siteUrl){
        searchTerm  = settings.searchTerm;
        siteUrl     = settings.siteUrl;
    }

    if(property == 'mentions'){
        return searchTerm + ' on '+ siteUrl;
    }

    return 'bad property name';

};



/**
 * getData - passes in the config object from the client.
 * This function MUST exist and MUST return a promise.
 */
exports.getData = function(settings) {

    // this is the object saved from your the /input portion of the slab.
    var searchTerm  = 'news';
    var siteUrl     = 'http://news.bbc.co.uk';

    if(settings && settings.searchTerm && settings.siteUrl){
        searchTerm  = settings.searchTerm;
        siteUrl     = settings.siteUrl;
    }

    // Slabs works on a promise system - for this we use the excellent 'Q' library.
    var deferred = Q.defer();

    var data = {
        mentions:{
            value: 0,
            url: siteUrl
        }
    };

    scrap(siteUrl, function(err, $) {

        if(err){
            console.error(err);
        }

        var pageContents = $('body').html();
        var res = pageContents.match(new RegExp(searchTerm, 'gi'));

        if(res){
            data.mentions.value = res.length;
            deferred.resolve([data]);
        }else{
            deferred.resolve(data);
        }

    });


    // Always return your promise here.
    return deferred.promise;

};


