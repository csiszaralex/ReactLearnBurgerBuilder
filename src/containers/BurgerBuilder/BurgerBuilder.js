import { Component } from 'react';
import Burger from '../../components/burger/Burger';

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
	};

	render() {
		return (
			<>
				<Burger ingredients={this.state.ingredients} />
				<div>Build Controll</div>
			</>
		);
	}
}
export default BurgerBuilder;
