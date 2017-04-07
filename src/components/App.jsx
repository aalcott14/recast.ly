class App extends React.Component {
  constructor (props) {
    super(props);
    this.searchYouTube = props.searchYouTube;

    this.useQueryResults = function(data) {
      this.setState({
        currentVideo: data.items.length > 0 ? data.items[0] : '',
        videoList: data.items
      });
    };
    props.searchYouTube(undefined, this.useQueryResults.bind(this));

    this.state = {
      currentVideo: exampleVideoData[0], 
      videoList: exampleVideoData
    };
  }

  getSearchResults(queryText) {
    var queryText = $('input.form-control').val();
    if(queryText === '' || queryText === undefined) {
      return;
    }
    queryText = queryText.trim();
    this.searchYouTube({
      max: 20,
      query: queryText,
      key: YOUTUBE_API_KEY
    }, this.useQueryResults.bind(this));
  }

  selectVideo(video) {
    this.setState({
      currentVideo: video
    });
  }

  render() {
    return (<div>
      <Nav clickHandler={this.getSearchResults.bind(this)}/>
      <div className="col-md-7">
        <VideoPlayer video={this.state.currentVideo}/>
      </div>
      <div className="col-md-5">
        <VideoList videos={this.state.videoList} selectVideo={this.selectVideo.bind(this)}/>
      </div>
    </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
