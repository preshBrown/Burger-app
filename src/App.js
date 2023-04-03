import React, { Component, Suspense } from 'react';
import  { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';

import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render () {
    let routes = (
      <Switch>
      <Route path="/auth" render={() => (<Suspense fallback={<div>Loading...</div>}> <Auth /> </Suspense>)} />
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
        <Route path="/auth" render={() => (<Suspense fallback={<div>Loading...</div>}> <Auth /> </Suspense>)} />
        <Route path="/orders" render={() => (<Suspense fallback={<div>Loading...</div>}> <Orders /> </Suspense>)} />
        <Route path="/checkout" render={() => (<Suspense fallback={<div>Loading...</div>}> <Checkout /> </Suspense>)} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
        </Switch>
      );
    }

      return (

          <div>
            <Layout> 
              {routes}
            </Layout>


         </div>
    );
  }
}


const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
// https://my-react-app-bigburger.web.app
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
