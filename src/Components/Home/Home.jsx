import React, { useState } from 'react';

import './Home.css';
import axios from '../../axios';

const Home = () => {

    const [ Items, setItems ] = useState(
        {
            itemName: '', itemQuantity: 0, itemRate: 0,
        }
    );

    const [ Amount, setAmount ] = useState(0.00);
    const [ Total, setTotal ] = useState(0.00);
    const [ Cart, setCart ] = useState([]);

    const onChangeHandler = ( e ) => {

        const { name, value } = e.target;
        let amount = null;

        if ( name === "itemRate" )
        {
            amount = value * Items.itemQuantity;
            setAmount( amount );
        }else if ( name === "itemQuantity" )
        {
            amount = value * Items.itemRate;
            setAmount( amount );
        }

        const Values = {
            ...Items,
            [name]: value
        };
        setItems( Values );

    }

    const AddNewItem = ( e ) => {

        e.preventDefault();
        let items = [ 
            {
                Name : Items.itemName, 
                qty: Items.itemQuantity, 
                rate: Items.itemRate, 
                total: Amount
            }
         ];
        setCart( [...Cart, items] );
        setItems( { ...Items, itemName: '', itemQuantity: 0, itemRate: 0, } );
        setTotal( Total + Amount );
        setAmount(0.00);

    }

    const SaveChanges = () => {

        axios.post('/invoice.json', Cart).then( response => {

            setCart( [] );

        } ).catch( error => {

            alert( 'Error!!!' );

        } );

    }

    return (
        <>
            <div className="Home">
                <div className="Home-Content">
                    <div className="heading">
                        <div><h1 className="text-uppercase mb-0">invoice</h1></div>
                        <div className="bag"><span>{ Cart.length }</span><i data-toggle="modal" data-target="#exampleModal" className="las la-shopping-bag"></i></div>
                    </div>
                    <h3 className="text-center"> <sup>Total Amount</sup> ${ Total }.00</h3>
                    <div className="add_item">
                        <div className='d-flex justify-content-center'>
                            <div className="w-25 px-3">
                                <label className="mb-0">Item name</label>
                                <input onChange={ onChangeHandler } name="itemName" type="text" className="form-control form-control-sm rounded-0" value={ Items.itemName } />
                            </div>
                            <div className="w-25 px-3">
                                <label className="mb-0">Quantity</label>
                                <input onChange={ onChangeHandler } name="itemQuantity" type="number" className="form-control form-control-sm rounded-0" value={ Items.itemQuantity } />
                            </div>
                            <div className="w-25 px-3">
                                <label className="mb-0">Rate</label>
                                <input onChange={ onChangeHandler } name="itemRate" type="number" className="form-control form-control-sm rounded-0" value={ Items.itemRate } />
                            </div>
                            <div className="w-25 px-3">
                                <label className="mb-0">Amount</label>
                                <p className="mb-0 mt-2 font-weight-normal">${ Amount } </p>
                            </div>
                        </div>
                        <button className="btn btn-sm" onClick={ AddNewItem }>Add Item</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">INVOICE</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-between firstDiv">
                                <div>
                                    <b>User: </b>
                                    <span>Usman Badar</span>
                                </div>
                                <div>
                                    <b>Total: </b>
                                    <span style={ { 'color' : '#0D83DD' } }>${ Total }.00</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between secondDiv">
                                <div>
                                    <span className="headings">
                                        Description
                                    </span>
                                </div>
                                <div>
                                    <span className="headings">
                                        Quantity
                                    </span>
                                </div>
                                <div>
                                    <span className="headings">
                                        Rate
                                    </span>
                                </div>
                                <div>
                                    <span className="headings">
                                        Amount
                                    </span>
                                </div>
                            </div>
                                {
                                    Cart.map(
                                        ( val, index ) => {
                                            return (
                                                <>
                                                    <div key={ index } className="d-flex justify-content-between thirdDiv">
                                                        <div className="w-25 border-bottom py-2 text-left px-4">
                                                            <span className="data">
                                                                {val[0].Name}
                                                            </span>
                                                        </div>
                                                        <div className="w-25 border-bottom py-2 text-right px-4">
                                                            <span className="data">
                                                                {val[0].qty}
                                                            </span>
                                                        </div>
                                                        <div className="w-25 border-bottom py-2 text-right px-4">
                                                            <span className="data">
                                                                {val[0].rate}
                                                            </span>
                                                        </div>
                                                        <div className="w-25 border-bottom py-2 text-right px-4">
                                                            <span className="data">
                                                                ${val[0].total}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    )
                                }
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-sm modal_btn" onClick={ SaveChanges }>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};

export default Home;