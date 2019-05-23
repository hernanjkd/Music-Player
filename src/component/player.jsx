import React, { Component } from 'react'

class Player extends Component {

    state = {
        playingNow: null,
        music: null
    }

    componentDidMount() {
        const url = 'http://assets.breatheco.de/apis/sound/songs';

        // fetch the url and get the response back
        fetch(url)

        // first must check if the fetch was able to reach the data successfully.. 
        // if it was, turn it into JSON
        .then( (response) => {

            // one of the response properties that renders true if successful
            if (response.status >= 400 && response.status !== 404) {
                throw Error(Response.status+ ': '+Response.statusText);
            }
            return response.json();
        })

        // use the fetched data that's in JSON format
        .then( (data) => {
            
            this.setState({ music: data });

            console.log(data);
        })

        // If there was an error fetching the data, catch it here
        .catch( (error) => {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    songClicked = (refID) => {

        // If there is no song currently playing
        if (!this.state.playingNow) {
            this.setState({ playingNow: this.refs[refID] })
            this.refs[refID].play()
        }
        else {
            this.state.playingNow.pause()
            this.state.playingNow.currentTime = 0
            // this.setState( this.state.playingNow.currentTime = 0 )
            this.setState({ playingNow: this.refs[refID] })
            this.refs[refID].play()
        }
    }

    render() {
        
        return (this.state.music) &&
        <div>{
            this.state.music.map( (item, index) => {

                return (
                <div key={index}
                        onClick={() => this.songClicked("audio"+index)}
                        className="audio">

                    <audio ref={"audio"+index}>
                        <source type="audio/wav"
                        src={"http://assets.breatheco.de/apis/sound/"+item.url} 
                        />    
                    </audio>

                    {item.name}

                </div>);
                })
            }
            <div className="behind-footer">behind the footer</div>
            <div className="controls fixed-bottom">
                <div>
                    <i onClick={() => {
                        if (this.state.playingNow) this.state.playingNow.play()
                    }} 
                        className="fas fa-play-circle fa-3x"></i>
                    <i onClick={() => {
                        if (this.state.playingNow) this.state.playingNow.pause()
                    }}
                        className="fas fa-pause-circle fa-3x"></i>
                </div>
            </div>
        </div>
    }
}

export default Player;
