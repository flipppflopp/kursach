import React, { Component } from 'react';
import {Layout} from "../Layout";
import {Link, NavLink} from "react-router-dom";
import API_URL from '../../variables'

export class ManageRoutes extends Component {
    static displayName = ManageRoutes.name;
    constructor(props) {
        super(props);
        this.state = {
            routesList: null,
            newDeparture: '',
            newDestination: '',
            newYear: '',
            newMonth: '',
            newDay: '',
            newHour: '',
            newMinute: ''
        }
        
        this.handleDeparture = this.handleDeparture.bind(this);
        this.handleDestination = this.handleDestination.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleDay = this.handleDay.bind(this);
        this.handleHour = this.handleHour.bind(this);
        this.handleMinute = this.handleMinute.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    };


    handleDeparture(event) {
        this.setState({ newDeparture: event.target.value });
    }

    handleDestination(event) {
        this.setState({ newDestination: event.target.value });
    }

    handleYear(event) {
        var data = event.target.value
        if(data.length === 1)
        {
            data = '0' + data
        }
        
        this.setState({ newYear: data });
    }

    handleMonth(event) {
        var data = event.target.value
        if(data.length === 1)
        {
            data = '0' + data
        }
        
        this.setState({ newMonth: data });
    }

    handleDay(event) {
        var data = event.target.value
        if(data.length === 1)
        {
            data = '0' + data
        }
        
        this.setState({ newDay: data });
    }

    handleHour(event) {
        var data = event.target.value
        if(data.length === 1)
        {
            data = '0' + data
        }
        
        this.setState({ newHour: data });
    }

    handleMinute(event) {
        var data = event.target.value
        if(data.length === 1)
        {
            data = '0' + data
        }
        
        this.setState({ newMinute: data });
    }
    
    

    handleSubmit(event) 
    {
        debugger
        //1995-12-17T03:24:00
        var dateStr = '20' + this.state.newYear + '-' +
            this.state.newMonth + '-' +
            this.state.newDay + 'T' +
            this.state.newHour + ':' +
            this.state.newDay + ':' +
            this.state.newDay;

        var newDate = new Date(dateStr)
        alert(dateStr)

        fetch('api/routes/add', {
            method: 'post',
            body: JSON.stringify({
                depPoint: this.state.newDeparture,
                destPoint: this.state.newDestination,
                date: newDate
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => {
            return response;
        }).then((data) => {
        });

        window.location.reload(false);
        event.preventDefault();
    }
    
    
    
    componentDidMount() {
        fetch('api/routes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({ routesList: data })
            });
    }


    handleDeleteButton(event, id)
    {
        fetch('api/routes/remove/' + id)
            .then((response) => {
                return response.json();
            })
            .then((data) =>
                {
                    
                }
            )
        this.setState({});
    }



    renderRoutesList()
    {
        if(this.state.routesList !== null)
        {
            return this.state.routesList.map((el) =>
            {
                return (
                    <tr>
                        <td><p>{el.id}</p></td>
                        <td><p>{el.depPoint}</p></td>
                        <td><p>{el.destPoint}</p></td>
                        <td><p>{el.date.split('T')[0]}</p></td>
                        <td>
                            <button className="btn btn-danger" onClick={
                            (e) => {
                                this.handleDeleteButton(e, el.id);
                                window.location.reload(false);
                            }
                            }>
                                Delete route
                            </button>
                        </td>
                    </tr>)
            })
        }

    }


    render () {
        return (
            <Layout user={this.props.location.state.user}>
                <div>
                    <h1>Manage routes:</h1>


                    <form onSubmit={this.handleSubmit}>
                        <div className="container">
                            <h3>Add new route:</h3>
                            <label><b>Departure</b></label>
                            <input  value={this.state.newDeparture} onChange={this.handleDeparture}
                                    type="text" placeholder="Enter Departure" required/>
                            <label><b>Destination</b></label>
                            <input  value={this.state.newDestination} onChange={this.handleDestination}
                                    type="text" placeholder="Enter Destination" required/>

                            <label><b>Year</b></label>
                            <input  value={this.state.newYear} onChange={this.handleYear}
                                    type="text" placeholder="Enter year" required/>

                            <label><b>Month</b></label>
                            <input  value={this.state.newMonth} onChange={this.handleMonth}
                                    type="text" placeholder="Enter month" required/>

                            <label><b>Day</b></label>
                            <input  value={this.state.newDay} onChange={this.handleDay}
                                    type="text" placeholder="Enter day" required/>


                            <label><b>Hour</b></label>
                            <input  value={this.state.newHour} onChange={this.handleHour}
                                    type="text" placeholder="Enter hour" required/>

                            <label><b>Minute</b></label>
                            <input  value={this.state.newMinute} onChange={this.handleMinute}
                                    type="text" placeholder="Enter minute" required/>




                            <button type="submit">Add</button>
                        </div>
                    </form>
                    
                    
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Departure</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                        {this.renderRoutesList()}
                    </table>
                </div>
            </Layout>
        );
    }
}
