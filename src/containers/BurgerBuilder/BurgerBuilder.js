import { Component } from 'react';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/buildControls/BuildControls';

const INGREDIENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
		purchasable: false,
	};

	updatePurchaseState(ings) {
		const sum = Object.keys(ings)
			.map((key) => {
				return ings[key];
			})
			.reduce((szum, el) => {
				return szum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICE[type];
		const newPrize = this.state.totalPrice + priceAddition;
		this.setState({
			totalPrice: newPrize,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};
	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICE[type];
		const newPrize = this.state.totalPrice - priceDeduction;
		this.setState({
			totalPrice: newPrize,
			ingredients: updatedIngredients,
		});
		this.updatePurchaseState(updatedIngredients);
	};

	render() {
		const disabledInfo = { ...this.state.ingredients };
		for (const key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
				/>
			</>
		);
	}
}
export default BurgerBuilder;
