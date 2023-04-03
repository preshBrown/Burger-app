import React, { Component } from 'react';
import Transition from "react-transition-group/Transition";

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop'; 

const animationTiming = {
    enter: 400,
    exit: 400
};

class Modal extends Component {
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate () {
        console.log ('[Modal] WillUpdate');
    }

    render () {
        
        // const cssClasses = [
        //     classes.Modal,
        //     this.props.show ? classes.ModalOpen : classes.ModalClosed
        //   ];

        return (
          <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        {/* <div
         className={cssClasses.join(' ')}
        // style={{
        //     transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        //     opacity: this.props.show ? '1' : '0'
        // }}
        >
            {this.props.children}
        </div> */}

        <Transition 
        mountOnEnter 
        unmountOnExit 
        in={this.props.show} 
        timeout={animationTiming}>
      {state => {
        const cssClasses = [
          classes.Modal,
          state === "entering"
            ? classes.ModalOpen
            : state === "exiting" ? classes.ModalClosed : null
        ];
        return (
            <div className={cssClasses.join(' ')}>
            {this.props.children}
        </div>
        );
      }}
    </Transition>
        </Aux>
        );
    }
}


export default Modal;