import React, { Component } from 'react';
import  { connect } from 'react-redux';

import Order from  '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';


class Orders extends Component { 
    state = {
        id: null,
        modal: false
    }


    componentDidMount () {

        this.props.onFetchOrders(this.props.token, this.props.userId);

    }

    orderDeleteHandler = (id) => {
        this.setState({id: id, modal: true})
    }

    comfirmDelete = (deleteId) => {
        this.setState({id: null, modal: false})
        this.props.onDeleteOrder(deleteId);
    } 

    cancelHandler = () => {
        this.setState({ modal:false, id: null})
    } 

    

    render () {
        let orders =  <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                      <Order key={order.id}                      
                      deleteOrder={() => this.orderDeleteHandler(order.id)}
                      ingredients={order.ingredients}
                      price={order.price} />
            ));
        }
         if (!this.props.loading && this.props.orders.length === 0 ) {
           orders = (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <h3> 
                    <strong>Start Placing Orders</strong>
                    </h3>
                    </div>) 
        }
        return (
            <div>
                <Modal show={this.state.modal} modalClosed={this.cancelHandler}>
                    <p>Are you sure you want to delete?</p>
                    <Button btnType="Danger" clicked={() => this.comfirmDelete(this.state.id)}>Proceed</Button>
                    <Button btnType="Success" clicked={this.cancelHandler}>Cancel</Button>
                </Modal>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};


const mapDispatchToProps = dispatch => {
    return {
     onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
     onDeleteOrder: (id) => dispatch (actions.deleteOrder(id))
    }
 }; 

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));