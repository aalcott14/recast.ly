var searchYouTube = (options, callback) => {
  var searchEndpoint = 'https://www.googleapis.com/youtube/v3/search';
  
  callback = callback || function(d){console.log(d);};
  options = options || {query: 'kitty', key: YOUTUBE_API_KEY, max: 5};

  $.ajax({
    url: searchEndpoint,
    data: {
      key: YOUTUBE_API_KEY,
      q: options.query,
      part: 'snippet',
      maxResults: options.max
    },
    type: 'GET',
    dataType: 'json',
    success: callback,
    error: function(){console.log('error');}
  });
};
window.searchYouTube = searchYouTube;
