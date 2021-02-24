import React from 'react';
import './App.css';
import Navigation from '../components/navigation/Navigation.jsx'
import Logo from '../components/logo/Logo.jsx';
import ImageLinkForm from '../components/image link form/ImageLinkForm';
import Rank from '../components/rank/Rank.jsx';
import Particles from 'react-particles-js';

const particleOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		},
		line_linked: {
			shadow: {
				enable: true,
				color: "#3CA9D1",
				blur: 5
			}
		}
	}
}

const clarifyEndpoint = 'https://api.clarifai.com';

class App extends React.Component {

	constructor() {
			super();
			this.state = {
				input: ''
			};
	}

	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onSubmit = () => {
		console.log('click')
	}

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onSubmit}/>
			</div>
		);
	}
}

export default App;
