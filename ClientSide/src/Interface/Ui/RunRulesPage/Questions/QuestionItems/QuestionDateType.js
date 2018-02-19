import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon , Segment} from 'semantic-ui-react';
import PropTypes from 'prop-types';

//component
import DateInputFields from './DateInputFields';



export default class QuestionDateType extends React.Component {
    constructor(props) {
      super(props);
    }

    state = {
        dayIsDirty: false,
        dayInputValue: '',
        monthIsDirty: false,
        monthInputValue: '',
        yearIsDirty: false,
        yearInputValue: '',
        dateInvalid: false,
    }
    
    // prop types and default values
    static propTypes = {
        question: PropTypes.string.isRequired,
    }

    _isDateValid=()=>{
        let checkDateValidation = new Moment(yearInputValue+'-'+monthInputValue+'-'+dayInputValue,'YYYY-MM-DD').isValid();
        if(!((dayIsDirty && monthIsDirty && yearIsDirty) && checkDateValidation)){
            this.setState({dateInvalid: !this.state.dateInvalid});
        }
        else{
            this.setState({dateValue: checkDateValidation.toString()})
        }

    }

    _onDayChange=(dayNewValue)=>{
        this.setState({dayIsDirty: dayNewValue.trim().length > 0?true:false, dayInputValue: dayNewValue.trim()}); 
        this._isDateValid();
    }

    _onMonthChange=(monthNewValue)=>{
        this.setState({monthIsDirty: monthNewValue.trim().length > 0?true:false, monthInputValue: monthNewValue.trim()}); 
        this._isDateValid();
    }
   
    _onYearChange=(yearNewValue)=>{
        this.setState({yearIsDirty: yearNewValue.trim().length > 0?true:false, yearInputValue: yearNewValue.trim()}); 
        this._isDateValid();
    }
   
    _onSave=()=>{
        let dateValue = this.state.dayInputValue+'/'+this.state.monthInputValue+'/'+this.state.yearInputValue;
        if(this.props.onSave){
            this.props.onSave(this.props.question, dateValue);
        }
    }

    _onCancel=()=>{
        this.setState({dayIsDirty: false,
                        dayInputValue: '',
                        monthIsDirty: false,
                        monthInputValue: '',
                        yearIsDirty: false,
                        yearInputValue: '',
                        dateInvalid: false});
    }
     
    // component render method
    render() {
        return (
            <Segment.Group raised className='questionIntItem'>
                <Segment color='orange'><strong>{this.props.question+' ?'}</strong></Segment>
                <Segment>
                   <DateInputFields 
                        dayIsDirty= {false}
                        dayInputValue= {''}
                        monthIsDirty= {false}
                        monthInputValue= {''}
                        yearIsDirty= {false}
                        yearInputValue= {''}
                        dateInvalid= {false}
                        onDayChange ={this._onDayChange} 
                        onMonthChange = {this._onMonthChange} 
                        onYearChange = {this._onYearChange}/>
                    <Button.Group>
                        <Button onClick={this._onSave}>Save</Button>
                        <Button.Or />
                        <Button onClick={this._onCancel}>Cancel</Button>
                    </Button.Group>
                </Segment>
            </Segment.Group>
        );
    }
}
